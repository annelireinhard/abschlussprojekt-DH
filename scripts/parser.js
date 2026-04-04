// ========== PARSER.JS ==========
// Ce fichier contient une seule fonction : parseXML()
// Elle reçoit un fichier XML et retourne du HTML prêt à être affiché.

function parseXML(xmlString) {

    // --- Étape 1 : transformer le texte brut en document XML lisible ---
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // --- Étape 2 : créer un conteneur HTML vide qui recevra le résultat ---
    const container = document.createElement("div");

    // --- NOUVEAU : collecter les notes avant de traiter les paragraphes ---
    const notes = xmlDoc.querySelectorAll("note[type='footnote']");
    const noteMap = buildNoteMap(notes);

    // --- Étape 3 : trouver tous les paragraphes dans le XML / génère une liste---
    const paragraphs = xmlDoc.querySelectorAll("p");

    // --- Étape 4 : traiter chaque paragraphe (élément de liste) ---
    paragraphs.forEach(function (p) {

        // Créer une div HTML pour ce paragraphe
        const pDiv = document.createElement("div");
        pDiv.classList.add("paragraph");
        pDiv.setAttribute("data-id", p.getAttribute("xml:id"));

        // --- Étape 5 : trouver tous les segments dans ce paragraphe ---
        const segments = p.querySelectorAll("seg");

        segments.forEach(function (seg, index) {

            // Créer un span HTML pour ce segment
            const segSpan = document.createElement("span");
            segSpan.classList.add("segment");
            segSpan.setAttribute("data-id", seg.getAttribute("xml:id"));

            // --- Étape 6 : gérer le contenu du segment (texte + italiques) ---
            segSpan.innerHTML = convertContent(seg);

            // --- Ajout d'un appel de note s'il y en a une ---
            const segId = seg.getAttribute("xml:id");
            if (noteMap[segId]) {
                const noteNumber = noteMap[segId].number;
                const callSpan = document.createElement("span");
                callSpan.classList.add("note-call");
                callSpan.textContent = noteNumber;
                callSpan.setAttribute("data-note", segId);
                segSpan.appendChild(callSpan);
            }

            if (index === segments.length - 1) {
                const pId = p.getAttribute("xml:id")
                if (noteMap[pId]) {
                    const noteNumber = noteMap[pId].number;
                    const callSpan = document.createElement("span");
                    callSpan.classList.add("note-call");
                    callSpan.textContent = noteNumber;
                    callSpan.setAttribute("data-note", segId);
                    segSpan.appendChild(callSpan);
                }
            }
        
            // Ajouter le span au paragraphe
        pDiv.appendChild(segSpan);

        });

        // Ajouter le paragraphe au conteneur
        container.appendChild(pDiv);
    });

    // --- Construire la zone de notes en bas de carte s'il y a des notes ---
    if (Object.keys(noteMap).length > 0) {
        const notesDiv = buildNotesSection(noteMap);
        container.appendChild(notesDiv);
    }


    return container;
}


// ========== FONCTION DE FORMATAGE (ITALIQUE) ==========
// convertContent() gère le contenu interne d'un segment :
// elle convertit <hi rend="italic"> en <em> et récupère le texte.

function convertContent(seg) {
    let html = " ";

    seg.childNodes.forEach(function (node) {

        // Cas 1 : c'est du texte simple
        if (node.nodeType === Node.TEXT_NODE) {
            html += node.textContent;
        }

        // Cas 2 : c'est une balise <hi rend="italic">
        else if (node.nodeName === "hi" && node.getAttribute("rend") === "italic") {
            html += "<em>" + node.textContent + "</em>";
        }

    });

    return html;
}

// ========== FONCTION: ASSOCIATION SEGMENT / NOTE (DICTIONNAIRE DE NOTES) ==========
// buildNoteMap() : construit un dictionnaire des notes
// associant chaque segment cible à son numéro et son contenu

function buildNoteMap(notes) {
    const noteMap = {};

    notes.forEach(function (note, index) {

        // "target" vaut par exemple "#s9" — on retire le # pour avoir "s9"
        const target = note.getAttribute("target").replace("#", "");
        const seg = note.querySelector("seg");

        noteMap[target] = {
            number: index + 1,
            content: convertContent(seg),
        };

    });

    return noteMap;
}

// ========== FONCTION: CREATION DE LA NOTE DE BAS DE PAGE ============
// buildNotesSection() : construit la zone de notes en bas de carte

function buildNotesSection(noteMap) {
    const section = document.createElement("div");
    section.classList.add("notes-section");

    const separator = document.createElement("hr");
    section.appendChild(separator);

    Object.keys(noteMap).forEach(function (segId) {
        const note = noteMap[segId];

        const noteDiv = document.createElement("div");
        noteDiv.classList.add("footnote");

        noteDiv.innerHTML = "<span class='note-number'>" + note.number + ".</span> " + note.content;

        section.appendChild(noteDiv);
    });

    return section;
}