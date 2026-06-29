import React from "react";
import Link from "next/link";
import { createActivity } from "@/app/actions/activities";

export default async function CrearActividadPage() {
  // 1. Obtenemos los operadores desde el Backend
  // Asegúrate de que tu backend tenga el endpoint GET /api/users
  let operadores = [];
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/users`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      operadores = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Crear actividad</h1>
      </div>

      <form 
        action={createActivity} 
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6"
      >        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* ================= COLUMNA IZQUIERDA ================= */}
          <div className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Título</label>
              <input
                type="text"
                name="titulo"
                placeholder="Ingresa el título de la actividad"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Descripción</label>
              <textarea
                name="descripcion"
                placeholder="Describe la actividad..."
                rows={5}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Prioridad</label>
              <div className="relative">
                <select
                  name="prioridad"
                  defaultValue=""
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled hidden>Selecciona prioridad</option>
                  <option value="CRITICA">🔴 Crítica</option>
                  <option value="ALTA">🟠 Alta</option>
                  <option value="MEDIA">🟡 Media</option>
                  <option value="BAJA">🟢 Baja</option>
                </select>
              </div>
            </div>
          </div>

          {/* ================= COLUMNA DERECHA ================= */}
          <div className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Asignar a</label>
              <div className="relative">
                <select
                  name="asignarA"
                  defaultValue=""
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled hidden>Selecciona un operador</option>
                  {operadores.map((op: any) => (
                    <option key={op.id} value={op.id}>
                      {op.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Fecha límite</label>
              <div className="relative">
                <input
                  type="date"
                  name="fechaLimite"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all cursor-pointer block"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Link
            href="/dashboard/gestion"
            className="px-5 py-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-center"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-white bg-[#6A1B29] hover:bg-[#54141F] rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Guardar actividad
          </button>
        </div>
      </form>
    </div>
  );
}