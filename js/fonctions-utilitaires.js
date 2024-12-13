"use strict";

/**
 * Fonction qui crée une carte (card) Bootstrap.
 * @param {String} pImage - L'URL de l'image ou la classe de l'icône.
 * @param {String} pTitre - Le titre de la carte.
 * @param {String} pDescription - La description ou le contenu de la carte.
 * @param {Boolean} pEstAvecBouton - Indique si un bouton doit être ajouté à la carte (par défaut: false).
 * @param {String} pElementHTMLBouton - Le texte ou le HTML à inclure dans le bouton (facultatif).
 */
function creationCard(pImage, pTitre, pDescription, pEstAvecBouton = false, pElementHTMLBouton = "") {
    const sectionCards = document.getElementById("cards-container");
    const divCard = document.createElement("div");
    divCard.className = "card col-lg-4 m-2";

    if (pImage) {
        const imageCard = document.createElement("img");
        imageCard.className = "card-img-top";
        imageCard.src = pImage;
        divCard.appendChild(imageCard);
    }

    const corpsCard = document.createElement("div");
    corpsCard.className = "card-body";

    const titreCard = document.createElement("h5");
    titreCard.className = "card-title";
    titreCard.textContent = pTitre;

    const textCard = document.createElement("p");
    textCard.className = "card-text";
    textCard.innerHTML = pDescription;

    corpsCard.appendChild(titreCard);
    corpsCard.appendChild(textCard);

    if (pEstAvecBouton) {
        const bouton = document.createElement("button");
        bouton.className = "btn btn-primary mt-2";
        bouton.innerHTML = pElementHTMLBouton;
        corpsCard.appendChild(bouton);
    }

    divCard.appendChild(corpsCard);
    sectionCards.appendChild(divCard);
}
