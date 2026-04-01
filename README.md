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

## Squelette et mise en page

### index.html

**La fonction de <div>**: 
- <div> est probablement la balise HTML la plus utilisée — et aussi la plus neutre. Son nom vient de division.
- Concrètement, <div> ne fait rien par lui-même. C'est une simple boîte invisible qui regroupe des éléments pour qu'on puisse les manipuler ensemble.
On lui donne un sens en lui ajoutant un id ou une class. 
    - **L'id** est un nom unique sur toute la page — JavaScript s'en sert pour retrouver précisément cet élément : "va chercher la boîte qui s'appelle text-sl et mets-y ce texte"
    - **La class** est un nom partagé entre plusieurs éléments — le CSS s'en sert pour appliquer le même style à tous les éléments qui portent ce nom : "tous les éléments qui ont la classe column seront affichés côte à côte". 
- **La distinction id vs class est importante à retenir : id = unique, class = réutilisable.**

### layout.css

- **rem — qu'est-ce que c'est ?**: c'est un acronyme : Root Em. C'est une unité de mesure relative. "Root" désigne l'élément racine de la page (le <html>), et "em" est une unité typographique traditionnelle qui correspond à la taille d'une lettre "M". Concrètement : si la taille de police de base est 16px (ce qu'on a défini dans body), alors 1rem = 16px, 2rem = 32px, 0.5rem = 8px. L'avantage sur les pixels fixes : si l'utilisateur agrandit le texte dans son navigateur, tout s'adapte proportionnellement.

- **padding: 2rem 1rem 1rem dans le header**: padding désigne l'espace intérieur d'un élément — l'espace entre son contenu et sa bordure. C'est différent de margin qui est l'espace extérieur (entre l'élément et ses voisins). Quand on donne plusieurs valeurs à padding, elles s'appliquent dans le sens des aiguilles d'une montre : haut, droite, bas, gauche. Mais avec trois valeurs, la règle est : haut, gauche+droite, bas. Donc 2rem 1rem 1rem signifie :
    - haut : 2rem (32px)
    - gauche et droite : 1rem (16px)
    - bas : 1rem (16px)


- **flex-direction**: Quand on utilise display: flex, le navigateur dispose les éléments enfants les uns à la suite des autres. flex-direction indique dans quel sens :
    - row = en ligne, de gauche à droite (c'est ce qu'on utilise — les colonnes côte à côte)
    - column = en colonne, de haut en bas
row est la valeur par défaut de flex, donc cette ligne est techniquement optionnelle ici — je l'ai gardée pour que le code soit explicite et lisible.

- **Les colonnes s'adaptent-elles à la taille de la fenêtre ?**: Oui, automatiquement. C'est précisément l'avantage de flex: 1 — chaque colonne prend une part égale de l'espace disponible, quelle que soit la largeur de la fenêtre. Si tu rétrécis la fenêtre, les deux colonnes rétrécissent ensemble, toujours à égalité. La limite est max-width: 1400px : au-delà de cette largeur, la page ne s'élargit plus.

- **.column h2 — le titre de la colonne**: Cette notation signifie : "tous les éléments <h2> qui se trouvent à l'intérieur d'un élément ayant la classe column". C'est ce qu'on appelle un sélecteur descendant en CSS. Ça permet de cibler précisément les titres des colonnes sans affecter d'autres <h2> qui pourraient exister ailleurs sur la page.

- **text-transform: uppercase**: Oui, tout le texte de cet élément passe en majuscules — mais uniquement visuellement. Dans le code HTML, le texte reste "Slovenščina", c'est juste l'affichage qui change. C'est un choix purement esthétique : les petits titres de section en capitales espacées (letter-spacing: 0.1em) donnent un aspect sobre et typographiquement soigné, classique dans les éditions scientifiques. Tu peux tout à fait supprimer cette ligne si tu préfères un affichage normal.

