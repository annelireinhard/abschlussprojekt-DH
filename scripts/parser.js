// ========== PARSER.JS ==========
// Ce fichier contient une seule fonction : parseXML()
// Elle reçoit un fichier XML et retourne du HTML prêt à être affiché.

function parseXML(xmlString) {

    // --- Étape 1 : transformer le texte brut en document XML lisible ---
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // --- Étape 2 : créer un conteneur HTML vide qui recevra le résultat ---
    const container = document.createElement("div");

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

        segments.forEach(function (seg) {

            // Créer un span HTML pour ce segment
            const segSpan = document.createElement("span");
            segSpan.classList.add("segment");
            segSpan.setAttribute("data-id", seg.getAttribute("xml:id"));

            // --- Étape 6 : gérer le contenu du segment (texte + italiques) ---
            segSpan.innerHTML = convertContent(seg);

            // Ajouter le span au paragraphe
            pDiv.appendChild(segSpan);
        });

        // Ajouter le paragraphe au conteneur
        container.appendChild(pDiv);
    });

    return container;
}


// ========== FONCTION AUXILIAIRE ==========
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