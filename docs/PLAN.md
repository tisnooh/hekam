# Plan & décisions de design — H-EKAM OAT

## Analyse initiale

- Workspace vierge : aucun projet existant → création Next.js 15 + TS + Tailwind.
- Fichiers fournis : logo officiel (jpg fond ivoire) et mockup de référence (png).
  - Logo : fond retiré par traitement d'image (composante connexe ivoire depuis
    les bords), déclinaisons exportées : `logo-full`, `logo-monogram`,
    `logo-wordmark`, favicon sur noir. Aucun monogramme alternatif inventé.
  - Mockup : référence d'agencement uniquement (hero + configurateur 3 zones),
    conservé dans `docs/reference-ui.png`.

## Design system

- Palette imposée : noir #070707, noir doux #111111, ivoire #F4EFE8, crème #EDE4DA,
  blanc chaud #FAF8F5, bronze #A7793D (accent uniquement), brun #382217, gris #9A9691.
- Typo : Cormorant Garamond Variable (titres, italique éditorial) + Inter Variable
  (interface, labels capitales tracking 0.28em). Auto-hébergées (Fontsource).
- Composants CSS : `.btn-primary`, `.btn-ghost`, `.label`, `.hairline`, `.link-underline`.
- Animations : fade + reveal 400–900 ms, ease `cubic-bezier(0.22,1,0.36,1)`,
  scale hover 1.02 max, parallax ±36 px, `prefers-reduced-motion` respecté
  (MotionConfig `reducedMotion="user"` + override CSS global).
- Anti-patterns évités : pas de cards arrondies partout, pas de gradients violet,
  pas de glassmorphism, pas d'emojis, pas de badges multiples, pas de stats inventées.

## Header

- Transparent au-dessus du hero ; après 24 px de scroll : noir 80 % + blur +
  filet inférieur, sans ombre.
- Desktop : logo gauche, nav centre (Créer mon gâteau / Nos créations /
  Événements / La maison), droite recherche / mon compte / panier.
- Mobile : logo, panier, hamburger → menu plein écran (links serif 32 px, stagger).

## Homepage

Hero 100svh (photo dominante, dégradés noirs), réassurance 4 filets,
signatures sur ivoire (3 pages magazine, décalage éditorial), teaser configurateur
(noir, liste 01–05), savoir-faire asymétrique (crème), événements éditoriaux
(asymétriques, 4 moments), galerie immersive 2 registres parallax, footer 4 colonnes
+ logo full.

## Configurateur (/creer-mon-gateau)

- Desktop 3 zones : progression 190–210 px | visualisation + options | récap 350–380 px sticky.
- Mobile dédié : barre étape x/7 + aperçu, gâteau 240–280 px, options, barre sticky
  total + « CONTINUER — XX € », récap en bottom sheet.
- 7 étapes : occasion (images), personnes (diamètre/étages/prix), forme (5 glyphs),
  saveurs (3 catégories, allergènes, badge « accord recommandé »), décoration
  (styles, 2 teintes, texture, finition, 6 options), message (25 car. max, couleur,
  topper, uploads logo/inspiration, instructions atelier), livraison
  (retrait/livraison, calendrier dates ouvertes, créneaux, adresse + zone).
- Transitions d'étapes : AnimatePresence 500 ms. Prix animé (spring) partout.
- État : `ConfiguratorContext` (useSearchParams : `?occasion=`, `?product=`, `?edit=`).

## Panier & checkout

- Drawer latéral : mini-visualisation de la configuration (pas de miniature générique),
  récap complet, MODIFIER (`?edit=id`), SUPPRIMER, COMMANDER.
- Checkout : coordonnées, adresse si livraison, récap sous-total / livraison / total,
  mount Stripe réservé (`data-stripe-mount`), confirmation simulée côté frontend.

## Accessibilité & SEO

- Skip link, focus visible bronze, aria-labels/pressed/current, rôles dialog,
  navigation clavier du viewer (flèches), alt sur toutes les images.
- metadata par route, OpenGraph, robots.txt, sitemap.xml, manifest, favicon.
- URLs propres : /creations/[slug], /creer-mon-gateau, /commande…

## Responsive testé (build + revue)

375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 : grilles adaptatives,
aucun débordement horizontal (min-w-0 sur la zone centrale du configurateur),
barres sticky mobile, drawers plein écran.

## Prochaines étapes (phase 5, après validation)

Modèles 3D .glb, Supabase (auth + tables miroir de src/lib/data), Stripe,
emails transactionnels, domaine/DNS, déploiement Vercel.
