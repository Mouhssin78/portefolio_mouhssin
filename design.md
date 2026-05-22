# Spécifications de Design : Clone du Portfolio de Mariano Pascual

## 1. Concept Global et Esthétique
- **Thème :** Rétro OS (Système d'exploitation vintage des années 90, type Windows 95 / Mac OS classique).
- **Style visuel :** Maximaliste, ludique, coloré, avec une forte dose de nostalgie (Pixel art, UI native système).
- **UX/UI :** Expérience "gamifiée" sous forme de bureau d'ordinateur interactif. L'utilisateur interagit avec des dossiers, des fenêtres et une barre des tâches.

## 2. Palette de Couleurs & Typographie
- **Couleurs :** Couleurs primaires et secondaires très saturées (jaune, bleu, rouge, vert), avec un système de personnalisation (l'utilisateur peut modifier le thème, le fond, la luminosité).
- **Typographie :** Polices "System UI" (Courier, MS Sans Serif, Roboto ou polices pixelisées) pour simuler l'interface brute des anciens systèmes.

## 3. Architecture de la Page (Single Page Application)
Le site fonctionne comme une **SPA (Single Page Application)**.
- **Le Bureau (Desktop) :** Zone principale occupant 100% du viewport (`100vh`, `100vw`). Contient les icônes d'applications et de dossiers.
- **L'Image de fond :** Diaporama des œuvres, artworks ou fond d'écran interactif.
- **La Barre des tâches / Menu Bar :** Située en haut ou en bas de l'écran. Elle permet de gérer les fenêtres ouvertes, d'afficher l'heure locale, et inclut souvent un menu principal (type "Démarrer").

## 4. Composants Clés à Développer

### A. Icônes de Bureau (Desktop Icons)
- **Comportement :** Drag & drop (Glisser-déposer) libre sur tout l'écran.
- **Interaction :** Double-clic (ou simple clic sur mobile) pour ouvrir la fenêtre associée.
- **Bonus :** Effets sonores rétro au survol ou au clic pour accentuer la gamification.

### B. Le Système de Fenêtres (Window Manager)
C'est le cœur technique du projet et ce qui demande le plus de logique algorithmique.
- **Structure :** Barre de titre (titre, bouton réduire, agrandir, fermer) + Zone de contenu scrollable.
- **Comportements requis :**
  - **Draggable :** La fenêtre peut être déplacée depuis sa barre de titre.
  - **Z-Index dynamique :** La dernière fenêtre ouverte ou cliquée doit toujours passer au premier plan par-dessus les autres.
  - **Coordonnées d'apparition :** Les nouvelles fenêtres s'ouvrent à des coordonnées d'écran légèrement décalées (offset) pour éviter qu'elles ne se superposent parfaitement.

### C. Le Contenu des Fenêtres (Applications)
- **Portfolio / Dossiers :** Affichage des projets sous forme de grille d'icônes ou de galerie d'images.
- **À propos (About) :** Boîte de dialogue système classique ou fenêtre de traitement de texte contenant la biographie.
- **Contact :** Un formulaire de contact imitant l'interface d'un vieux client mail.
- **Personnalisation (Settings) :** Une fenêtre interactive permettant de changer le fond d'écran ou d'appliquer des filtres visuels au site.

## 5. Détails Techniques & Intégration
- **CSS :** - Utilisation de `position: absolute` pour la gestion spatiale des fenêtres et des icônes. 
  - Styles de bordures spécifiques (`outset`, `inset`, ou box-shadows superposés) pour donner l'effet "bouton 3D" biseauté typique des interfaces des années 90.
- **JavaScript :**
  - Nécessite une gestion d'état centralisée pour les fenêtres (ouverte, fermée, minimisée, position X/Y, niveau de Z-index).
  - Écouteurs d'événements souris et tactiles complexes (`mousedown`, `mousemove`, `mouseup`) pour la fonctionnalité de glisser-déposer sans bibliothèque externe lourde.
- **Responsive (Mobile) :** Le concept d'OS flottant est difficile sur de petits écrans. La solution habituelle est de forcer l'ouverture des fenêtres en mode plein écran (maximized) sur mobile et de remplacer le glisser-déposer par un tap classique.

## 6. Approche de Code avec Cursor
Pour construire ce projet de manière itérative avec un assistant IA comme Cursor, suis cet ordre :
1. **Base UI :** "Code la structure HTML/CSS de base pour un bureau d'ordinateur (Desktop 100vh, Image de fond, Taskbar en bas)."
2. **Mécanique des Fenêtres :** "Crée une logique Vanilla JS pour instancier une fenêtre modale. Ajoute la fonctionnalité pour la déplacer (draggable) en cliquant sur sa barre de titre."
3. **Gestion du Z-Index :** "Modifie le script pour que chaque clic sur une fenêtre mette à jour son z-index afin qu'elle soit au premier plan."
4. **Desktop Icons :** "Ajoute des icônes sur le bureau. Rends-les draggables, et lie-les à une fonction qui génère une nouvelle fenêtre au double-clic."
5. **Remplissage du Contenu :** "Conçois le contenu spécifique à l'intérieur des fenêtres (Galerie, Formulaire de contact, etc.)."
