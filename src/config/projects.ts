import type { ProjectDetail } from '../types/desktop'

export const PROJECTS: ProjectDetail[] = [
  {
    slug: 'eclusia-ai-cybersecurity',
    title: 'Eclusia — AI Cybersecurity',
    shortDescription:
      'Solution de sécurisation des IA génératives (ChatGPT, Claude, etc.) par détection de données personnelles (PII) en temps réel, via extension web et logiciel local.',
    longDescription: `Pour sécuriser l'utilisation des IA génératives, j'ai développé Eclusia : une solution qui analyse les prompts et les fichiers déposés sur les plateformes d'IA en temps réel. Si des données personnelles (PII) sont détectées, le prompt est bloqué avant l'envoi. L'extension web permet aussi d'anonymiser automatiquement les contenus sensibles. Le modèle NLP tourne localement sur le poste de l'utilisateur, sans envoi de données vers le cloud.

Étapes du projet :
1. Développement de l'extension web : interception des prompts en temps réel et blocage le temps de l'analyse
2. Benchmark de modèles NLP (spaCy, Privacy-Filter, BERT)
3. Construction d'un dataset de données sensibles (PII, contextes variés)
4. Fine-tuning et optimisation du modèle retenu
5. Développement du logiciel desktop pour exécuter le modèle localement (inférence ONNX)
6. Packaging et distribution (Nuitka, Inno Setup)`,
    technologies: [
      'Python',
      'JavaScript',
      'spaCy',
      'Transformers',
      'BERT',
      'ONNX',
      'Nuitka',
      'Inno Setup',
    ],
    links: [{ label: 'Site web', url: 'https://eclusia.com' }],
  },
  {
    slug: 'cleancity computer-vision',
    title: 'CleanCity Computer Vision',
    shortDescription:
      'Fine-tuning du modèle YOLOv5 pour la détection et la classification de déchets et dépôts sauvages pour la ville de Nanterre.',
    longDescription: `Dans le cadre du concours Kesk'IA (concours de développement IA), j'ai fine-tuné le modèle YOLOv5 afin que les habitants de Nanterre puissent signaler des dépôts sauvages depuis l'application mobile de la ville. Le système identifie le type de déchet, réccupère sa localisation grâce aux méta-données et transmet automatiquement un signalement aux agents municipaux, avec la catégorie de collecte adaptée (camion ordures ménagères, encombrants, etc.).

Étapes du projet :
1. Choix du modèle (YOLOv5) et définition des classes de déchets
2. Recherche et constitution du jeu de données (images urbaines, dépôts variés)
3. Labellisation des images (bounding boxes + classes)
4. Entraînement et évaluation du modèle (métriques mAP, recall)
5. Intégration dans un dashboard de suivi et de validation des prédictions
6. Mise en production (API containerisée, connexion à l'application Nanterre)`,
    technologies: ['Python', 'PyTorch', 'YOLOv5', 'OpenCV', 'Docker', 'FastAPI'],
  },
  {
    slug: 'generateur-gateway-protocoles-industriels',
    title: 'Générateur IA de Gateway',
    shortDescription:
      "Passerelle universelle pour bâtiments connectés : détection automatique des protocoles industriels (Modbus, M-Bus), encapsulation BACnet et interprétation des mesures via un dictionnaire d'équipements.",
    longDescription: `Ping 64 est une solution d'interopérabilité pour la supervision de bâtiments. Elle permet de collecter des données issues de capteurs hétérogènes (thermostats Modbus, compteurs M-Bus, etc.), de les normaliser via une carte gateway « Auto-Link », puis de les interpréter côté automate grâce à un dictionnaire JSON (coefficients, offsets, unités). Un extracteur IA (Calude-Sonnet) analyse les PDF fabricants pour générer automatiquement les mappings de registres. L'ensemble repose sur une base PostgreSQL modélisant fabricants, équipements, registres et mesures.

Étapes du projet :
1. Etude des différents protocoles industriels (Modbus, M-Bus, BACnet) et de leur encapsulation
2. Recherche d'une solution technique.
3. Conception du schéma BDD (fabricants, modèles, registres, règles métier, mesures)
4. Développement du générateur IA de dictionnaires.
5. Développement de la simulation de la carte gateway.`,
    technologies: [
      'Python',
      'API Claude',
      'Modbus TCP',
      'M-Bus',
      'BACnet',
      'PostgreSQL',
      'pymupdf4llm',
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/Ima-ne01/ping64' }],
  },
]
