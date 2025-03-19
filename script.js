const equipements = [
    { nom: "Fresnel", symbole: "🔦" },
    { nom: "PC (Plan-Convexe)", symbole: "💡" },
    { nom: "Découpe", symbole: "🎯" },
    { nom: "PAR", symbole: "🔵" },
    { nom: "Beam", symbole: "🔺" },
    { nom: "Blinder", symbole: "⚡" },
    { nom: "Follow Spot", symbole: "👀" },
    { nom: "Wash LED", symbole: "🔶" },
    { nom: "Moving Head Spot", symbole: "🎭" },
    { nom: "Machine à fumée", symbole: "💨" },
    { nom: "Stroboscope", symbole: "⚡⚡" },
    { nom: "Laser", symbole: "✨" }
];

const scene = document.getElementById("scene");
const ctx = scene.getContext("2d");

let elementsPlaces = JSON.parse(localStorage.getItem("plan")) || [];

function afficherEquipements() {
    const liste = document.getElementById("equipements-list");
    liste.innerHTML = "";
    
    equipements.forEach(eq => {
        const div = document.createElement("div");
        div.classList.add("equipement");
        div.textContent = eq.symbole + " " + eq.nom;
        div.draggable = true;

        div.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify(eq));
        });

        liste.appendChild(div);
    });
}

scene.addEventListener("dragover", (e) => {
    e.preventDefault();
});

scene.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const rect = scene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    elementsPlaces.push({ nom: data.nom, symbole: data.symbole, x, y });
    sauvegarderPlan();
    dessinerScene();
});

function dessinerScene() {
    ctx.clearRect(0, 0, scene.width, scene.height);
    elementsPlaces.forEach(eq => {
        ctx.font = "20px Arial";
        ctx.fillText(eq.symbole, eq.x, eq.y);
    });
}

function sauvegarderPlan() {
    localStorage.setItem("plan", JSON.stringify(elementsPlaces));
}

function resetPlan() {
    elementsPlaces = [];
    sauvegarderPlan();
    dessinerScene();
}

function imprimerPlan() {
    const dataUrl = scene.toDataURL();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<img src="${dataUrl}" style="width:100%">`);
    printWindow.document.close();
    printWindow.print();
}

afficherEquipements();
dessinerScene();