"use client";

import React from "react";

interface ModalDetalleTicketProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalDetalleTicket({ isOpen, onClose }: ModalDetalleTicketProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      
      {/* CONTENEDOR PRINCIPAL DEL MODAL */}
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto flex flex-col">
        
        {/* CUERPO DEL DETALLE */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* BOTÓN VOLVER / CERRAR */}
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Volver
          </button>

          {/* CABECERA: FOLIO + BADGES */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">TK-001</h2>
              <span className="bg-rose-100 text-rose-700 font-bold text-xs px-3 py-1 rounded-md border border-rose-200">
                Alta
              </span>
            </div>
            
            <span className="bg-blue-100 text-blue-700 font-bold text-xs px-4 py-1.5 rounded-lg border border-blue-200">
              En revisión
            </span>
          </div>

          {/* TÍTULO Y DESCRIPCIÓN */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">
              Caída de sistema en proyecto venus
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Se reporta que no tienen acceso para entrar a la plataforma
            </p>
          </div>

          {/* RECUADRO DE METADATOS GRILLA */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] text-slate-500 font-medium">
            <div className="space-y-1">
              <span className="text-slate-400 block font-bold text-[10px] uppercase tracking-wider">👤 Asignado a</span>
              <span className="text-slate-800 font-bold">Alejandra Rosas</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 block font-bold text-[10px] uppercase tracking-wider">📅 Fecha de creación</span>
              <span className="text-slate-800 font-bold">16/05/26 10:30</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 block font-bold text-[10px] uppercase tracking-wider">📅 Fecha límite</span>
              <span className="text-slate-800 font-bold">20/05/26</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 block font-bold text-[10px] uppercase tracking-wider">🩺 Origen</span>
              <span className="text-slate-800 font-bold">Tickets</span>
            </div>
          </div>

          {/* PESTAÑAS INTERNAS DE NAVEGACIÓN */}
          <div className="flex gap-6 border-b border-slate-100 text-sm font-bold">
            <button className="text-slate-400 pb-2 hover:text-slate-600 cursor-pointer">Información</button>
            <button className="text-slate-400 pb-2 hover:text-slate-600 cursor-pointer">Comentarios</button>
            <button className="text-[#6A1B29] pb-2 border-b-2 border-[#6A1B29]">Historial</button>
          </div>

          {/* TARJETAS DE INDICADORES (KPIs) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* KPI 1 */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 border border-amber-100 text-amber-500 rounded-xl flex items-center justify-center font-bold text-xl">🕒</div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tiempo total de resolución</span>
                <span className="text-xl font-black text-slate-800">7h 45m</span>
              </div>
            </div>
            {/* KPI 2 */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 border border-green-100 text-green-500 rounded-xl flex items-center justify-center font-bold text-xl">🔄</div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Número de transferencias</span>
                <span className="text-xl font-black text-slate-800">2</span>
              </div>
            </div>
            {/* KPI 3 */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-500 rounded-xl flex items-center justify-center font-bold text-xl">👤</div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Responsable actual</span>
                <span className="text-base font-black text-slate-800 block leading-tight">Carlos Ramirez</span>
              </div>
            </div>
          </div>

          {/* CONTENEDOR LÍNEA DE TIEMPO */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Línea de tiempo de status</h4>
            
            {/* Scroll horizontal preventivo para pantallas pequeñas */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[850px] relative pt-20 pb-20 px-4">
                
                {/* Línea gris conectora central */}
                <div className="absolute top-[50%] left-4 right-4 h-1 bg-slate-300 -translate-y-1/2 z-0" />
                
                {/* Nodos distribuidos homogéneamente */}
                <div className="relative z-10 flex justify-between items-center w-full">
                  
                  {/* NODO 1: Pendiente (Arriba) */}
                  <div className="flex flex-col items-center w-28 relative">
                    <div className="absolute -top-16 text-center w-32 space-y-0.5">
                      <span className="font-bold text-slate-800 text-[11px] block">Pendiente</span>
                      <span className="text-[9px] text-slate-400 block">16/05/2026 09:00</span>
                      <span className="text-[9px] text-slate-500 block font-medium">Sistema</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm border-2 border-white">✓</div>
                  </div>

                  {/* NODO 2: Asignado (Abajo) */}
                  <div className="flex flex-col items-center w-28 relative">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-blue-500 shadow-xs" />
                    <div className="absolute -bottom-16 text-center w-32 space-y-0.5">
                      <span className="font-bold text-slate-800 text-[11px] block">Asignado</span>
                      <span className="text-[9px] text-slate-400 block">16/05/2026 09:00</span>
                      <span className="text-[9px] text-slate-500 block font-medium">Sistema asignó Juan Perez</span>
                    </div>
                  </div>

                  {/* NODO 3: En proceso (Arriba) */}
                  <div className="flex flex-col items-center w-28 relative">
                    <div className="absolute -top-16 text-center w-32 space-y-0.5">
                      <span className="font-bold text-slate-800 text-[11px] block">En proceso</span>
                      <span className="text-[9px] text-slate-400 block">16/05/2026 09:15</span>
                      <span className="text-[9px] text-slate-500 block font-medium">Juan Perez</span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-blue-500 shadow-xs" />
                  </div>

                  {/* NODO 4: Transferido (Abajo) */}
                  <div className="flex flex-col items-center w-28 relative">
                    <div className="w-4 h-4 bg-white border-2 border-amber-500 rotate-45 shadow-xs" />
                    <div className="absolute -bottom-16 text-center w-34 space-y-0.5">
                      <span className="font-bold text-slate-800 text-[11px] block">Transferido</span>
                      <span className="text-[9px] text-slate-400 block">16/05/2026 11:15</span>
                      <span className="text-[9px] text-slate-500 block font-medium">Juan Perez → Maria Lopez</span>
                    </div>
                  </div>

                  {/* NODO 5: En proceso (Arriba) */}
                  <div className="flex flex-col items-center w-28 relative">
                    <div className="absolute -top-16 text-center w-32 space-y-0.5">
                      <span className="font-bold text-slate-800 text-[11px] block">En proceso</span>
                      <span className="text-[9px] text-slate-400 block">16/05/2026 11:05</span>
                      <span className="text-[9px] text-slate-500 block font-medium">Maria Lopez</span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-blue-500 shadow-xs" />
                  </div>

                  {/* NODO 6: Transferido (Abajo) */}
                  <div className="flex flex-col items-center w-28 relative">
                    <div className="w-4 h-4 bg-white border-2 border-amber-500 rotate-45 shadow-xs" />
                    <div className="absolute -bottom-16 text-center w-34 space-y-0.5">
                      <span className="font-bold text-slate-800 text-[11px] block">Transferido</span>
                      <span className="text-[9px] text-slate-400 block">16/05/2026 15:20</span>
                      <span className="text-[9px] text-slate-500 block font-medium">Maria Lopez → Carlos Ramirez</span>
                    </div>
                  </div>

                  {/* NODO 7: En revisión (Arriba) */}
                  <div className="flex flex-col items-center w-28 relative">
                    <div className="absolute -top-16 text-center w-32 space-y-0.5">
                      <span className="font-bold text-slate-800 text-[11px] block">En revisión</span>
                      <span className="text-[9px] text-slate-400 block">16/05/2026 16:45</span>
                      <span className="text-[9px] text-slate-500 block font-medium">Carlos Ramirez</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm border-2 border-white">✓</div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ACCIÓN INFERIOR / FOOTER */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button className="bg-[#6A1B29] hover:bg-[#54141F] text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer">
            Detalles
          </button>
        </div>

      </div>
    </div>
  );
}