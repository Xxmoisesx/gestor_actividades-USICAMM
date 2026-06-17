"use client";

import React from "react";

export default function ConfiguracionPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12">
      
      {/* ================= ENCABEZADO PRINCIPAL ================= */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Configuración</h1>
          <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-100">
            Sistema
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Administra los parámetros globales, tiempos de SLA y catálogos del sistema.
        </p>
      </div>

      {/* ================= CONTENIDO DISTRIBUIDO (MENÚ LATERAL + PANELES DE CONFIGURACIÓN) ================= */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        

        {/* COLUMNA DERECHA: GRILLA DE TARJETAS DE PARÁMETROS */}
        <div className="flex-1 w-full space-y-6">
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* CARD 1: ASIGNACIÓN AUTOMÁTICA */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Asignación automática</h3>
                  <p className="text-[10px] text-slate-400">Define cómo se asignan automáticamente las actividades a los operadores.</p>
                </div>

                <div className="space-y-3.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Asignación equilibrada (menor carga de trabajo)</span>
                    <div className="w-8 h-4.5 bg-[#6A1B29] rounded-full flex items-center justify-end p-0.5 cursor-pointer">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Máximo de actividades por operador</span>
                    <input type="number" defaultValue={20} className="w-16 text-center bg-slate-50 border border-slate-200 rounded p-1 font-bold text-slate-700 text-xs focus:outline-none" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Permitir reasignaciones automáticas</span>
                    <div className="w-8 h-4.5 bg-[#6A1B29] rounded-full flex items-center justify-end p-0.5 cursor-pointer">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Excluir usuarios ausentes</span>
                    <div className="w-8 h-4.5 bg-[#6A1B29] rounded-full flex items-center justify-end p-0.5 cursor-pointer">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Considerar área del ticket para asignación</span>
                    <div className="w-8 h-4.5 bg-slate-200 rounded-full flex items-center justify-start p-0.5 cursor-pointer">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-50">
                <button className="bg-[#6A1B29] hover:bg-[#54141F] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5">
                  💾 Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}