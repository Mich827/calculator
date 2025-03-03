'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Calculatrice() {
  const [affichage, setAffichage] = useState('0');
  const [operation, setOperation] = useState('');
  const [premierNombre, setPremierNombre] = useState<number | null>(null);
  const [nouveauNombre, setNouveauNombre] = useState(true);
  const [modeScientifique, setModeScientifique] = useState(false);

  const ajouterChiffre = (chiffre: string) => {
    if (nouveauNombre) {
      setAffichage(chiffre);
      setNouveauNombre(false);
    } else {
      setAffichage(affichage + chiffre);
    }
  };

  const effectuerOperation = (op: string) => {
    if (premierNombre === null) {
      setPremierNombre(parseFloat(affichage));
    } else {
      const resultat = calculer();
      setPremierNombre(resultat);
      setAffichage(resultat.toString());
    }
    setOperation(op);
    setNouveauNombre(true);
  };

  const calculer = () => {
    if (premierNombre === null || !operation) return parseFloat(affichage);
    
    const deuxiemeNombre = parseFloat(affichage);
    let resultat = 0;

    switch (operation) {
      case '+':
        resultat = premierNombre + deuxiemeNombre;
        break;
      case '-':
        resultat = premierNombre - deuxiemeNombre;
        break;
      case '*':
        resultat = premierNombre * deuxiemeNombre;
        break;
      case '/':
        resultat = premierNombre / deuxiemeNombre;
        break;
      case 'pow':
        resultat = Math.pow(premierNombre, deuxiemeNombre);
        break;
      default:
        return deuxiemeNombre;
    }

    setPremierNombre(null);
    setOperation('');
    setNouveauNombre(true);
    return resultat;
  };

  const egale = () => {
    const resultat = calculer();
    setAffichage(resultat.toString());
  };

  const reinitialiser = () => {
    setAffichage('0');
    setPremierNombre(null);
    setOperation('');
    setNouveauNombre(true);
  };

  const fonctionScientifique = (fonction: string) => {
    const nombre = parseFloat(affichage);
    let resultat: number | string = 0;

    switch (fonction) {
      case 'sin':
        resultat = Math.sin(nombre);
        break;
      case 'cos':
        resultat = Math.cos(nombre);
        break;
      case 'tan':
        resultat = Math.tan(nombre);
        break;
      case 'sqrt':
        resultat = Math.sqrt(nombre);
        break;
      case 'log':
        resultat = Math.log10(nombre);
        break;
      case 'ln':
        resultat = Math.log(nombre);
        break;
      case 'bin':
        resultat = Math.floor(nombre).toString(2);
        break;
    }

    setAffichage(resultat.toString());
    setNouveauNombre(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {modeScientifique ? 'Calculatrice Scientifique' : 'Calculatrice Simple'}
          </h2>
          <button
            onClick={() => setModeScientifique(!modeScientifique)}
            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
          >
            {modeScientifique ? 'Mode Simple' : 'Mode Scientifique'}
          </button>
        </div>
        <div className="mb-4">
          <div className="bg-gray-200 p-4 rounded text-right text-2xl mb-2 text-gray-800 font-bold">
            {affichage}
          </div>
          {modeScientifique && (
            <div className="grid grid-cols-3 gap-2 mb-2">
              {['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'bin'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => fonctionScientifique(btn)}
                  className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 text-sm font-semibold"
                >
                  {btn === 'bin' ? 'BIN' : btn}
                </button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9', '/'].map((btn) => (
              <button
                key={btn}
                onClick={() => btn === '/' ? effectuerOperation(btn) : ajouterChiffre(btn)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xl font-semibold"
              >
                {btn}
              </button>
            ))}
            {['4', '5', '6', '*'].map((btn) => (
              <button
                key={btn}
                onClick={() => btn === '*' ? effectuerOperation(btn) : ajouterChiffre(btn)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xl font-semibold"
              >
                {btn}
              </button>
            ))}
            {['1', '2', '3', '-'].map((btn) => (
              <button
                key={btn}
                onClick={() => btn === '-' ? effectuerOperation(btn) : ajouterChiffre(btn)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xl font-semibold"
              >
                {btn}
              </button>
            ))}
            {['0', '.', '=', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === '=') egale();
                  else if (btn === '+') effectuerOperation(btn);
                  else ajouterChiffre(btn);
                }}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xl font-semibold"
              >
                {btn}
              </button>
            ))}
            <button
              onClick={reinitialiser}
              className="col-span-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 text-xl font-semibold"
            >
              C
            </button>
          </div>
        </div>
        <Link
          href="/"
          className="block text-center bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mt-4"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
} 