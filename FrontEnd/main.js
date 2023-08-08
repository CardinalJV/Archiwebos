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
};

let response = await fetch("http://localhost:5678/api/works");
let works = await response.json();

const categories = await fetch("http://localhost:5678/api/categories");
const workCategories = await categories.json();
console.log(workCategories);

/* - */

/* Génération des travaux et des boutons de filtres sur la page d'accueil */

const filter = document.querySelector("#filter");
let filterButtons = [];
for (let element of works) {
    genererElement(element);
    if (!document.getElementById("filterbtn1") && element.category.name) {
        const filterBtn1 = document.createElement("button");
        filterBtn1.innerText = "Tous";
        filterBtn1.setAttribute("value", "Tous");
        filterBtn1.setAttribute("id", "filterbtn1");
        filter.appendChild(filterBtn1);
        filterButtons.push(filterBtn1)
    } else {
        console.log("Bouton Tous déja crée")
    };
    switch (element.category.name) {
        case "Objets":
            if (!document.getElementById("filterbtn2")) {
                const filterBtn2 = document.createElement("button");
                filterBtn2.innerText = "Objets";
                filterBtn2.setAttribute("value", "Objets");
                filterBtn2.setAttribute("id", "filterbtn2");
                filter.appendChild(filterBtn2);
                filterButtons.push(filterBtn2)
            } else {
                console.log("Catégorie déja crées")
            };
            break;
        case "Appartements":
            if (!document.getElementById("filterbtn3")) {
                const filterBtn3 = document.createElement("button");
                filterBtn3.innerText = "Appartements";
                filterBtn3.setAttribute("value", "Appartements");
                filterBtn3.setAttribute("id", "filterbtn3");
                filter.appendChild(filterBtn3);
                filterButtons.push(filterBtn3)
            } else {
                console.log("Catégorie déja crées")
            };
            break;
        case "Hotels & restaurants":
            if (!document.getElementById("filterbtn4")) {
                const filterBtn4 = document.createElement("button");
                filterBtn4.innerText = "Hôtels & restaurants";
                filterBtn4.setAttribute("value", "Hotels & restaurants");
                filterBtn4.setAttribute("id", "filterbtn4");
                filter.appendChild(filterBtn4);
                filterButtons.push(filterBtn4)
            } else {
                console.log("Catégorie déja crées")
            };
            break;
        default:
            console.log("Catégories indisponible")
    }
};

/* - */

/* Implémentation des fonctions de filtres sur les boutons correspondants */

