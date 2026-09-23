import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import { PRODUCTS, getProduct } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { buildConfigurationFromProduct, configurationTitle } from '@/lib/configuration';
import { calculateCakePrice } from '@/lib/pricing';
import AddToCartButton from '@/components/product/AddToCartButton';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
    openGraph: { images: [{ url: product.image, alt: `${product.name} — ${product.tagline}` }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const presetConfig = buildConfigurationFromProduct(product.slug);
  const presetPrice = calculateCakePrice(presetConfig).total;

  return (
    <div className="bg-noir">
      <div className="mx-auto max-w-[1720px] px-6 pb-36 pt-28 md:px-10 md:pt-36">
        <nav aria-label="Fil d'ariane" className="label mb-12 flex items-center gap-4 !text-[9px] text-ivoire/30">
          <Link href="/creations" className="link-underline hover:text-bronze-clair">
            Nos créations
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ivoire/60">{product.name}</span>
        </nav>

        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={product.gallery} name={product.name} />
          </div>

          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="block h-px w-10 bg-bronze" aria-hidden="true" />
              <p className="label-bronze">{product.tagline}</p>
            </div>
            <h1 className="font-serif text-[clamp(44px,5vw,68px)] font-light leading-none text-ivoire">
              {product.name}
            </h1>
            <p className="mt-7 max-w-[46ch] text-[14.5px] leading-[1.9] text-ivoire/60">{product.description}</p>

            <dl className="mt-12 max-w-md">
              <Info label="Personnes" value={product.persons} />
              <Info label="Dimensions" value={product.dimensions} />
              <Info label="Disponibilité" value={product.availableFrom} />
              <Info label="Retrait / livraison" value="Boutique Paris XIᵉ ou livraison" last />
            </dl>

            <div className="mt-10 flex items-baseline gap-5">
              <p className="label !text-[9.5px] text-ivoire/40">À partir de</p>
              <p className="font-serif text-[32px] font-light leading-none text-bronze-clair">
                {formatPrice(product.priceFrom)}
              </p>
            </div>

            <div className="mt-10 flex max-w-md flex-col gap-3.5">
              <Link href={`/creer-mon-gateau?product=${product.slug}`} className="btn-primary w-full">
                Personnaliser
              </Link>
              <AddToCartButton
                productSlug={product.slug}
                productName={product.name}
                unitPrice={presetPrice}
                configuration={presetConfig}
              />
            </div>
            <p className="mt-5 max-w-[44ch] text-[11px] leading-relaxed text-ivoire/30">
              Configuration de référence : {configurationTitle(presetConfig)}. Modifiable à tout
              moment dans le configurateur.
            </p>

            <div className="mt-16">
              <Accordion title="Détail de la création" defaultOpen>
                <ul className="mb-5">
                  {product.composition.map((item) => (
                    <li key={item} className="flex items-baseline gap-4 py-1.5 text-[13.5px] text-ivoire/70">
                      <span className="h-px w-4 shrink-0 bg-bronze/50" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[13.5px] leading-[1.9] text-ivoire/50">{product.detail}</p>
              </Accordion>
              <Accordion title="Conservation">
                <p className="text-[13.5px] leading-[1.9] text-ivoire/50">{product.storage}</p>
              </Accordion>
              <Accordion title="Allergènes">
                <p className="text-[13.5px] leading-[1.9] text-ivoire/50">{product.allergens.join(' · ')}</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-6 border-t border-ivoire/[0.09] py-4 ${last ? 'border-b' : ''}`}>
      <dt className="label !text-[9px] text-ivoire/35">{label}</dt>
      <dd className="text-right text-[13px] text-ivoire/75">{value}</dd>
    </div>
  );
}

/** Accordéon minimaliste : filet + symbole fin, aucun cadre. */
function Accordion({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-t border-ivoire/[0.09] last:border-b" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
        <span className="label !text-[9.5px] text-ivoire/70 transition-colors duration-500 group-open:text-bronze-clair">
          {title}
        </span>
        <span className="relative h-3 w-3 shrink-0" aria-hidden="true">
          <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-bronze/70" />
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-bronze/70 transition-transform duration-500 ease-luxe group-open:scale-y-0" />
        </span>
      </summary>
      <div className="pb-7 pr-8">{children}</div>
    </details>
  );
}
