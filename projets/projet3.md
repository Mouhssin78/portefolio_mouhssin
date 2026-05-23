1.1 Nom : Générateur IA de Gateway
1.2 Slug : générateur de gateway-protocoles-industriels
1.3 Description courte : Passerelle universelle pour bâtiments connectés : détection automatique des protocoles industriels (Modbus, M-Bus), encapsulation BACnet et interprétation des mesures via un dictionnaire d'équipements.

2.1 Description longue :
Ping 64 est une solution d'interopérabilité pour la supervision de bâtiments. Elle permet de collecter des données issues de capteurs hétérogènes (thermostats Modbus, compteurs M-Bus, etc.), de les normaliser via une carte gateway « Auto-Link », puis de les interpréter côté automate grâce à un dictionnaire JSON (coefficients, offsets, unités). Un extracteur IA (Calude-Sonnet) analyse les PDF fabricants pour générer automatiquement les mappings de registres. L'ensemble repose sur une base PostgreSQL modélisant fabricants, équipements, registres et mesures.

Étapes du projet :
1. Simulation de capteurs Modbus TCP et M-Bus (serveurs UDP/TCP avec trames réalistes)
2. Développement de la carte gateway : détection automatique du protocole et encapsulation BACnet
3. Moteur automate : réception BACnet, consultation du dictionnaire et calcul des valeurs physiques
4. Conception du schéma BDD (fabricants, modèles, registres, règles métier, mesures)
5. Extracteur intelligent de dictionnaires : parsing PDF + extraction IA des tables de registres (Modbus, BACnet, M-Bus)
6. Prototypes d'encapsulation/désencapsulation et scénarios de simulation bout-en-bout

2.2 Technologies : Python, API Claude, Modbus TCP, M-Bus, BACnet, PostgreSQL, pymupdf4llm
2.3 Image (optionnel) :

3. Liens :
- Label : github | URL : https://github.com/Ima-ne01/ping64
- Label : | URL :

4.1 Icône personnalisée (optionnel) :
4.2 Ordre sur le bureau (optionnel) :