- **border-bottom**: C'est une ligne horizontale tracée sous l'élément. La valeur 1px solid #ddd se lit : épaisseur 1px, style solid (trait continu, par opposition à dashed = tirets ou dotted = pointillés), couleur #ddd (un gris très clair). On l'utilise ici deux fois :
    - Sous le header : une ligne qui sépare le titre de la page du contenu
    - Sous chaque .column h2 : une ligne fine sous le titre de chaque colonne

## Code – affichage des textes

### parser.js

#### Étape 1 — Transformer le texte brut en document XML lisible

Quand JavaScript charge un fichier externe (comme ton XML) avec fetch — ce qu'on verra dans main.js — le navigateur reçoit toujours le contenu comme texte brut, quelle que soit l'extension du fichier. C'est une règle de sécurité fondamentale : le navigateur ne fait pas confiance au contenu des fichiers externes au point de les interpréter directement. On est donc obligés de passer par cette étape en deux temps : recevoir le texte brut, puis le redonner à DOMParser pour le restructurer. C'est un peu comme recevoir une lettre scannée en image — même si c'est du texte, ton ordinateur ne peut pas le lire directement, il faut d'abord passer par un OCR.

- const: C'est une façon de déclarer une variable — c'est-à-dire de créer une boîte avec un nom, dans laquelle on va stocker quelque chose. const signifie que cette boîte ne changera pas de contenu au cours du programme (par opposition à let qui permet de changer la valeur plus tard). On utilise const par défaut quand on sait que la valeur est fixe — c'est une bonne pratique.
- new: Ce mot-clé signifie "crée une nouvelle instance de...". Certains outils en JavaScript sont des classes — des modèles réutilisables, comme un moule. new dit au navigateur : "fabrique-moi un exemplaire concret de ce moule". Sans new, on n'aurait pas un outil utilisable, juste la définition abstraite de l'outil.
- DOMParser(): C'est la classe en question — un outil intégré au navigateur dont le seul rôle est de lire du texte et de le transformer en document structuré. DOM signifie Document Object Model — c'est la représentation interne qu'utilise le navigateur pour organiser une page en arbre d'éléments imbriqués. Les parenthèses () sont obligatoires avec new — elles signalent qu'on appelle le "constructeur" de la classe, c'est-à-dire la procédure qui fabrique l'objet.
- parser: C'est simplement le nom qu'on choisit de donner à notre boîte. On aurait pu l'appeler monParser ou outil — ça n'aurait aucune importance pour le navigateur. Par convention, on choisit des noms courts et descriptifs en anglais.
- parser.parseFromString(xmlString, "application/xml"): Maintenant qu'on a notre outil parser, on lui demande de faire son travail. .parseFromString() est une méthode — c'est-à-dire une fonction qui appartient à l'outil parser. On lui passe deux informations entre parenthèses, séparées par une virgule — ce qu'on appelle des arguments :
    - xmlString : le texte brut du fichier XML (ce sera fourni par main.js)
    - "application/xml" : le type de document à lire — on lui dit explicitement "c'est du XML, pas du HTML" pour qu'il l'interprète correctement
- Le résultat — le document structuré — est stocké dans la boîte xmlDoc.

#### Étape 2 — Créer un conteneur HTML vide
- document: C'est l'objet qui représente toute la page HTML dans le navigateur. Il est toujours disponible automatiquement dans un script — on n'a pas besoin de le déclarer. C'est le point de départ pour tout ce qui concerne la page.
- .createElement("div"): Une méthode de document qui crée un nouvel élément HTML en mémoire. Entre guillemets, on précise le type d'élément voulu — ici "div". Cet élément existe dans la mémoire du navigateur mais n'est pas encore visible sur la page.
- container: La boîte qui stocke notre <div> vide. On va le remplir progressivement dans les étapes suivantes, puis le retourner à main.js à la fin.

#### Étape 3 — Trouver tous les paragraphes dans le XML
On appelle la méthode querySelectorAll sur notre document XML. Elle cherche tous les éléments qui correspondent au sélecteur donné entre guillemets — ici "p", donc tous les <p>. Elle retourne une liste ordonnée de tous les éléments trouvés. Si le XML contient 5 paragraphes, paragraphs sera une liste de 5 éléments.

