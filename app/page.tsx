import Link from "next/link";
import React from 'react';
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold   mb-8">Bienvenue sur ma Calculatrice</h1>
      <Link 
        href="/calculatrice" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Accéder à la Calculatrice
      </Link>
    </div>
  );
}
