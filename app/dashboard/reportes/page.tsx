"use client";

import React from "react";

export default function ReportesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      
      {/* ================= ENCABEZADO Y FILTROS GLOBALES ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Reportes</h1>
        </div>
        
        {/* Filtros superiores idénticos a tu maqueta */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Rango de fechas */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Rango de fechas</span>
            <div className="relative flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 gap-2 shadow-sm cursor-pointer">
              <span>01/05/2026 - 31/05/2026</span>
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Tipo de reporte */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Tipo de reporte</span>
            <div className="relative">
              <select className="bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-slate-700 shadow-sm appearance-none cursor-pointer focus:outline-none">
                <option>General</option>
                <option>Por Operador</option>
                <option>Por Categoría</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Botón institucional */}
          <div className="pt-5">
            <button className="flex items-center gap-2 bg-[#6A1B29] hover:bg-[#54141F] text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors cursor-pointer">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generar reporte
            </button>
          </div>
        </div>
      </div>

      {/* ================= CUADRÍCULA DE REPORTE (GRID 2x2) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD 1: ACTIVIDADES POR ESTATUS (DONA MOCK) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <h2 className="text-xs font-bold text-slate-700 mb-4 tracking-wide uppercase">Actividades por estatus</h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
            {/* Círculo simulación de Gráfica de Dona */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG circular con segmentos coloreados proporcionales */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                {/* Segmento Verde (Finalizadas 42%) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10B981" strokeWidth="4" strokeDasharray="42 58" strokeDashoffset="0" />
                {/* Segmento Amarillo (Pendientes 31%) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F59E0B" strokeWidth="4" strokeDasharray="31 69" strokeDashoffset="-42" />
                {/* Segmento Azul (En proceso 19%) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3B82F6" strokeWidth="4" strokeDasharray="19 81" strokeDashoffset="-73" />
                {/* Segmento Morado (En revisión 8%) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#A855F7" strokeWidth="4" strokeDasharray="8 92" strokeDashoffset="-92" />
              </svg>
              {/* Texto central */}
              <div className="absolute text-center">
                <span className="text-2xl font-black text-slate-800 block leading-none">200</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
              </div>
            </div>

            {/* Leyendas con porcentajes idénticos a la maqueta */}
            <div className="space-y-2 text-xs w-full sm:w-auto">
              <div className="flex items-center justify-between sm:justify-start gap-8">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="text-slate-600 font-medium">Pendientes</span>
                </div>
                <span className="font-bold text-slate-700">62 (31%)</span>
              </div>
              <div className="flex items-center justify-between sm:justify-start gap-8">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                  <span className="text-slate-600 font-medium">En proceso</span>
                </div>
                <span className="font-bold text-slate-700">38 (19%)</span>
              </div>
              <div className="flex items-center justify-between sm:justify-start gap-8">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#A855F7]" />
                  <span className="text-slate-600 font-medium">En revisión</span>
                </div>
                <span className="font-bold text-slate-700">15 (8%)</span>
              </div>
              <div className="flex items-center justify-between sm:justify-start gap-8">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="text-slate-600 font-medium">Finalizadas</span>
                </div>
                <span className="font-bold text-slate-700">85 (42%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: ACTIVIDADES POR PRIORIDAD (BARRAS VERTICALES MOCK) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <h2 className="text-xs font-bold text-slate-700 mb-4 tracking-wide uppercase">Actividades por prioridad</h2>
          
          {/* Contenedor de barras */}
          <div className="flex items-end justify-around h-44 pt-6 border-b border-slate-100 px-2">
            
            {/* Barra Crítica */}
            <div className="flex flex-col items-center gap-2 w-12 group">
              <span className="text-[11px] font-bold text-slate-600">15</span>
              <div className="w-full bg-[#6A1B29] rounded-t-md transition-all duration-500" style={{ height: "25px" }} />
              <span className="text-[10px] text-slate-500 font-medium pt-1">Crítica</span>
            </div>

            {/* Barra Alta */}
            <div className="flex flex-col items-center gap-2 w-12 group">
              <span className="text-[11px] font-bold text-slate-600">65</span>
              <div className="w-full bg-[#EF4444] rounded-t-md transition-all duration-500" style={{ height: "105px" }} />
              <span className="text-[10px] text-slate-500 font-medium pt-1">Alta</span>
            </div>

            {/* Barra Media */}
            <div className="flex flex-col items-center gap-2 w-12 group">
              <span className="text-[11px] font-bold text-slate-600">50</span>
              <div className="w-full bg-[#F59E0B] rounded-t-md transition-all duration-500" style={{ height: "82px" }} />
              <span className="text-[10px] text-slate-500 font-medium pt-1">Medio</span>
            </div>

            {/* Barra Baja */}
            <div className="flex flex-col items-center gap-2 w-12 group">
              <span className="text-[11px] font-bold text-slate-600">40</span>
              <div className="w-full bg-[#10B981] rounded-t-md transition-all duration-500" style={{ height: "65px" }} />
              <span className="text-[10px] text-slate-500 font-medium pt-1">Baja</span>
            </div>

          </div>
        </div>

        {/* CARD 3: ACTIVIDADES POR USUARIO (BARRAS HORIZONTALES MOCK) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xs font-bold text-slate-700 mb-5 tracking-wide uppercase">Actividades por usuario</h2>
          
          <div className="space-y-4">
            {/* Usuario 1 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>Juan Pérez</span>
                <span className="font-bold text-slate-700">68</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: "85%" }} />
              </div>
            </div>

            {/* Usuario 2 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>María López</span>
                <span className="font-bold text-slate-700 text-xs">55</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: "68%" }} />
              </div>
            </div>

            {/* Usuario 3 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>Carlos Ramírez</span>
                <span className="font-bold text-slate-700">40</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: "50%" }} />
              </div>
            </div>

            {/* Usuario 4 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>Ana Torres</span>
                <span className="font-bold text-slate-700">38</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: "46%" }} />
              </div>
            </div>

            {/* Usuario 5 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>Luis Gómez</span>
                <span className="font-bold text-slate-700">26</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: "32%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: TIEMPOS PROMEDIO DE RESOLUCIÓN (LÍNEA DE TENDENCIA MOCK) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-700 mb-2 tracking-wide uppercase">Tiempos promedio de resolución</h2>
            <p className="text-[10px] text-slate-400 font-medium mb-4">Días promedio por rango de semanas</p>
          </div>

          {/* Simulación del gráfico lineal con un SVG Path limpio */}
          <div className="relative w-full h-32 pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
              {/* Líneas de cuadrícula horizontales de fondo */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="80" x2="400" y2="80" stroke="#F1F5F9" strokeWidth="1" />
              
              {/* Línea de tendencia azul */}
              <path
                d="M 20 60 Q 80 30 140 45 T 260 45 T 380 60"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              
              {/* Nodos de datos individuales (Puntos de la gráfica) */}
              <circle cx="45" cy="53" r="4" fill="#3B82F6" stroke="white" strokeWidth="1.5" />
              <circle cx="145" cy="45" r="4" fill="#3B82F6" stroke="white" strokeWidth="1.5" />
              <circle cx="250" cy="45" r="4" fill="#3B82F6" stroke="white" strokeWidth="1.5" />
              <circle cx="355" cy="55" r="4" fill="#3B82F6" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Eje X con los rangos de fechas */}
          <div className="flex justify-between text-[10px] text-slate-500 font-bold px-2 pt-2 border-t border-slate-50 mt-2">
            <span>1-7 May</span>
            <span>8-14 May</span>
            <span>15-21 May</span>
            <span>22-31 May</span>
          </div>
        </div>

      </div>
    </div>
  );
}