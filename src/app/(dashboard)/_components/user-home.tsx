import React from "react";

function UserHomePage() {
  return (
    <div className="bg-white flex flex-col items-center justify-center pt-32">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Bienvenido al Sistema de Gestión de Inventario
      </h1>
      <p className="text-lg text-center mb-8 text-black">
        Este sistema le permite acceder a dos secciones principales:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-red-600 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-white mb-2">Inventario</h2>
          <p className="text-white mb-4">
            Visualice el inventario disponible actualmente.
          </p>
        </div>
        <div className="bg-red-600 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-white mb-2">Asignaciones</h2>
          <p className="text-white mb-4">
            Acceda a sus asignaciones históricas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
