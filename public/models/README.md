# Modèles 3D du gâteau

Ce dossier accueille les futurs modèles 3D du configurateur (phase 5).

## Activer le rendu 3D temps réel

1. Déposer un modèle optimisé dans ce dossier, ex. `public/models/cake.glb`
   (format `.glb` ou `.gltf` + binaires, < 8 Mo recommandé, textures incluses).
2. Définir la variable d'environnement :

   ```
   NEXT_PUBLIC_CAKE_MODEL_URL=/models/cake.glb
   ```

3. Redéployer. `CakeViewer360` chargera automatiquement le rendu
   React Three Fiber (`src/components/cake/CakeModel3D.tsx`) à la place de la
   visualisation de démonstration.

## Sans modèle

Si aucun fichier n'est présent ou si la variable n'est pas définie,
le site utilise automatiquement la visualisation de démonstration
paramétrique (`DemoCakeVisual`) : rien ne casse, aucune erreur console.
