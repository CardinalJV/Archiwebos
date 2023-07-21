/* Ajout de la fonction submit du formulaire */

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    
    event.preventDefault();
    let emailValue = document.querySelector("#mail").value;
    let passwordValue = document.querySelector("#password").value;

    async function fetchUser() {
        const promise = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    });

    if (promise.ok === true) {
        const response = await promise.json();
        const token = response.token;
        localStorage.setItem("mon_token", token);
        window.location.href = "../index.html"
    } else {
        alert("Erreur dans l'identifiant ou le mot de passe");
        throw new Error("Erreur dans l’identifiant ou le mot de passe")
    }};

    fetchUser();

});

/* - */