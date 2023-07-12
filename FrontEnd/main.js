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

let works;

await fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        works = data
    });

/* - */

/* Génération des travaux dans le HTML */

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