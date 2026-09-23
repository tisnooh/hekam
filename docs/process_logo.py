import numpy as np
from PIL import Image

src = Image.open('./docs/source-logo.jpg').convert('RGB')
a = np.asarray(src).astype(np.int32)
H, W, _ = a.shape
ivory = np.array([244, 239, 232])
dist = np.sqrt(((a - ivory) ** 2).sum(axis=2))
bg_cand = dist < 50

# connected component of bg_cand touching borders, via iterative dilation
bg = np.zeros_like(bg_cand)
bg[0, :] = bg_cand[0, :]; bg[-1, :] = bg_cand[-1, :]
bg[:, 0] = bg_cand[:, 0]; bg[:, -1] = bg_cand[:, -1]
while True:
    grown = bg.copy()
    grown[1:, :] |= bg[:-1, :]; grown[:-1, :] |= bg[1:, :]
    grown[:, 1:] |= bg[:, :-1]; grown[:, :-1] |= bg[:, 1:]
    grown &= bg_cand
    if (grown == bg).all():
        break
    bg = grown

alpha = np.clip((dist - 24) / (70 - 24) * 255, 0, 255).astype(np.uint8)
alpha[bg] = 0
rgba = np.dstack([a.astype(np.uint8), alpha])
img = Image.fromarray(rgba, 'RGBA')

ys, xs = np.where(alpha > 8)
top, bottom, left, right = ys.min(), ys.max(), xs.min(), xs.max()
full = img.crop((left, top, right + 1, bottom + 1))
full.save('./public/images/brand/logo-full.png')

# row profile to split visual blocks (monogram / wordmark / tagline / bread)
prof = (alpha > 8).sum(axis=1)
blocks, start = [], None
for y in range(H):
    if prof[y] > 0 and start is None:
        start = y
    elif prof[y] == 0 and start is not None:
        blocks.append((start, y)); start = None
if start is not None:
    blocks.append((start, H))
blocks = [b for b in blocks if b[1] - b[0] > 6]
print('blocks:', blocks)

def crop_rows(y0, y1):
    sub = alpha[y0:y1]
    ys2, xs2 = np.where(sub > 8)
    return img.crop((xs2.min(), y0 + ys2.min(), xs2.max() + 1, y0 + ys2.max() + 1))

mono = crop_rows(*blocks[0])
mono.save('./public/images/brand/logo-monogram.png')
if len(blocks) > 2:
    word = crop_rows(blocks[1][0], blocks[2][1])
    word.save('./public/images/brand/logo-wordmark.png')

# favicon: monogram on deep black
fw = 96
pad = 14
mono_r = mono.resize((fw - 2 * pad, fw - 2 * pad), Image.LANCZOS)
icon = Image.new('RGBA', (fw, fw), (7, 7, 7, 255))
icon.paste(mono_r, (pad, pad), mono_r)
icon.save('./src/app/icon.png')
icon.save('./public/images/brand/favicon-96.png')
print('sizes full/mono:', full.size, mono.size)
