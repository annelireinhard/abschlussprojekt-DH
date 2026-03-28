# Abschlussprojekt-DH

## Concept de base

### Problème
J'aimerais coder le projet avec ton aide, mais j'ai besoin de comprendre ce que je fais car je n'ai que de très vagues notions de programmation.
Mon projet est le suivant: j'aimerais créer une petite édition numérique pour un chapitre de livre disponible en plusieurs langues. Les quatre textes (un original et trois traductions) sont disponibles dans quatre fichiers XML. Il sont divisés en paragraphes et en segments, dotés d'identifiant xml (xml:id="s1" ou xml:id="p1").
L'objectif est de créer un frontend (page html): 
1) afficher les quatre versions en parallèle
2) si je clique sur un segment de l'original, le segment correspondant sera mis en évidence dans les traductions. (cela vaut pour toutes les versions)
J'ai déjà un projet sur GitHub avec un lien vers un frontend.
Au niveau de mon code, j'ai un dossier "source_texts" contenant mes quatre textes; j'ai une page "index.html" qui sera ma page principale; j'ai un dossier "scripts" qui contient pour l'instant une fonction "loadComponents"; j'ai un dossier "css" pour la mise en page; j'ai un dossier "components".
Les formats utilisés seront a priori html, javascript et css.
J'ai quelques notions de programmation qui me permettent de déchiffrer un code rédigé, mais aucune compétence pour produire quelque chose moi-même. J'ai toutefois besoin de comprendre ce que je fais pour pouvoir présenter mon travail et rédiger un rapport dessus.\

On commence par deux versions (original + français). On peut ajouter les 2-3 autres ensuite.

On ignore pour l'instant:

- les notes de bas de page
- la fonction d'affichage et de masquage

### Etapes

1. Comprendre la structure de tes XML. Avant tout, il faut examiner un de tes fichiers XML pour voir comment les paragraphes et segments sont organisés (comment les balises s'imbriquent, comment les xml:id sont formulés). C'est la base de tout le reste.
2. Écrire le JavaScript qui lit un fichier XML. Un script dans ton dossier scripts/ devra "charger" un fichier XML et en extraire les segments avec leurs identifiants. C'est ce qu'on appelle parser le XML.
3. Construire l'affichage HTML dynamiquement. Ce même script devra ensuite transformer ce qu'il a lu en colonnes HTML visibles sur la page — une colonne par texte, avec les segments identifiables.
4. Mettre en page avec le CSS. Un fichier dans ton dossier css/ définira l'aspect visuel : deux colonnes côte à côte, typographie, etc.
5. Orchestrer tout ça depuis index.html. La page principale appellera le script et définira la structure générale de la page.

Une fois l'affichage fonctionnel, tu ajoutes la logique d'interaction :
6. Rendre les segments "cliquables". Chaque segment affiché dans le HTML devra porter l'identifiant correspondant (par exemple data-id="s1") pour qu'on puisse le retrouver.
7. Écrire la fonction de mise en évidence. Un script détectera le clic sur un segment, lira son identifiant, puis ira chercher et surlignera le segment portant le même identifiant dans l'autre colonne.
8. Étendre à quatre textes. Une fois que ça fonctionne à deux, passer à quatre est principalement une question d'adapter l'affichage (quatre colonnes) et de répéter la synchronisation sur toutes les colonnes.

### Structure de fichiers

index.html                  ← page principale
css/layout.css              ← mise en page (colonnes, typographie)
scripts/parser.js           ← lit le XML, produit du HTML
scripts/main.js             ← charge les fichiers, orchestre l'affichage
source_texts/
  Severni_sij_Chap-1.xml
  Aurore_boreale_Chap-1.xml
  + les autres plus tard

À créer dans cet ordre: 

1. index.html définit :
    - La structure de la page (deux colonnes)
    - Les métadonnées (titre, encodage)
    - Les liens vers le CSS et les scripts

2. layout.css définit :
    - L'affichage en deux colonnes côte à côte
    - L'apparence des paragraphes et segments
    - (Plus tard) la couleur de surbrillance au clic

3. parser.js contient une fonction qui :
    - Reçoit le contenu brut d'un fichier XML
    - Trouve tous les <p> et <seg> avec leurs identifiants
    - Retourne un bloc HTML prêt à être inséré dans la page

4. main.js :
    - Demande au navigateur de charger les deux fichiers XML
    - Passe chaque fichier au parser
    - Place le résultat dans la bonne colonne de index.html