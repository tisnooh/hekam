# H-EKAM OAT

Site premium de pâtisserie personnalisée — maison **H-EKAM OAT**, boulangerie &
pâtisserie sur mesure. Frontend complet : design, UX, responsive, configurateur
visuel 7 étapes, catalogue, panier et checkout (interface).

Statut : **frontend de démonstration production-ready**. Aucune intégration
externe n'est connectée (ni Supabase, ni Stripe, ni emails, ni domaine) :
le site fonctionne entièrement avec des données locales et se déploie tel quel.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript strict
- Tailwind CSS (design system noir / ivoire / bronze)
- Framer Motion (animations lentes, `prefers-reduced-motion` respecté)
- React Three Fiber + Drei (chargés uniquement si un modèle 3D est fourni)
- Polices auto-hébergées via Fontsource (Cormorant Garamond Variable, Inter Variable) :
  aucun appel réseau externe au runtime

## Installation locale

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # build de production + typecheck
npm run start      # sert le build localement
npm run typecheck  # vérification TypeScript seule
```

## Déploiement Vercel

1. Créer un nouveau projet sur Vercel ;
2. Importer le dossier (ou le repository Git) contenant ce README ;
3. Framework preset : **Next.js** (détection automatique) ;
4. Laisser Vercel détecter automatiquement le build ;
5. Ajouter les variables d'environnement **plus tard** (toutes optionnelles aujourd'hui, voir `.env.example`) ;
6. Lancer **Deploy**.

Paramètres attendus :

| Paramètre       | Valeur                          |
| --------------- | ------------------------------- |
| Install command | `npm install`                   |
| Build command   | `npm run build`                 |
| Output          | détection automatique Next.js   |
| Node            | 20.x (`.nvmrc` fourni ; minimum 18.18) |

Sans aucune variable d'environnement, Vercel détecte automatiquement l'URL du
projet pour le SEO (`sitemap.xml`, `robots.txt`, Open Graph). Définir
`NEXT_PUBLIC_SITE_URL` lorsque le domaine définitif sera connu.

## Routes principales

| Route               | Contenu                                                       |
| ------------------- | ------------------------------------------------------------- |
| `/`                 | Homepage : hero, réassurance, signatures, studio, savoir-faire, événements, galerie |
| `/creations`        | Galerie filtrable (occasion, personnes, prix, saveurs)         |
| `/creations/[slug]` | Fiche produit éditoriale (accordéons détail / conservation / allergènes) |
| `/creer-mon-gateau` | Configurateur 7 étapes — desktop 3 zones + interface mobile dédiée |
| `/commande`         | Checkout frontend (emplacement Stripe réservé)                 |
| `/compte`           | Espace client (architecture, sections vides)                   |
| `/admin`            | Shell back-office réservé (non développé)                      |
| `/informations` · `/legal` · `/contact` | Pages texte                                |

## Configurateur & 3D

- `calculateCakePrice()` (`src/lib/pricing.ts`) est l'**unique** fonction de
  calcul du site ; les montants de démonstration vivent dans `src/lib/data/*`.
- `CakeViewer360` : rotation souris / doigt / clavier.
  - Sans modèle 3D : visualisation de démonstration paramétrique (signalée comme telle).
  - Avec modèle : déposer un `.glb` dans `public/models/` puis définir
    `NEXT_PUBLIC_CAKE_MODEL_URL=/models/cake.glb` → rendu R3F automatique
    (voir `public/models/README.md`).

## Images & logo

Toutes les images sont locales et remplaçables sans modifier le code :
`public/images/products`, `public/images/editorial`, `public/images/events`,
`public/images/brand` (logo officiel décliné : full, monogramme, wordmark, favicon).

## Variables d'environnement

Voir `.env.example` — toutes optionnelles pour cette version :
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CAKE_MODEL_URL`, puis en phase 5 :
Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`) et Stripe (`STRIPE_SECRET_KEY`,
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`).

## Phase 5 (après validation)

Supabase (auth, commandes, catalogue dynamique, uploads Storage), Stripe
(montage prévu : `data-stripe-mount="payment-element"` + route
`/api/stripe/create-intent`), emails transactionnels, domaine / DNS,
modèles 3D réels.

## Documentation interne

- `docs/PLAN.md` : décisions de design system, header, homepage, configurateur, responsive.
- `docs/reference-ui.png` : mockup de référence d'agencement.
- `docs/source-logo.jpg` + `docs/process_logo.py` : logo fourni et script de
  génération des déclinaisons (fond retiré, crops, favicon).
"# hekam" 
