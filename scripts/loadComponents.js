// ---------- Load Component Function ----------
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

        });
}


// ---------- Components ----------
loadComponent("head-placeholder", "components/head.html");