#### Étape 4 — Traiter chaque paragraphe

- .forEach(function(p) { ... }): forEach est une méthode des listes qui dit : "pour chaque élément de cette liste, exécute cette fonction". Entre parenthèses, on définit une fonction anonyme — c'est-à-dire une fonction sans nom, définie à la volée juste pour cet usage. Le paramètre p représente l'élément courant à chaque tour de boucle : au premier tour p est le premier paragraphe, au deuxième tour le deuxième, etc.
pDiv.classList.add("paragraph")
- classList est la liste des classes CSS d'un élément. .add() en ajoute une. Après cette ligne, notre <div> ressemble à <div class="paragraph"> — le CSS de layout.css pourra donc s'y appliquer.
- pDiv.setAttribute("data-id", p.getAttribute("xml:id")): Deux méthodes en miroir :
    - p.getAttribute("xml:id") : "va lire la valeur de l'attribut xml:id dans le XML" — par exemple "p1"
    - pDiv.setAttribute("data-id", ...) : "écris cette valeur comme attribut data-id sur le div HTML"
- Le résultat : <div class="paragraph" data-id="p1">. C'est ce data-id que JavaScript utilisera pour la synchronisation au clic.

#### Étape 5 — Trouver tous les segments dans chaque paragraphe

Même logique qu'à l'étape 3-4, mais à l'intérieur de chaque paragraphe. Deux petites différences :
- p.querySelectorAll("seg") — on appelle querySelectorAll sur p (le paragraphe courant) et non sur xmlDoc entier. Cela limite la recherche aux segments de ce paragraphe uniquement.
- document.createElement("span") — on crée un <span> et non un <div>. La différence : <div> est un élément de type bloc (il prend toute la largeur, crée un saut de ligne), tandis que <span> est en ligne — il s'intègre dans le flux du texte comme un mot parmi d'autres. C'est exactement ce qu'on veut pour des segments de texte qui doivent s'enchaîner.

#### Étape 6 — Gérer le contenu du segment
- innerHTML: C'est la propriété qui contient le contenu HTML intérieur d'un élément. En lui assignant une valeur avec =, on remplace tout son contenu. Ici on lui donne le résultat de convertContent(seg).
- convertContent(seg): On appelle la fonction auxiliaire définie plus bas dans le fichier, en lui passant le segment courant. Elle retourne une chaîne de texte HTML — par exemple "Il chancelait, plié en deux" ou "<em>Hristos voskres</em>, cria l'homme" si le segment contient de l'italique.

#### Fonction auxiliaire

Avec la syntaxe classique, JavaScript fait ce qu'on appelle du hoisting (littéralement "hissage") : avant d'exécuter le code, il lit toutes les déclarations de fonctions et les "remonte" en mémoire. Donc même si convertContent est écrite après parseXML, JavaScript la connaît déjà au moment où parseXML l'appelle.

- let html = "": On déclare une variable html avec let (et non const) car on va la modifier à chaque tour de boucle. On commence avec une chaîne vide.
- seg.childNodes: Tous les "enfants directs" d'un segment — c'est-à-dire tout ce qu'il contient : du texte simple, des balises <hi>, etc. C'est plus précis que querySelectorAll qui descendrait dans toute la hiérarchie.
- node.nodeType === Node.TEXT_NODE: Chaque nœud a un type. Node.TEXT_NODE est une constante prédéfinie qui représente un nœud de texte simple (pas une balise). Le === est une comparaison stricte en JavaScript — "est exactement égal à".
- html += node.textContent: 
    - += signifie "ajoute à la fin de". On accumule le texte dans la variable html. 
    - textContent est le texte brut d'un nœud, sans balises.
- node.nodeName === "hi": nodeName est le nom de la balise. On vérifie que c'est bien "hi" ET que son attribut rend vaut "italic" — les deux conditions ensemble avec && ("et").
- return html: À la fin, on retourne la chaîne HTML construite — elle sera assignée à innerHTML du segment.

