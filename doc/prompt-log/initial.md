Implémente les interfaces suivantes de la home page:
desktop: @https://www.figma.com/design/ez72kAAHp9512fLMoOMATO/Portfolio-2026?node-id=17-907&m=dev

mobile: @https://www.figma.com/design/ez72kAAHp9512fLMoOMATO/Portfolio-2026?node-id=26-1382&m=dev

mobile menu open: @https://www.figma.com/design/ez72kAAHp9512fLMoOMATO/Portfolio-2026?node-id=26-1461&m=dev

### Routing
Le site aura 03 pages principales:
- Home -> Accueil
- Craft -> Projets
- Photographies

### Design system
Utilise baseUi come base de composant pour les primtifs utilisé (bouton, tooltip,). La couleur primaire est le sky/500 de tailwind. Respecte la taille des police des maquettes figma. Les icones à utiliser se trouve dans public/icons. 
Sépare les éléments des page sous forme de composant:
- Header
- Menu
- card
- ...
Chaque page et composant doit être dans un dossier. Le dossier composants exporte tous les composants

### Animation
Animation d'ouverture du amburger menu sur mobile: les trois tirets deviennent une croix et les lien apparaissent (opacité 0 - 1) l'un après l'autre en translatant en y du bas ver leur position finale comme dans le design.

### Internationalisation
utilise les fonctionnalité native de next pour la localisation et l'internationalisation. Le site aura deux langue: Français et Anglais. L'app doit détecter à partir du header (le navigateur) la langue de l'utilisateur et si c'est différent du français alors afficher le contenu en anglais.
Pour le contenu il faut donc des fichier json de traduction. 

### Choix technique
- tailwindcss
- baseui pour la base des composants primitif
- zustand
- tanstack query 
- axios 
- layout-guide (https://www.npmjs.com/package/layout-guide?activeTab=readme)
- react motion pour les animations 

### Organisation et structure du projet et du code
Structure le code de manière simple et logique: hooks, components, views (pages), services, utils, types, ...

### Qualité de code
- N'ajoute des commentaires que sur la logique complexe ou sensible.
Doc
- Respecte les principes SOLID, KISS et YAGNI

