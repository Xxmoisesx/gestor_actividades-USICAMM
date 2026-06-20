import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma"; 
import { createActivity } from "@/app/actions/activities";

export default async function CrearActividadPage() {
  // 1. Obtenemos los operadores directamente de la base de datos
  const operadores = await prisma.user.findMany({
    where: { rol: "OPERADOR" }, 
    select: { id: true, nombre: true } 
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Crear actividad</h1>
      </div>

      {/* 2. CORREGIDO: Conectamos la Server Action directamente sin envolverla */}
      <form 
        action={createActivity} 
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6"
      >         
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* ================= COLUMNA IZQUIERDA ================= */}
          <div className="space-y-6">
            
            {/* CAMPO: TÍTULO */}
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

            {/* CAMPO: DESCRIPCIÓN */}
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

            {/* CAMPO: PRIORIDAD */}
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* ================= COLUMNA DERECHA ================= */}
          <div className="space-y-6">
            
            {/* CAMPO DINÁMICO: ASIGNAR A */}
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
                  {operadores.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.nombre}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* CAMPO: FECHA LÍMITE */}
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

        {/* ================= BOTONES DE ACCIÓN ================= */}
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