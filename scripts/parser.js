// ========== PARSER.JS ==========
// Receives XML-file and return formatted HTML-text

function parseXML(xmlString, columnId) {

    // --- convert raw rext to xml ---
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // --- create empty html container (will receive text later) ---
    const container = document.createElement("div");

    // --- Collect all footnotes (function buildNoteMap: see below) ---
    const notes = xmlDoc.querySelectorAll("note[type='footnote']");
    const noteMap = buildNoteMap(notes);

    // --- Collect all paragraphs into a list and process them ---
    const paragraphs = xmlDoc.querySelectorAll("p");

    paragraphs.forEach(function (p) {

        // Create <div> element (html) for each paragraph
        const pDiv = document.createElement("div");
        pDiv.classList.add("paragraph");
        pDiv.setAttribute("data-id", p.getAttribute("xml:id"));

        // --- Collect all segments in the paragraph ---
        const segments = p.querySelectorAll("seg");

        segments.forEach(function (seg, index) {

            // Create <span> element (html) for each segment
            const segSpan = document.createElement("span");
            segSpan.classList.add("segment");
            segSpan.setAttribute("data-id", seg.getAttribute("xml:id"));

            // --- format segment (function convertContent: see below) ---
            segSpan.innerHTML = convertContent(seg);

            // --- Add note call if note is on a segment ---
            const segId = seg.getAttribute("xml:id");
            if (noteMap[segId]) {
                const noteNumber = noteMap[segId].number;
                const callSpan = document.createElement("a");
                callSpan.classList.add("note-call");
                callSpan.textContent = noteNumber;
                callSpan.setAttribute("data-note", segId);
                callSpan.setAttribute("id", "call-" + noteNumber + "-" + columnId)
                callSpan.setAttribute("href", "#note-" + noteNumber + "-" + columnId)
                segSpan.appendChild(callSpan);
            }

            // --- Add note call if note is on a paragraph (verification on last segment of a paragraph)
            if (index === segments.length - 1) {
                const pId = p.getAttribute("xml:id")
                if (noteMap[pId]) {
                    const noteNumber = noteMap[pId].number;
                    const callSpan = document.createElement("a");
                    callSpan.classList.add("note-call");
                    callSpan.textContent = noteNumber;
                    callSpan.setAttribute("data-note", segId);
                    callSpan.setAttribute("id", "call-" + noteNumber + "-" + columnId)
                    callSpan.setAttribute("href", "#note-" + noteNumber + "-" + columnId)
                    segSpan.appendChild(callSpan);
                }
            }

            // Add <span> to paragraph
            pDiv.appendChild(segSpan);

        });

        // Add paragraph to container
        container.appendChild(pDiv);
    });

    // --- Build note section if necessary (buildNotesSection: see below) ---
    if (Object.keys(noteMap).length > 0) {
        const notesDiv = buildNotesSection(noteMap, columnId);
        container.appendChild(notesDiv);
    }


    return container;
}


// ========== FUNCTION : FORMATTING (ITALICS) ==========
// Convert <hi rend="italic"> (xml) to <em> (html)

function convertContent(seg) {
    let html = " ";

    seg.childNodes.forEach(function (node) {

        // if plain text
        if (node.nodeType === Node.TEXT_NODE) {
            html += node.textContent;
        }

        // if tag <hi rend="italic">
        else if (node.nodeName === "hi" && node.getAttribute("rend") === "italic") {
            html += "<em>" + node.textContent + "</em>";
        }

    });

    return html;
}

// ========== FUNCTION: ASSOCIATION SEGMENT / NOTE (NOTE DICTIONARY) ==========

function buildNoteMap(notes) {
    const noteMap = {};

    notes.forEach(function (note, index) {

        // If "target" = "#s9" — delete # to obtain "s9"
        const target = note.getAttribute("target").replace("#", "");
        const seg = note.querySelector("seg");
        const noteId = seg.getAttribute("xml:id");

        noteMap[target] = {
            number: index + 1,
            content: convertContent(seg),
            identifier: noteId,
        };

    });

    return noteMap;
}

// ========== FUNCTION: CREATE FOOTNOTES ============

// Build note section
function buildNotesSection(noteMap, columnId) {
    const section = document.createElement("div");
    section.classList.add("notes-section");

    const separator = document.createElement("hr");
    section.appendChild(separator);

// Create footnotes (incl. link towards target)
    Object.keys(noteMap).forEach(function (segId) {
        const note = noteMap[segId];

        const noteDiv = document.createElement("div");
        noteDiv.classList.add("footnote", "segment");
        noteDiv.setAttribute("data-id", note.identifier);
        noteDiv.setAttribute("id", "note-" + note.number + "-" + columnId)

        noteDiv.innerHTML = "<a href='#call-" + note.number + "-" + columnId +"'> <span class='note-number'>" + note.number + ".</span></a>" + note.content + "<br>";

        section.appendChild(noteDiv);
    });

    return section;
}