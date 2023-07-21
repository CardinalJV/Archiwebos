/* Récupération des travaux depuis l'API */

function genererElement(element) {
    console.log(element);
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = element.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = element.title;
    gallery.appendChild(figure);
    figure.appendChild(imageElement);
    figure.appendChild(titleElement);
}

const response = await fetch("http://localhost:5678/api/works");
let works = await response.json();

/* - */

/* Génération des travaux dans sur la page d'accueil */

for (let element of works) {
    genererElement(element)
};

/* - */

/* Implémentation des fonctions de filtres sur les boutons correspondants */

const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const buttons = [btn1, btn2, btn3, btn4];

for (let button of buttons) {
    button.addEventListener("click", function () {
        for (let button of buttons) {
            button.style.backgroundColor = "white";
            button.style.color = "#1D6154";
        };
        button.style.backgroundColor = "#1D6154";
        button.style.color = "white";
        if (button === btn1) {
            document.querySelector(".gallery").innerHTML = "";
            for (let element of works) {
                genererElement(element)
            }
        } else {
            document.querySelector(".gallery").innerHTML = "";
            for (let item of works) {
                if (item.category.name !== button.value) {
                    console.log("Element trier")
                } else {
                    genererElement(item)
                }
            }
        }
    })
};

/* - */

/* Ajout du mode édition après vérification du token */

function editHomepage() {

    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const section = document.createElement("section");
    section.setAttribute("id", "edit-homepage");
    body.insertBefore(section, header);
    const div = document.createElement("div");
    section.appendChild(div);
    const i = document.createElement("i");
    i.setAttribute("class", "fa-regular fa-pen-to-square");
    div.appendChild(i);
    const h2 = document.createElement("h2");
    h2.innerText = "Mode édition";
    div.appendChild(h2);
    const button = document.createElement("button");
    button.innerText = "publier les changements";
    div.appendChild(button);

    const login = document.querySelector("#log");
    login.innerText = "logout";
    login.addEventListener("click", function(){
        localStorage.removeItem("mon_token")
    });

    const portfolio = document.querySelector("#portfolio");
    const filter = document.querySelector("#filter");
    const addProjects = document.createElement("div");
    addProjects.setAttribute("id", "add-projects");
    portfolio.insertBefore(addProjects, filter);
    const i_clone = document.createElement("i");
    i_clone.setAttribute("class", "fa-regular fa-pen-to-square");
    addProjects.appendChild(i_clone);
    const p = document.createElement("p");
    p.innerText = "modifier";
    addProjects.appendChild(p);

};

if (localStorage.getItem("mon_token")) {
    editHomepage()
}

/* - */