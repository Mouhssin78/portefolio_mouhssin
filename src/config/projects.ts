import type { ProjectDetail } from '../types/desktop'

import eclusiaScreen from '@images/projets/eclusia-ai-cybersecurity/screen eclusia.png'
import eclusiaBenchmark from '@images/projets/eclusia-ai-cybersecurity/benchmark_results.png'
import eclusiaEntites from '@images/projets/eclusia-ai-cybersecurity/entites_par_casse.png'
import eclusiaLongueurs from '@images/projets/eclusia-ai-cybersecurity/longueurs_texte_tranches.png'
import eclusiaPhrases from '@images/projets/eclusia-ai-cybersecurity/phrases_par_nombre_entites.png'

import cleancityMain from '@images/projets/cleancity-computer-vision/image.png'
import cleancityTest from '@images/projets/cleancity-computer-vision/Test bac poubelle.png'

import ping64Software from '@images/projets/generateur-gateway-protocoles-industriels/Software.png'
import ping64Workflow from '@images/projets/generateur-gateway-protocoles-industriels/Workflow.png'
import ping64Encapsulation from '@images/projets/generateur-gateway-protocoles-industriels/encapsulation.png'

import comptavisionDash1 from '@images/projets/comptavision/dash1.png'
import comptavisionDash2 from '@images/projets/comptavision/dash2.png'
import comptavisionDash3 from '@images/projets/comptavision/dash3.png'
import comptavisionTableau from '@images/projets/comptavision/tableau.png'

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
      'NLP',
      'JavaScript',
      'spaCy',
      'Transformers',
      'BERT',
      'ONNX',
      'Nuitka',
      'Inno Setup',
    ],
    links: [{ label: 'Site web', url: 'https://eclusia.com' }],
    images: [
      eclusiaScreen,
      eclusiaBenchmark,
      eclusiaEntites,
      eclusiaLongueurs,
      eclusiaPhrases,
    ],
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
    images: [cleancityMain, cleancityTest],
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
    images: [ping64Software, ping64Workflow, ping64Encapsulation],
  },
  {
    slug: 'comptavision',
    title: 'ComptaVision',
    shortDescription:
      'Dashboard stratégique de pilotage financier à partir de fichiers FEC : KPIs, waterfall, trésorerie, balance âgée clients, et anonymisation des données personnelles pour analyse par outils IA conforme RGPD.',
    longDescription: `ComptaVision transforme les Fichiers des Écritures Comptables (FEC) en tableau de bord interactif pour le pilotage financier. L'outil ingère les exports Excel, structure les écritures comptables et expose une vue stratégique : chiffre d'affaires net, trésorerie globale, en-cours clients, waterfall du résultat net, évolution du cash-flow, structure des coûts (treemap), balance âgée clients et saisonnalité de l'activité. Un module d'anonymisation des données personnelles (libellés, comptes auxiliaires, etc.) permet d'exporter un FEC traité, exploitable par des outils d'IA tout en respectant le RGPD.

Étapes du projet :
1. Parsing et validation des fichiers FEC (format réglementaire français)
2. Nettoyage, typage et agrégation des écritures comptables
3. Calcul des indicateurs clés (CA, trésorerie, en-cours, résultat net)
4. Conception du dashboard stratégique (waterfall, cash-flow, treemap, balance âgée)
5. Filtres par période et visualisation de la saisonnalité
6. Module d'anonymisation RGPD et export du FEC pour analyse par outils IA`,
    technologies: ['Node.js', 'SheetJS', 'Cursor', 'HTML', 'CSS'],
    images: [comptavisionDash1, comptavisionDash2, comptavisionDash3, comptavisionTableau],
  },
]
