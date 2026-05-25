Paris, 02/2026 au 08/2026

Description :
Dans le cadre de mon stage ingénieur IA chez SFR, j'ai conçu et déployé un assistant réseau destiné à accompagner les ingénieurs dans le diagnostic et la résolution d'incidents techniques. Au cœur de la solution, un agent de Root Cause Analysis (RCA) interroge de manière autonome plusieurs sources de données — logs, métriques et topologie réseau — afin d'identifier les anomalies, remonter à leur origine et proposer des actions correctives. Le système repose sur une architecture RAG combinant recherche vectorielle et graphe relationnel, orchestrée via LangChain et DeepAgent, avec l'API Gemini comme modèle de langage. Des serveurs MCP exposent les bases de données métier (NetBox, Neo4j, ClickHouse...). L'ensemble a été containerisé, mis en production, monitoré avec Langfuse et documenté pour faciliter la prise en main par les équipes.

Étapes du stage :

1. Compréhension du besoin métier et cadrage des cas d'usage (diagnostic réseau, RCA)
2. Choix de la stack technique (LangChain, DeepAgent, Gemini, MCP)
3. Mise en place des serveurs MCP et des outils de requêtage sur les sources de données
4. Développement de l'agent RCA et de ses sous-agents spécialisés
5. Construction et enrichissement du RAG (base vectorielle et graphe relationnel)
6. Déploiement en production (Docker) et rédaction de la documentation
7. Ajustements, monitoring et traçabilité des interactions (Langfuse)

Stack :
Python, API Gemini, LangChain, DeepAgent, Docker, Langfuse, SQL, BDD (NetBox, Neo4j, PostgreSQL, ClickHouse)
