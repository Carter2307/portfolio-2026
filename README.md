# Portfolio — React · Vite · TypeScript · React Router · WebGPU

Portfolio de Roger Bentcha : une page, un fond animé en WebGPU (4 shaders au choix).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b + vite build
npm run lint     # oxlint
```

## Structure

```
src/
├── main.tsx                      # point d'entrée : détection de langue, I18nProvider, RouterProvider
├── app/
│   ├── router.tsx                # routes (createBrowserRouter)
│   └── layouts/root-layout.tsx   # coque persistante : fond WebGPU + <main> + footer
├── pages/
│   ├── home/                     # page d'accueil + ses sections (hero, contact)
│   ├── not-found/                # 404
│   └── route-error/              # ErrorBoundary de route
├── features/
│   └── dither-background/        # fond animé WebGPU + son panneau, isolés du reste
│       ├── dither-background.tsx # <canvas> React
│       ├── shader-panel.tsx      # panneau bas-gauche : choix du shader (ouvert par défaut)
│       ├── use-dither-background.ts
│       ├── shaders/
│       │   ├── common.wgsl       # uniforms, bruit, tramage Bayer 8×8, palette, fs_main
│       │   ├── drift.wgsl        # Dérive : fbm + domain warping (shader d'origine)
│       │   ├── ripples.wgsl      # Ondes : interférences de sources mobiles
│       │   ├── relief.wgsl       # Relief : carte topographique en isolignes
│       │   ├── cells.wgsl        # Cellules : Voronoï animé
│       │   └── index.ts          # registre : id + source WGSL assemblée (libellés dans i18n/messages)
│       └── lib/
│           ├── renderer.ts       # WebGPU : device, pipelines (cache par shader), uniforms, draw
│           ├── scene.ts          # état pur : temps, pointeur lissé
│           ├── controller.ts     # DOM : taille, events, boucle 30 fps, perte de device
│           └── types.ts
├── components/
│   ├── ui/                       # briques visuelles (Section, TimelineEntry, DottedLeader…)
│   └── layout/                   # SiteFooter
├── i18n/                         # langue : détection, contexte, textes d'interface (messages/en.ts, fr.ts)
├── content/                      # contenu typé du CV : en.ts, fr.ts (+ shared.ts : liens, identité)
├── lib/motion.ts                 # décalage des animations d'entrée
└── styles/index.css              # Tailwind v4 : tokens (@theme), styles de base
```

## Langues

Anglais par défaut. Si la langue principale du navigateur est le français (`fr`, `fr-FR`, `fr-CA`…),
le site s'affiche en français et `<html lang>` suit.

- Contenu du CV : `src/content/en.ts` et `src/content/fr.ts` (même type `Portfolio`).
- Textes d'interface : `src/i18n/messages/en.ts` et `fr.ts` (même type `Messages`).

TypeScript signale toute clé manquante dans une des deux langues.

## Fond WebGPU

Chaque shader ne définit qu'une fonction `field(px, uv) -> f32` (luminance 0..1) ;
`common.wgsl` s'occupe du tramage et de la palette, donc tous partagent le même rendu pixel.
Pour en ajouter un : un fichier `.wgsl` dans `shaders/` + une entrée dans `SHADERS`.

- Fixe au scroll : le canvas est en `position: fixed` et le shader ne dépend pas du scroll.
- Rendu à 1 pixel par cellule (4 px par défaut), agrandi par CSS en `image-rendering: pixelated`.
- Sans WebGPU, le canvas reste transparent et le dégradé CSS de la page prend le relais.
- Option « Aucun » du panneau : boucle de rendu arrêtée (plus aucun travail GPU), fond blanc.
  Le device et les pipelines restent en mémoire, donc revenir à un shader est instantané.
- `prefers-reduced-motion` : une image fixe, redessinée seulement au resize.
- Perte du device GPU : réinitialisation automatique.
