"use client";

import React from "react";

export default function UsuariosPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12">
      
      {/* ================= ENCABEZADO PRINCIPAL ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Usuarios</h1>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
              Administrador
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Administra los usuarios del sistema, roles, permisos y carga de trabajo.
          </p>
        </div>
      </div>

      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 text-xs">
        <div className="flex flex-wrap gap-1 -mb-px">
          <button className="border-b-2 border-[#6A1B29] text-[#6A1B29] font-bold px-4 py-3.5 transition-all">
            Lista de usuarios
          </button>
        </div>
        
        
      </div>

      {/* ================= CARDS DE INDICADORES (KPIs) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total de usuarios</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">28</span>
              <span className="text-[10px] text-slate-500 font-medium">100% del total</span>
            </div>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
        </div>

        {/* Activos */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Usuarios activos</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">24</span>
              <span className="text-[10px] text-green-600 font-bold">85.7% del total</span>
            </div>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-xl border border-green-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

        {/* Ausentes */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Usuarios ausentes</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">2</span>
              <span className="text-[10px] text-amber-600 font-bold">7.1% del total</span>
            </div>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

        {/* Inactivos */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Usuarios inactivos</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800">2</span>
              <span className="text-[10px] text-rose-600 font-bold">7.1% del total</span>
            </div>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      {/* ================= CONTENIDO DISTRIBUIDO (COLUMNAS MAIN + SIDEBAR) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SECCIÓN IZQUIERDA: FILTROS Y TABLA PRINCIPAL (OCUPA 3 COLUMNAS) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Bloque de filtros */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Select Rol */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Rol</label>
                <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 min-w-[120px] focus:outline-none">
                  <option>Todos</option>
                  <option>Operador</option>
                  <option>Supervisor</option>
                  <option>Administrador</option>
                </select>
              </div>

              {/* Select Estado */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Estado</label>
                <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 min-w-[120px] focus:outline-none">
                  <option>Todos</option>
                  <option>Activo</option>
                  <option>Ausente</option>
                  <option>Inactivo</option>
                </select>
              </div>

              {/* Select Área */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Área</label>
                <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 min-w-[150px] focus:outline-none">
                  <option>Todos</option>
                  <option>Soporte Técnico</option>
                  <option>Supervisión</option>
                  <option>Administración</option>
                </select>
              </div>
            </div>

            {/* Buscador de usuario integrado */}
            <div className="flex items-end gap-2 w-full sm:w-auto pt-4 sm:pt-0">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Buscar usuario..."
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-slate-400 transition-colors"
                />
                <svg className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="bg-[#6A1B29] hover:bg-[#54141F] text-white font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-sm">
                Filtrar
              </button>
            </div>
          </div>

          {/* TABLA DE USUARIOS */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#6A1B29] text-white font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4 w-10 text-center"><input type="checkbox" className="rounded" /></th>
                    <th className="p-4">Usuario</th>
                    <th className="p-4">Rol</th>
                    <th className="p-4">Área</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4 text-center">Act. Activas</th>
                    <th className="p-4 text-center">Act. Finalizadas</th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {/* Fila 1 */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-center"><input type="checkbox" className="rounded" /></td>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">JP</div>
                      <div>
                        <span className="block font-bold text-slate-800">Juan Pérez</span>
                        <span className="text-[10px] text-slate-400 block">juan.perez@usicamm.gob.mx</span>
                      </div>
                    </td>
                    <td className="p-4"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-bold text-[10px]">Operador</span></td>
                    <td className="p-4 text-slate-500">Soporte Técnico</td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold text-[10px] border border-green-100"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Activo</span></td>
                    <td className="p-4 text-center font-bold text-slate-800">12</td>
                    <td className="p-4 text-center font-bold text-slate-400">85</td>
                    
                  </tr>

                  {/* Fila 2 */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-center"><input type="checkbox" className="rounded" /></td>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">ML</div>
                      <div>
                        <span className="block font-bold text-slate-800">María López</span>
                        <span className="text-[10px] text-slate-400 block">maria.lopez@usicamm.gob.mx</span>
                      </div>
                    </td>
                    <td className="p-4"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-bold text-[10px]">Operador</span></td>
                    <td className="p-4 text-slate-500">Soporte Técnico</td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold text-[10px] border border-green-100"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Activo</span></td>
                    <td className="p-4 text-center font-bold text-slate-800">9</td>
                    <td className="p-4 text-center font-bold text-slate-400">76</td>
                    
                  </tr>

                  {/* Fila 3 - Ausente */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-center"><input type="checkbox" className="rounded" /></td>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">SG</div>
                      <div>
                        <span className="block font-bold text-slate-800">Sofía Gómez</span>
                        <span className="text-[10px] text-slate-400 block">sofia.gomez@usicamm.gob.mx</span>
                      </div>
                    </td>
                    <td className="p-4"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-bold text-[10px]">Operador</span></td>
                    <td className="p-4 text-slate-500">Soporte Técnico</td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold text-[10px] border border-amber-100"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Ausente</span></td>
                    <td className="p-4 text-center font-bold text-slate-800">0</td>
                    <td className="p-4 text-center font-bold text-slate-400">38</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
              <span>Mostrando 1 a 3 de 28 usuarios</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 font-bold shadow-sm cursor-pointer">1</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-slate-500 font-medium cursor-pointer">2</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-slate-500 font-medium cursor-pointer">3</button>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECCIÓN DERECHA: SIDEBAR (OCUPA 1 COLUMNA) ================= */}
        <div className="space-y-6">
          
          {/* Carga de trabajo */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Carga por operador</h2>
              <button className="text-[10px] font-bold text-[#6A1B29] hover:underline cursor-pointer">Ver detalle</button>
            </div>
            <div className="space-y-3">
              {/* Operador 1 */}
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Juan Pérez</span>
                  <span className="font-bold text-slate-800">90%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: "90%" }} />
                </div>
              </div>
              {/* Operador 2 */}
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between font-medium text-slate-600">
                  <span>María López</span>
                  <span className="font-bold text-slate-800">68%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "68%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Usuarios ausentes */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Usuarios ausentes</h2>
              <button className="text-[10px] font-bold text-[#6A1B29] hover:underline cursor-pointer">Ver todos</button>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between p-2 bg-amber-50/50 rounded-lg border border-amber-100/50">
                <span className="font-bold text-slate-700">Sofía Gómez</span>
                <span className="text-[10px] text-amber-700 font-medium">Desde 10/06</span>
              </div>
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
}