for (let button of filterButtons) {
    button.addEventListener("click", function () {
        for (let button of filterButtons) {
            button.style.backgroundColor = "white";
            button.style.color = "#1D6154";
        };
        button.style.backgroundColor = "#1D6154";
        button.style.color = "white";

        if (button === document.getElementById("filterbtn1")) {
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

const token = localStorage.getItem("mon_token");
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
    button.addEventListener("click", function () {
        localStorage.removeItem("mon_token");
        window.location.reload()
    });
    div.appendChild(button);

    const login = document.querySelector("#log");
    login.innerText = "logout";
    login.addEventListener("click", function () {
        localStorage.removeItem("mon_token")
    });

    const portfolio = document.querySelector("#portfolio");
    const addProjects = document.createElement("div");
    addProjects.setAttribute("id", "add-projects");
    portfolio.insertBefore(addProjects, filter);
    const i_clone = document.createElement("i");
    i_clone.setAttribute("class", "fa-regular fa-pen-to-square");
    addProjects.appendChild(i_clone);
    const p = document.createElement("p");
    p.setAttribute("id", "modifier");
    p.innerText = "modifier";
    addProjects.appendChild(p);
};

if (token) {
    editHomepage()
};

/* - */

/* Modal */

//Ouverture de la modal
const modalContent_articles = document.createElement("div");
document.querySelector("#modifier").addEventListener("click", function () {

    if (!document.querySelector("#modal")) {

        const modal = document.createElement("div");
        modal.setAttribute("id", "modal");
        document.querySelector("#portfolio").appendChild(modal);

        const modalContent = document.createElement("div");
        modalContent.setAttribute("id", "modal-content");
        modal.appendChild(modalContent);

        const modalContent_span = document.createElement("span");
        modalContent.appendChild(modalContent_span);

        const modalContent_span_i = document.createElement("i");
        modalContent_span_i.setAttribute("class", "fa-solid fa-xmark");
        modalContent_span.appendChild(modalContent_span_i);

        const modalContent_h2 = document.createElement("h2");
        modalContent_h2.innerText = "Galerie photo";
        modalContent.appendChild(modalContent_h2);

        modalContent_articles.setAttribute("id", "modal-content-articles");
        modalContent.appendChild(modalContent_articles);

        const modalContent_addButton = document.createElement("button");
        modalContent_addButton.setAttribute("id", "add-btn");
        modalContent_addButton.innerText = "Ajouter une photo";
        modalContent.appendChild(modalContent_addButton);

        const modalContent_delete = document.createElement("button");
        modalContent_delete.setAttribute("id", "delete");
        modalContent_delete.innerText = "Supprimer la galerie";
        modalContent.appendChild(modalContent_delete);
    } else {
        document.querySelector("#modal").style.display = "flex";
        document.querySelector("#modal-content").style.display = "flex"
    };
    //Ajout des travaux dans la modal
    function addWorksInModal(element) {

        const figure = document.createElement("figure");
        figure.setAttribute("class", "display-modal");
        modalContent_articles.appendChild(figure);

        const imageElement = document.createElement("img");
        imageElement.src = element.imageUrl;
        figure.appendChild(imageElement);

        const removeItem = document.createElement("i");
        removeItem.setAttribute("class", "fa-solid fa-trash-can");
        removeItem.setAttribute("id", element.id);
        figure.appendChild(removeItem);
        //Fonction de suppression des travaux
        removeItem.addEventListener("click", function () {
            async function deleteWorks() {
                const promise = await fetch(`http://localhost:5678/api/works/${removeItem.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': 'bearer ' + token
                    }
                });
                if (promise.ok === true) {
                    alert(`L'article a l'id ${removeItem.id} a été supprimer avec succès.`);
                    response = await fetch("http://localhost:5678/api/works");
                    works = await response.json();
                    document.querySelector(".gallery").innerHTML = "";
                    document.querySelector("#modal-content-articles").innerHTML = "";
                    for (let element of works) {
                        genererElement(element);
                        addWorksInModal(element)
                    }
                } else {
                    console.log(promise.status);
                    alert("Impossible de supprimer l'élément");
                    throw new Error("Impossible de supprimer l'article.")
                }
            };
            for (let element of works) {
                if (removeItem.id == element.id) {
                    deleteWorks()
                }
            }
        }
        );

        const titleElement = document.createElement("h3");
        titleElement.innerText = "éditer";
        figure.appendChild(titleElement);

    };
    for (let element of works) {
        addWorksInModal(element);
    };
    //Ouverture de la modal d'ajout de travaux
    document.querySelector("#add-btn").addEventListener("click", function () {

        document.querySelector("#modal-content").style.display = "none";

        if (!document.querySelector("#modal-add")) {
            const modalAdd = document.createElement("div");
            modalAdd.setAttribute("id", "modal-add");
            document.querySelector("#modal").appendChild(modalAdd);

            const modalAdd_span = document.createElement("span");
            modalAdd.appendChild(modalAdd_span);

            const modalAdd_span_i = document.createElement("i");
            modalAdd_span_i.setAttribute("class", "fa-solid fa-arrow-left-long");
            modalAdd_span.appendChild(modalAdd_span_i);
            modalAdd_span_i.addEventListener("click", function () {
                document.querySelector("#modal-content").style.display = "flex";
                document.querySelector("#modal-add").style.display = "none"
            });

            const modalAdd_span_i_2 = document.createElement("i");
            modalAdd_span_i_2.setAttribute("class", "fa-solid fa-xmark");
            modalAdd_span.appendChild(modalAdd_span_i_2);
            modalAdd_span_i_2.addEventListener("click", function () {
                document.querySelector("#modal").style.display = "none";
                modalContent_articles.innerHTML = "",
                    document.querySelector("#modal-add").style.display = "none"
            });

            const modalAdd_h2 = document.createElement("h2");
            modalAdd_h2.innerText = "Ajout photo";
            modalAdd.appendChild(modalAdd_h2);

            const modalAdd_form = document.createElement("form");
            modalAdd_form.setAttribute("id", "form");
            modalAdd.appendChild(modalAdd_form);

            const imgConteneur = document.createElement("div");
            imgConteneur.setAttribute("id", "img-conteneur");
            modalAdd_form.appendChild(imgConteneur);

            const iconImage = document.createElement("div");
            iconImage.setAttribute("id", "icon-image");
            imgConteneur.appendChild(iconImage);

            const iconImage_i = document.createElement("i");
            iconImage_i.setAttribute("class", "fa-regular fa-image");
            iconImage.appendChild(iconImage_i);

            const img = document.createElement("img");
            img.setAttribute("id", "img");
            imgConteneur.appendChild(img);

            const inputFile = document.createElement("input");
            inputFile.setAttribute("type", "file");
            inputFile.setAttribute("accept", "image/png, image/gif, image/jpeg");
            inputFile.setAttribute("id", "input-img");
            imgConteneur.appendChild(inputFile);
            //Prévisualisations de l'image
            img.style.display = "none";
            inputFile.addEventListener("change", function () {
                //Changement d'image
                labelImg.removeAttribute("id", "label-img");
                labelImg.setAttribute("id", "img-switch");
                labelImg.innerHTML = "";

                console.log(this.files);
                const fichier = this.files[0];

                if (fichier) {

                    console.log(fichier);
                    const analyseur = new FileReader();

                    document.querySelector("#icon-image").style.display = "none";
                    document.querySelector("#span-img").style.display = "none";
                    document.querySelector("#img").style.display = "block";

                    analyseur.readAsDataURL(fichier);
                    analyseur.addEventListener("load", function () {
                        document.querySelector("#img").setAttribute("src", this.result)
                    })
                }

            });

            const labelImg = document.createElement("label");
            labelImg.setAttribute("for", "input-img");
            labelImg.setAttribute("id", "label-img");
            labelImg.innerText = "Ajouter une photo";
            imgConteneur.appendChild(labelImg);

            const labelImg_i = document.createElement("i");
            labelImg_i.setAttribute("class", "fa-solid fa-plus");
            labelImg.appendChild(labelImg_i);

            const imgConteneur_span = document.createElement("span");
            imgConteneur_span.setAttribute("id", "span-img");
            imgConteneur_span.innerText = "jpeg, png : 4mo max";
            imgConteneur.appendChild(imgConteneur_span);

            const inputConteneur = document.createElement("div");
            inputConteneur.setAttribute("class", "contain");
            form.appendChild(inputConteneur);

            const inputConteneur_label = document.createElement("label");
            inputConteneur_label.setAttribute("for", "input-title");
            inputConteneur_label.innerText = "Titre";
            inputConteneur.appendChild(inputConteneur_label);

            const inputConteneur_div = document.createElement("div");
            inputConteneur.appendChild(inputConteneur_div);

            const inputConteneur_div_input = document.createElement("input");
            inputConteneur_div_input.setAttribute("type", "text");
            inputConteneur_div_input.setAttribute("name", "title");
            inputConteneur_div_input.setAttribute("id", "input-title");
            inputConteneur_div.appendChild(inputConteneur_div_input);

            const inputConteneur2 = document.createElement("div");
            inputConteneur2.setAttribute("class", "contain");
            form.appendChild(inputConteneur2);

            const inputConteneur2_label = document.createElement("label");
            inputConteneur2_label.setAttribute("for", "category");
            inputConteneur2_label.innerText = "Catégories";
            inputConteneur2.appendChild(inputConteneur2_label);

            const inputConteneur2_div = document.createElement("div");
            inputConteneur2.appendChild(inputConteneur2_div);

            const select = document.createElement("select");
            select.setAttribute("name", "category");
            select.setAttribute("id", "list-category");
            inputConteneur2_div.appendChild(select);

            const select_opt1 = document.createElement("option");
            select_opt1.setAttribute("value", "default");
            select_opt1.setAttribute("selected", "");
            select_opt1.innerText = "";
            select.appendChild(select_opt1);

            for (let category of workCategories) {
                const select_option = document.createElement("option");
                select_option.setAttribute("value", category.id);
                select_option.setAttribute("name", category.name);
                select_option.innerText = category.name;
                select.appendChild(select_option)
            };

            const inputConteneur2_div_span = document.createElement("span");
            inputConteneur2_div.appendChild(inputConteneur2_div_span);

            const span_i = document.createElement("i");
            span_i.setAttribute("class", "fa-solid fa-angle-down");
            inputConteneur2_div_span.appendChild(span_i);

            const form_div_button = document.createElement("div");
            form.appendChild(form_div_button);

            const form_button = document.createElement("button");
            form_button.setAttribute("type", "submit");
            form_button.setAttribute("id", "form-submit");
            form_button.innerText = "Valider";
            form_div_button.appendChild(form_button);
            //Ajout de nouveaux travaux
            modalAdd_form.addEventListener("submit", function (event) {

                event.preventDefault();

                const formData = new FormData();
                formData.append("title", inputConteneur_div_input.value);
                formData.append("image", inputFile.files[0]);
                formData.append("category", select.value);

                for (const value of formData.values()) {
                    console.log(value);
                };

                async function addWorks() {
                    const promise = await fetch("http://localhost:5678/api/works", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'bearer ' + token
                        },
                        body: formData
                    });
                    if (promise.ok) {
                        response = await fetch("http://localhost:5678/api/works");
                        works = await response.json();
                        document.querySelector(".gallery").innerHTML = "";
                        document.querySelector("#modal-content-articles").innerHTML = "";
                        for (let element of works) {
                            genererElement(element);
                            addWorksInModal(element)
                        }
                    } else {
                        console.log(promise.status);
                        alert("Impossible d'ajouter un nouvel élément");
                        throw new Error("Erreur dans la soumission du formulaire")
                    }
                };
                addWorks();
                document.querySelector("#form").reset()
            })
        } else {
            document.querySelector("#modal-add").style.display = "flex"
        }
    });
    //Fermeture des modals
    document.querySelector(".fa-xmark").addEventListener("click", function () {
        document.querySelector("#modal").style.display = "none";
        modalContent_articles.innerHTML = "";
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            document.querySelector("#modal").style.display = "none";
            modalContent_articles.innerHTML = "";
            document.querySelector("#modal-add").style.display = "none"
        }
    };
});

/* - */

