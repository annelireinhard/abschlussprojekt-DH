# «Drago Jančar multilingual». Mehrsprachige Edition des Romans *Severni sij*.

## Kontext

Die Seite «Drago Jančar multilingual: eine mehrsprachige Edition» ist als Abschlussprojekt im Rahmen des Minorstudiums in Digital Humanities an der Universität Bern entstanden. Die Wurzeln des Projekts liegen in einem literaturwissenschaftlichen Problem: die Analyse von Übersetzungen in der Weltliteratur. Werke der Weltliteratur werden sehr häufig in Übersetzungen gelesen, was eine Reihe von Herausforderungen für die Interpretationen mit sich bringt. Ein möglicher Ansatz ist der Vergleich von Übersetzungen in mehreren Sprachen, was allerdings sehr aufwendig ist – insbesondere im Umgang mit unterschiedlichen Druckausgaben. Anhand des Romans *Severni sij* vom slowenischen Autor Drago Jančar und von vier seiner Übersetzung ist das Ziel dieses digitalen Projekts, den Vergleich der Texte zugänglicher zu machen, damit das Potenzial dieser Methode in der Forschung ausgeschöpft werden kann. Es handelt sich hier um einen Entwurf in sehr kleinem Umfang, der dazu dient, eine Reflexion über digitale Edition für die Erforschung der Weltliteratur zu führen. Diese Reflexion findet im Projektbericht statt.

## Beschreibung der Seite

Das Frontend besteht aus einer Homepage, von der aus man zur Edition per se sowie zum Projektbericht gelangen kann. Die Rückkehr in die GitHub-Umgebung ist über einen Link im Footer jederzeit möglich. Von beiden Unterseiten aus kann man zurück zur Hauptseite gelangen. Die Edition selbst ist intuitiv gestaltet: Standardmässig sind alle Textversionen – Original und französische, englische, deutsche Erst- und deutsche Neuübersetzung – eingeblendet. Mittels der Kontrollkästchen oben links kann man Textversionen beliebig ein- und ausblenden. Jede Textversion ist in Segmenten unterteilt, die anklickbar sind. Beim Klick auf einem Segment werden alle korrespondierenden Segmente in den eingeblendeten Versionen gelb hervorgehoben. Die Hervorhebung lassen sich mittels eines Klicks in den weissen Bereichen der Seite zurücksetzen.

Die Seite ist [hier](https://annelireinhard.github.io/abschlussprojekt-DH/) aufrufbar.

## Aufbau

Dieses Repository beinhaltet alle Unterlagen, die für die Umsetzung des Projektes verwendet wurden, und ist wie folgt aufgebaut:

1. Datei «index.html»: Homepage mit Links zur Edition und zum Projektbericht
2. Ordner «source_texts»: Dieser Ordner beinhaltet die fünf aufbereiteten XML-Dateien sowie Scans der Originaldokumente. 
3. Ordner «pages»: In diesem Ordner befinden sich die HTML-Dateien zu den zwei Unterseiten (Edition und Bericht).
4. Ordner «scripts»: Dieser Ordner beinhaltet die zwei JavaScript-Programme für die Edition. Die Datei «parser.js» beinhaltet das Programm, das den Inhalt der XML-Dateien in brauchbaren HTML-Text für die Edition umwandelt. Die Datei «main.js» lädt die Texte, führt die Parser-Funktion aus, und fügt den Text in die Editionsseite ein. Sie steuert auch die Funktionalitäten der Edition, nämlich die Kontrollkästchen und die Synchronisierung der Versionen mittels Hervorhebungen.
5. Ordner «css»: Dieser Ordner beinhaltet die Layout-Bestimmungen für die drei HTML-Seiten.
