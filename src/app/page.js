"use client"

import { useState } from 'react';

export default function Home() {
  // Déclaration des états pour les champs du formulaire et le résultat
  const [distance, setDistance] = useState('');
  const [autonomie, setAutonomie] = useState('');
  const [consommation, setConsommation] = useState('');
  const [puissance, setPuissance] = useState('');
  const [marge, setMarge] = useState('');
  const [resultat, setResultat] = useState(null);

  // Fonction qui se déclenche à la soumission du formulaire
  const calculerCharge = (e) => {
    e.preventDefault();

    // Convertir les valeurs saisies en nombres décimaux
    const distanceVal = parseFloat(distance);
    const autonomieVal = parseFloat(autonomie);
    const consommationVal = parseFloat(consommation);
    const puissanceVal = parseFloat(puissance);
    const margeVal = parseFloat(marge) / 100; // conversion du pourcentage en facteur

    // Calcul de la distance à parcourir avec la marge de sécurité
    const distanceAvecMarge = distanceVal * (1 + margeVal);
    // Énergie requise pour parcourir la distance (en kWh)
    const energieRequise = (distanceAvecMarge * consommationVal) / 100;
    
    // Calcul de l'énergie actuellement disponible dans la batterie
    const energieDisponible = (autonomieVal * consommationVal) / 100;
    
    // Si l'énergie disponible est déjà suffisante, on affiche un message adapté
    if (energieDisponible >= energieRequise) {
       setResultat("Votre batterie est déjà suffisante pour le trajet.");
       return;
    }
    
    // Calcul de l'énergie à ajouter
    const energieAAjouter = energieRequise - energieDisponible;
    
    // Calcul du temps de charge (en heures)
    const tempsChargeHeures = energieAAjouter / puissanceVal;
    // Extraction des heures entières et conversion des minutes
    const heures = Math.floor(tempsChargeHeures);
    const minutes = Math.round((tempsChargeHeures - heures) * 60);
    
    setResultat(`Temps de charge nécessaire : ${heures} heures et ${minutes} minutes.`);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        Calculateur de Temps de Charge pour Voiture Électrique
      </h1>
      <form onSubmit={calculerCharge}>
        <div className="mb-4">
          <label className="block">
            Distance du trajet (km) :
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="ml-4 border rounded p-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Autonomie actuelle (km) :
            <input
              type="number"
              value={autonomie}
              onChange={(e) => setAutonomie(e.target.value)}
              className="ml-4 border rounded p-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Consommation (kWh/100 km) :
            <input
              type="number"
              value={consommation}
              onChange={(e) => setConsommation(e.target.value)}
              className="ml-4 border rounded p-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Puissance du chargeur (kW) :
            <input
              type="number"
              value={puissance}
              onChange={(e) => setPuissance(e.target.value)}
              className="ml-4 border rounded p-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Marge de sécurité (%) :
            <input
              type="number"
              value={marge}
              onChange={(e) => setMarge(e.target.value)}
              className="ml-4 border rounded p-1"
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Calculer
        </button>
      </form>
      {resultat && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Résultat :</h2>
          <p>{resultat}</p>
        </div>
      )}
    </div>
  );
}