/* global google DATA_TACHES creationCard */
"use strict";

// Charger Google Charts et initialiser l'application
google.charts.load("current", { packages: ["gantt"] });
google.charts.setOnLoadCallback(initialisation);

/**
 * Fonction d'initialisation
 * Appelle les fonctions pour charger et afficher les données
 */
function initialisation() {
    ChargerEtAfficherDiagrammeEtCards();
}

/**
 * Charge les données dans le diagramme de Gantt et affiche les cartes
 */
function ChargerEtAfficherDiagrammeEtCards() {
    const dataTable = CreationDonnesGraphique(DATA_TACHES);
    const chart = new google.visualization.Gantt(document.getElementById("chart_div"));
    chart.draw(dataTable);

    afficherCardsTaches(DATA_TACHES.detailsTache);
}

/**
 * Crée un DataTable pour Google Charts à partir des données
 * @param {Object} data - Les données des tâches
 * @returns {Object} Le DataTable prêt à être utilisé par Google Charts
 */
function CreationDonnesGraphique(data) {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn("string", "ID");
    dataTable.addColumn("string", "Nom de la tâche");
    dataTable.addColumn("date", "Date de début");
    dataTable.addColumn("date", "Date de fin");
    dataTable.addColumn("number", "Durée");
    dataTable.addColumn("number", "% complétée");
    dataTable.addColumn("string", "Dépendances");

    for (let i = 0; i < data.detailsTache.length; i++) {
        const tache = data.detailsTache[i]; 
    
        let dependances = null; 
        if (tache.dependances) {
            dependances = tache.dependances.join(","); 
        }
    
        dataTable.addRow([
            tache.id,                     
            tache.titre,                  
            tache.dateDebut,               
            tache.dateFin,                 
            tache.dureeEnNbJours,         
            tache.pctComplete,             
            dependances                    
        ]);
    }
    
    

    return dataTable;
}

/**
 * Affiche les cartes des tâches dans le conteneur prévu
 * @param {Array} taches - Les tâches à afficher
 */
function afficherCardsTaches(taches) {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; 

    for (let i = 0; i < taches.length; i++) {
        const tache = taches[i]; 
        creationCard(
            null,
            `${tache.id} - ${tache.titre}`,
            `
                <dt>Date de début :</dt><dd>${tache.dateDebut.toDateString()}</dd>
                <dt>Date de fin :</dt><dd>${tache.dateFin.toDateString()}</dd>
                <dt>Durée :</dt><dd>${tache.dureeEnNbJours} jours</dd>
                <dt>% Complétée :</dt><dd>${tache.pctComplete}%</dd>
                <dt>Dépendances :</dt><dd>${tache.dependances ? tache.dependances.join(", ") : "Aucune"}</dd>
            `,
            true,
            `<button data-id="${tache.id}" class="btn btn-danger">Supprimer</button>`
        );
    }
}

