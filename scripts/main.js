// ========== MAIN.JS ==========
// Ce fichier orchestre tout : il charge les fichiers XML,
// appelle le parser, et affiche le résultat dans la page.

// --- Les chemins vers les fichiers XML ---
const XML_FILES = {
    sl: "source_texts/Severni_sij_Chap-1.xml",
    fr: "source_texts/Aurore_boreale_Chap-1.xml"
};

// ========== FONCTION PRINCIPALE ==========

function loadTexts() {

    // --- Étape 1 : lancer le chargement des deux fichiers en parallèle ---
    const fetchSl = fetch(XML_FILES.sl).then(function (response) {
        return response.text();
    });

    const fetchFr = fetch(XML_FILES.fr).then(function (response) {
        return response.text();
    });

    // --- Étape 2 : attendre que les deux fichiers soient chargés ---
    Promise.all([fetchSl, fetchFr]).then(function (results) {

        const xmlStringSl = results[0];
        const xmlStringFr = results[1];

        // --- Étape 3 : parser les deux XML ---
        const htmlSl = parseXML(xmlStringSl);
        const htmlFr = parseXML(xmlStringFr);

        // --- Étape 4 : injecter le résultat dans la page ---
        document.getElementById("text-sl").appendChild(htmlSl);
        document.getElementById("text-fr").appendChild(htmlFr);
        // --- ajout de la synchronisation au clic ---
        setupSync();
        // --- synchronisation de l'affichage entre panneau de contrôle et textes ---
        setupControls();

    });
}

// ========== LANCEMENT ==========
loadTexts();


// ========== SYNCHRONISATION AU CLIC ==========

function setupSync() {

    // --- Étape 1 : écouter tous les clics sur la page ---
    document.addEventListener("click", function (event) {

        // --- Étape 2 : remonter jusqu'au segment cliqué ---
        const clickedSegment = event.target.closest(".segment");

        // Si le clic n'est pas sur un segment, on ne fait rien
        if (!clickedSegment) return;

        // --- Étape 3 : lire l'identifiant du segment cliqué ---
        const segmentId = clickedSegment.getAttribute("data-id");

        // --- Étape 4 : effacer tous les surlignages existants ---
        document.querySelectorAll(".segment.highlight").forEach(function (el) {
            el.classList.remove("highlight");
        });

        // --- Étape 5 : surligner tous les segments correspondants ---
        document.querySelectorAll('.segment[data-id="' + segmentId + '"]').forEach(function (el) {
            el.classList.add("highlight");
        });

    });
}

// ========== AFFICHER / MASQUER LES VERSIONS ==========

function setupControls() {

  // --- Étape 1 : récupérer toutes les cases à cocher du panneau ---
  const checkboxes = document.querySelectorAll("#control-panel input[type='checkbox']");

  // --- Étape 2 : écouter chaque case à cocher ---
  checkboxes.forEach(function(checkbox) {

    checkbox.addEventListener("change", function() {

      // --- Étape 3 : identifier la colonne correspondante ---
      const columnId = checkbox.id.replace("check-", "column-"); //--- en fait on ne remplace que la partie de l'idée qui diffère ---
      const column = document.getElementById(columnId);

      // --- Étape 4 : afficher ou masquer selon l'état de la case ---
      if (checkbox.checked) {
        column.classList.remove("hidden");
      } else {
        column.classList.add("hidden");
      }

    });
  });
}