### main.js

#### Récupérer les fichiers

- XML_FILES: Un objet JavaScript — c'est-à-dire un ensemble de paires clé : valeur, entouré d'accolades. Ici on stocke les chemins vers les deux fichiers XML. sl et fr sont les clés, les chemins sont les valeurs. On y accède avec la notation pointée : XML_FILES.sl retourne "source_texts/Severni_sij_Chap-1.xml". Regrouper ces chemins en haut du fichier est une bonne pratique : si un fichier est renommé ou déplacé, on n'a qu'un seul endroit à modifier.
- fetch(): C'est la fonction native du navigateur pour charger un fichier externe. On lui passe le chemin du fichier, et elle lance la requête. Le point crucial : fetch est asynchrone — elle ne bloque pas le reste du programme pendant le chargement. Elle retourne ce qu'on appelle une Promise.
- Les Promises: C'est le concept le plus important de ce fichier. Une Promise est une promesse de résultat futur. Quand on appelle fetch(), le fichier n'est pas encore chargé — le navigateur dit en quelque sorte : "je te promets que je t'apporterai le résultat quand ce sera prêt".
On lui dit quoi faire quand la promesse est tenue avec .then() — "quand c'est prêt, alors fais ceci". La fonction passée à .then() reçoit le résultat comme argument. Ici : "charge ce fichier, et quand la réponse arrive, convertis-la en texte brut". response.text() retourne elle-même une Promise — c'est pour ça que fetchSl est une Promise qui contiendra finalement le texte brut du fichier XML.
- Promise.all([fetchSl, fetchFr]): On veut attendre que les deux fichiers soient chargés avant de continuer — pas l'un après l'autre, mais les deux en parallèle. Promise.all() prend une liste de Promises et retourne une nouvelle Promise qui se résout quand toutes les Promises de la liste sont terminées.
- results est une liste contenant les résultats dans le même ordre que les Promises passées : results[0] est le texte du fichier slovène, results[1] celui du fichier français.

**Attention:**
- {...} est un objet : une collection de paires clé-valeur. On accède aux éléments par leur nom : XML_FILES.sl
[...] est un tableau (array) : une liste ordonnée. On accède aux éléments par leur position : results[0]

Dans notre code, on utilise les deux : XML_FILES est un objet, results est un tableau.

**Promise.all: Ordre d'exécution**
Le problème n'est pas les variables — c'est l'ordre d'exécution. Si on exécutait sans Promise.all : Ça fonctionnerait probablement... mais on n'aurait aucun contrôle sur l'ordre d'affichage. Le fichier le plus léger arriverait en premier, et le texte français pourrait apparaître avant le slovène, ou vice-versa, selon la vitesse du réseau. Sur GitHub Pages avec deux petits fichiers, ça passerait inaperçu — mais avec quatre fichiers, ou des fichiers plus lourds, l'affichage serait chaotique.
Promise.all garantit qu'on n'affiche quoi que ce soit qu'une fois que tout est prêt, et dans l'ordre qu'on a décidé.

#### Appel au parser

On appelle la fonction parseXML() qu'on a écrite dans parser.js — elle est disponible ici car parser.js est chargé avant main.js dans index.html. Elle reçoit le texte brut et retourne un élément HTML construit en mémoire.

#### Injection dans la page

document.getElementById() retrouve un élément de la page par son id — ici les deux <div> vides qu'on avait préparés dans index.html. .appendChild() y insère notre élément HTML construit — à ce moment précis, le texte devient visible sur la page.

#### Lancement

loadTexts(): La dernière ligne appelle simplement la fonction pour lancer tout le processus. Sans elle, tout le code serait défini mais rien ne s'exécuterait.

## Test – objectif n°1

### Problèmes

- Problème: pas d'espace entre les <span>
    - Solution: dans let html = "" (fonction auxiliaire), ajouter une espace: let html = " "

### Mise en page (à régler plus tard)
- trop d'espace entre les paragraphes
- j'aimerais séparer les textes dans des cartes (pas directement sur la page)