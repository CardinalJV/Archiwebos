
const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let emailValue = document.querySelector("#mail").value;
    let passwordValue = document.querySelector("#password").value;
    
    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    }).then(r => {
        if (r.ok) {
            //window.location.href = "./index.html";
            r.json()
        } else {
            throw new Error("Erreur dans l’identifiant ou le mot de passe")
        }
    }) .then(data => {
        const token = data.token;
        localStorage.setItem("mon_token", token)
    })
});
