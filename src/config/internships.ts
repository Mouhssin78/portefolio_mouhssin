import type { ProjectDetail } from '../types/desktop'

import bdlLogo from '@images/bdl.png'
import iritelLogo from '@images/iritel.png'
import sfrLogo from '@images/SFR.png'

export const INTERNSHIPS: ProjectDetail[] = [
  {
    slug: 'stage-ingenieur-ia',
    title: 'Stage Ingénieur IA SFR',
    shortDescription:
      "Conception et déploiement d'un assistant réseau avec agent RCA pour le diagnostic et la résolution d'incidents techniques.",
    period: {
      location: 'Paris',
      from: '02/2026',
      to: '08/2026',
      duration: '6 mois',
    },
    longDescription: `Dans le cadre de mon stage ingénieur IA chez SFR, j'ai conçu et déployé un assistant réseau destiné à accompagner les ingénieurs dans le diagnostic et la résolution d'incidents techniques. Au cœur de la solution, un agent de Root Cause Analysis (RCA) interroge de manière autonome plusieurs sources de données — logs, métriques et topologie réseau — afin d'identifier les anomalies, remonter à leur origine et proposer des actions correctives. Le système repose sur une architecture RAG combinant recherche vectorielle et graphe relationnel, orchestrée via LangChain et DeepAgent, avec l'API Gemini comme modèle de langage. Des serveurs MCP exposent les bases de données métier (NetBox, Neo4j, ClickHouse...). L'ensemble a été containerisé, mis en production, monitoré avec Langfuse et documenté pour faciliter la prise en main par les équipes.

Étapes du stage :
1. Compréhension du besoin métier et cadrage des cas d'usage (diagnostic réseau, RCA)
2. Choix de la stack technique (LangChain, DeepAgent, Gemini, MCP)
3. Mise en place des serveurs MCP et des outils de requêtage sur les sources de données
4. Développement de l'agent RCA et de ses sous-agents spécialisés
5. Construction et enrichissement du RAG (base vectorielle et graphe relationnel)
6. Déploiement en production (Docker) et rédaction de la documentation
7. Ajustements, monitoring et traçabilité des interactions (Langfuse)`,
    technologies: [
      'Python',
      'API Gemini',
      'LangChain',
      'DeepAgent',
      'Docker',
      'Langfuse',
      'SQL',
      'NetBox',
      'Neo4j',
      'PostgreSQL',
      'ClickHouse',
    ],
    icon: sfrLogo,
  },
  {
    slug: 'stage-data-analyst-automatisation',
    title: 'Stage Data Analyst Banque de Luxembourg',
    shortDescription:
      'Valorisation de données, dashboards et automatisation de processus métiers, avec un agent IA générant 25 h de gain mensuel.',
    period: {
      location: 'Luxembourg',
      from: '04/2025',
      to: '09/2025',
      duration: '6 mois',
    },
    longDescription: `Dans le cadre de mon stage data analyst à la Banque de Luxembourg, j'ai accompagné les équipes métier dans la valorisation de leurs données et l'automatisation de leurs processus. J'ai conçu et livré des dashboards opérationnels — détection de fraude, suivi d'équipes pour les managers — ainsi que des workflows d'automatisation et d'analyse de données. Une part importante du travail consistait à extraire et structurer les données via SQL pour répondre aux besoins des différents métiers. J'ai également développé un agent IA chargé d'analyser et de traiter des jeux de données récurrents, générant un gain estimé de 25 heures de travail par mois.

Exemples de projets :
1. Dashboard de suivi opérationnel
2. Workflow d'automatisation (mouvement de métaux précieux)
3. Agent IA pour l'analyse et le traitement de données`,
    technologies: ['Python', 'SQL', 'Qlik Sense', 'Power BI', 'Alteryx', 'Avaloq', 'API'],
    icon: bdlLogo,
    iconOffset: { y: 16 },
  },
  {
    slug: 'stage-assistant-ingenieur-etudes-prix',
    title: 'Stage ingénieur études de prix IRITEL',
    shortDescription:
      'Estimation financière de projets électriques : quantification des coûts et tableaux de suivi.',
    period: {
      from: '06/2022',
      to: '09/2022',
      duration: '3 mois',
    },
    longDescription: `Dans le cadre de mon stage assistant ingénieur études de prix chez IRITEL, j'ai contribué à l'estimation financière de projets électriques. J'ai quantifié les coûts des ouvrages et fournitures pour l'élaboration de devis, et conçu des tableaux de suivi permettant de piloter l'avancement et le contrôle des projets en cours.`,
    technologies: ['Excel'],
    icon: iritelLogo,
    iconOffset: { y: 20 },
  },
]
