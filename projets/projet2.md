1.1 Nom : Eclusia — AI Cybersecurity
1.2 Slug : eclusia-ai-cybersecurity
1.3 Description courte : Solution de sécurisation des IA génératives (ChatGPT, Claude, etc.) par détection de données personnelles (PII) en temps réel, via extension web et logiciel local.

2.1 Description longue :
Pour sécuriser l'utilisation des IA génératives, j'ai développé Eclusia : une solution qui analyse les prompts et les fichiers déposés sur les plateformes d'IA en temps réel. Si des données personnelles (PII) sont détectées, le prompt est bloqué avant l'envoi. L'extension web permet aussi d'anonymiser automatiquement les contenus sensibles. Le modèle NLP tourne localement sur le poste de l'utilisateur, sans envoi de données vers le cloud.

Étapes du projet :
1. Développement de l'extension web : interception des prompts en temps réel et blocage le temps de l'analyse
2. Benchmark de modèles NLP (spaCy, Privacy-Filter, BERT)
3. Construction d'un dataset de données sensibles (PII, contextes variés)
4. Fine-tuning et optimisation du modèle retenu
5. Développement du logiciel desktop pour exécuter le modèle localement (inférence ONNX)
6. Packaging et distribution (Nuitka, Inno Setup)

2.2 Technologies : Python, JavaScript, spaCy, Transformers, BERT, ONNX, Nuitka, Inno Setup
2.3 Image (optionnel) :

3. Liens :
- Label : Site web | URL : https://eclusia.com
- Label : | URL :

4.1 Icône personnalisée (optionnel) : logo.ico
4.2 Ordre sur le bureau (optionnel) :