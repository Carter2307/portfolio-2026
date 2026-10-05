# Portfolio — React · Vite · TypeScript · ferry-shaders · ferry-ui

Portfolio bilingue de Roger BENTCHA, avec une interface sobre et dense.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # TypeScript + production build
npm run lint     # oxlint
```

## Interface

La page `/` propose une navigation latérale sur ordinateur et horizontale sur mobile, un fond
fixe clair ou sombre, le nom « Roger BENTCHA » et des titres en Pixelify Sans. Le texte courant est
en 13 px. Les expériences affichent uniquement l’entreprise, les dates et le rôle ; les formations
affichent le diplôme, les dates et l’école en plus petit. Les dates restent à droite sur la ligne
du titre, y compris sur mobile. Les projets sont retirés. L’adresse e-mail est masquée par défaut
et se révèle au survol ou au focus clavier.

Motion React révèle les blocs de texte une fois à leur entrée dans l’écran, à partir du nom :
fondu de 450 ms, déplacement de 4 px et décalage de 70 ms entre les textes.
`prefers-reduced-motion` désactive l’effet. Les fonctions d’animation sont chargées séparément
avec `LazyMotion`.

## Shaders

Deux composants `<PixelField>` du paquet npm `ferry-shaders` reprennent le rendu de sa documentation.
La bande supérieure couvre toute la largeur depuis le haut du document (520 px sur ordinateur,
340 px sur mobile), et la bande inférieure remonte depuis le bas du footer. Les pixels neutres
et bleus suivent les tokens de ferry-ui. Vitesse 0,15, variations d’opacité légères ; sans WebGPU,
un motif de pixels CSS fixe prend le relais.

La bibliothèque partage le device GPU entre les canvas, suspend les animations hors écran et
suit `prefers-reduced-motion` (une image fixe). Aucun WGSL ni moteur WebGPU local.

## Structure

```text
src/
├── app/layouts/              # cadre de la page
├── pages/home/               # page, hero et section contact
├── pages/not-found/          # page introuvable
├── pages/route-error/        # gestion des erreurs
├── features/edge-field/      # PixelField aux bords haut/bas
├── components/layout/        # navigation et footer
├── components/ui/            # sections, timeline, liens, monogramme
├── lib/                      # animations Motion React
├── i18n/                     # détection de langue et textes d’interface
├── content/                  # contenu typé du CV en français et anglais
└── styles/index.css          # Tailwind v4 et styles du portfolio
```

## Langues

Anglais par défaut. Si la langue principale du navigateur est le français (`fr`, `fr-FR`, `fr-CA`…),
le site s’affiche en français et `<html lang>` suit. Le contenu du CV reste dans `src/content/en.ts`
et `fr.ts`, et les textes d’interface dans `src/i18n/messages/`. TypeScript vérifie que les deux
langues exposent les mêmes clés.

## Thèmes

`ThemeProvider` et les boutons `Button` de ferry-ui pilotent les thèmes clair/sombre. Le thème
suit le système lors de la première visite, puis le choix manuel est mémorisé sous `portfolio-theme`.
Le script `themeInitScript` de ferry-ui est injecté dans `<head>` par Vite avant le premier affichage.
Les couleurs du texte, des séparateurs et des shaders suivent les tokens.
