=== NOUVEAU PROJET ===

1.1 Nom : CleanCity Computer Vision
1.2 Slug : cleancity computer-vision
1.3 Description courte : Fine-tuning du modèle YOLOv5 pour la détection et la classification de déchets et dépôts sauvages pour la ville de Nanterre.

2.1 Description longue :
Dans le cadre du concours Kesk'IA (concours de développement IA), j'ai fine-tuné le modèle YOLOv5 afin que les habitants de Nanterre puissent signaler des dépôts sauvages depuis l'application mobile de la ville. Le système identifie le type de déchet, réccupère sa localisation grâce aux méta-données et transmet automatiquement un signalement aux agents municipaux, avec la catégorie de collecte adaptée (camion ordures ménagères, encombrants, etc.).

Étapes du projet :
1. Choix du modèle (YOLOv5) et définition des classes de déchets
2. Recherche et constitution du jeu de données (images urbaines, dépôts variés)
3. Labellisation des images (bounding boxes + classes)
4. Entraînement et évaluation du modèle (métriques mAP, recall)
5. Intégration dans un dashboard de suivi et de validation des prédictions
6. Mise en production (API containerisée, connexion à l'application Nanterre)

2.2 Technologies : Python, PyTorch, YOLOv5, OpenCV, Docker, FastAPI
2.3 Image (optionnel) :

3. Liens :
- Label : | URL :
- Label : | URL :

4.1 Icône personnalisée (optionnel) : 
4.2 Ordre sur le bureau (optionnel) :