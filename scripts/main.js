// ========== MAIN.JS ==========
// load XML-files, call parser, display texts, additional functionalities


const XML_FILES = {
    sl: "../source_texts/Severni_sij_Chap-1.xml",
    de_1990: "../source_texts/Nordlicht_1990_Chap-1.xml",
    de_2011: "../source_texts/Nordlicht_2011_Chap-1.xml",
    fr: "../source_texts/Aurore_boreale_Chap-1.xml",
    en: "../source_texts/Northern_Lights_Chap-1.xml"
};

// ========== TEXTLOADING FUNCTION ==========

function loadTexts() {

    // --- Load all files simultaneously ---
    const fetchSl = fetch(XML_FILES.sl).then(function (response) {
        return response.text();
    });

    const fetchDe_1990 = fetch(XML_FILES.de_1990).then(function (response) {
        return response.text();
    });

    const fetchDe_2011 = fetch(XML_FILES.de_2011).then(function (response) {
        return response.text();
    });

    const fetchFr = fetch(XML_FILES.fr).then(function (response) {
        return response.text();
    });

    const fetchEn = fetch(XML_FILES.en).then(function (response) {
        return response.text();
    });

    // --- Wait for all files to be loaded (= control order of display) ---
    Promise.all([fetchSl, fetchDe_1990, fetchDe_2011, fetchFr, fetchEn]).then(function (results) {

        const xmlStringSl = results[0];
        const xmlStringDe_1990 = results[1];
        const xmlStringDe_2011 = results[2];
        const xmlStringFr = results[3];
        const xmlStringEn = results[4]

        // --- Parse XML (= read and convert to html) ---
        const htmlSl = parseXML(xmlStringSl, "sl");
        const htmlDe_1990 = parseXML(xmlStringDe_1990, "de-1990");
        const htmlDe_2011 = parseXML(xmlStringDe_2011, "de-2011");
        const htmlFr = parseXML(xmlStringFr, "fr");
        const htmlEn = parseXML(xmlStringEn, "en")

        // --- Place result onto the page ---
        document.getElementById("text-sl").appendChild(htmlSl);
        document.getElementById("text-de-1990").appendChild(htmlDe_1990);
        document.getElementById("text-de-2011").appendChild(htmlDe_2011);
        document.getElementById("text-fr").appendChild(htmlFr);
        document.getElementById("text-en").appendChild(htmlEn)

        // --- Synchronisation click / highlights (see below) ---
        setupSync();
        // --- Synchronisation control panel / texts (see below) ---
        setupControls();

    });
}

// ========== EXECUTE MAIN FUNCTION ==========
loadTexts();


// ========== SYNCHRONISATION CLICK / HIGHLIGHT ==========

function setupSync() {

    // --- Search for clicks on the page ---
    document.addEventListener("click", function (event) {

        // --- Find corresponding segment ---
        const clickedSegment = event.target.closest(".segment");

        // Erase all previous highlights 
        document.querySelectorAll(".segment.highlight").forEach(function (el) {
            el.classList.remove("highlight");
        });

        if (!clickedSegment) return;

        // --- Read identifier of the clicked segment ---
        const segmentId = clickedSegment.getAttribute("data-id");

        // --- Highlight all corresponding segments ---
        document.querySelectorAll('.segment[data-id="' + segmentId + '"]').forEach(function (el) {
            el.classList.add("highlight");
        });

    });
}

// ========== DISPLAY / HIDE VERSIONS ==========

function setupControls() {

    // --- Search for all checkboxes in the control panel ---
    const checkboxes = document.querySelectorAll("#control-panel input[type='checkbox']");

    // --- Search for any change in the checkboxes ---
    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            // --- Identify corresponding column if there is a change (i.e. "check-sl" becomes "column-sl") ---
            const columnId = checkbox.id.replace("check-", "column-");
            const column = document.getElementById(columnId);

            // --- Display or hide column depending on status of the checkbox ---
            if (checkbox.checked) {
                column.classList.remove("hidden");
            } else {
                column.classList.add("hidden");
            }

        });
    });
}