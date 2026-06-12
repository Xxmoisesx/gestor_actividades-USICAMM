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
        
        {/* COLUMNA IZQUIERDA: MENÚ DE NAVEGACIÓN INTERNA */}
        <div className="w-full lg:w-64 bg-white border border-slate-200 rounded-xl p-2 shadow-sm shrink-0 space-y-0.5 text-xs">
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-[#6A1B29] text-white font-bold rounded-lg transition-colors text-left">
            <span>⚙️</span> General
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors text-left">
            <span>🤖</span> Asignación automática
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors text-left">
            <span>🚩</span> Prioridades y estatus
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors text-left">
            <span>🕒</span> Horarios y SLA
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors text-left">
            <span>🔄</span> Motivos de transferencia
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors text-left">
            <span>🔔</span> Notificaciones
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors text-left">
            <span>🏢</span> Áreas
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors text-left">
            <span>🛡️</span> Seguridad
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors text-left">
            <span>🏛️</span> Datos institucionales
          </button>
        </div>

        {/* COLUMNA DERECHA: GRILLA DE TARJETAS DE PARÁMETROS */}
        <div className="flex-1 w-full space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Parámetros generales del sistema</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Configura los parámetros principales que afectan la operación del sistema.</p>
          </div>

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

            {/* CARD 2: CATÁLOGO DE PRIORIDADES */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Catálogo de prioridades</h3>
                    <p className="text-[10px] text-slate-400">Administra los niveles de prioridad del sistema.</p>
                  </div>
                  <button className="text-[10px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-2.5 py-1.5 rounded-lg transition-colors">
                    ➕ Agregar prioridad
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                        <th className="pb-2">Prioridad</th>
                        <th className="pb-2">Color</th>
                        <th className="pb-2">Tiempo máximo (SLA)</th>
                        <th className="pb-2 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                      <tr>
                        <td className="py-2">░ Baja</td>
                        <td className="py-2"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22C55E]" /> #22C55E</span></td>
                        <td className="py-2 text-slate-500">5 días</td>
                        <td className="py-2 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td>
                      </tr>
                      <tr>
                        <td className="py-2">░ Media</td>
                        <td className="py-2"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FACC15]" /> #FACC15</span></td>
                        <td className="py-2 text-slate-500">72 horas</td>
                        <td className="py-2 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td>
                      </tr>
                      <tr>
                        <td className="py-2">░ Alta</td>
                        <td className="py-2"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FB923C]" /> #FB923C</span></td>
                        <td className="py-2 text-slate-500">24 horas</td>
                        <td className="py-2 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td>
                      </tr>
                      <tr>
                        <td className="py-2">░ Crítica</td>
                        <td className="py-2"><span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EF4444]" /> #EF4444</span></td>
                        <td className="py-2 text-slate-500">4 horas</td>
                        <td className="py-2 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 italic">↕ Arrastra para reordenar prioridades</div>
            </div>

            {/* CARD 3: CATÁLOGO DE ESTATUS */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Catálogo de estatus</h3>
                    <p className="text-[10px] text-slate-400">Configura los estados por los que pasa una actividad.</p>
                  </div>
                  <button className="text-[10px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-2.5 py-1.5 rounded-lg transition-colors">
                    ➕ Agregar estatus
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                        <th className="pb-2">Estatus</th>
                        <th className="pb-2">Descripción</th>
                        <th className="pb-2">Color</th>
                        <th className="pb-2 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                      <tr>
                        <td className="py-1.5 font-bold">Pendiente</td>
                        <td className="py-1.5 text-slate-400 max-w-[150px] truncate">Actividad creada y en espera...</td>
                        <td className="py-1.5"><span className="w-4 h-4 rounded bg-[#3B82F6] block" /></td>
                        <td className="py-1.5 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold">Asignado</td>
                        <td className="py-1.5 text-slate-400 max-w-[150px] truncate">Actividad asignada a un operador</td>
                        <td className="py-1.5"><span className="w-4 h-4 rounded bg-[#A855F7] block" /></td>
                        <td className="py-1.5 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold">En proceso</td>
                        <td className="py-1.5 text-slate-400 max-w-[150px] truncate">El operador está trabajando...</td>
                        <td className="py-1.5"><span className="w-4 h-4 rounded bg-[#FACC15] block" /></td>
                        <td className="py-1.5 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 italic">↕ Arrastra para reordenar estatus</div>
            </div>

            {/* CARD 4: HORARIOS LABORALES */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Horarios laborales</h3>
                  <p className="text-[10px] text-slate-400">Define los días y horarios laborales para el cálculo de tiempos.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Días laborales</span>
                    <div className="space-y-1 font-medium">
                      <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-[#6A1B29]" /> Lunes</label>
                      <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-[#6A1B29]" /> Martes</label>
                      <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-[#6A1B29]" /> Miércoles</label>
                      <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-[#6A1B29]" /> Jueves</label>
                      <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-[#6A1B29]" /> Viernes</label>
                      <label className="flex items-center gap-2 text-slate-300"><input type="checkbox" className="rounded" /> Sábado</label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Horario laboral</span>
                      <div className="space-y-1 text-[10px]">
                        <label className="block text-slate-400">Hora de inicio</label>
                        <input type="text" defaultValue="08:00 AM" className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-slate-700 text-xs focus:outline-none" />
                        <label className="block text-slate-400 pt-1">Hora de fin</label>
                        <input type="text" defaultValue="04:00 PM" className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-slate-700 text-xs focus:outline-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pausa para comida</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <label className="block text-slate-400">Inicio</label>
                          <input type="text" defaultValue="01:00 PM" className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-slate-700 text-xs focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-slate-400">Fin</label>
                          <input type="text" defaultValue="02:00 PM" className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-slate-700 text-xs focus:outline-none" />
                        </div>
                      </div>
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

            {/* CARD 5: MOTIVOS DE TRANSFERENCIA */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Motivos de transferencia</h3>
                    <p className="text-[10px] text-slate-400">Catálogo de motivos que pueden seleccionar al transferir.</p>
                  </div>
                  <button className="text-[10px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-2.5 py-1.5 rounded-lg transition-colors">
                    ➕ Agregar motivo
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                        <th className="pb-2">Motivo</th>
                        <th className="pb-2 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                      <tr><td className="py-2">░ Área incorrecta</td><td className="py-2 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td></tr>
                      <tr><td className="py-2">░ Falta de conocimiento técnico</td><td className="py-2 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td></tr>
                      <tr><td className="py-2">░ Sobrecarga de trabajo</td><td className="py-2 text-center text-slate-400 space-x-2"><button className="hover:text-slate-600">📝</button><button className="hover:text-rose-600">🗑️</button></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 italic">↕ Arrastra para reordenar motivos</div>
            </div>

            {/* CARD 6: NOTIFICACIONES */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Notificaciones</h3>
                  <p className="text-[10px] text-slate-400">Configura los avisos que recibirá el sistema.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Notificaciones por correo</span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1"><span>Ticket asignado</span><div className="w-7 h-4 bg-[#6A1B29] rounded-full flex items-center justify-end p-0.5"><span className="w-3 h-3 bg-white rounded-full shadow-sm" /></div></div>
                      <div className="flex items-center justify-between gap-1"><span>Ticket vencido</span><div className="w-7 h-4 bg-[#6A1B29] rounded-full flex items-center justify-end p-0.5"><span className="w-3 h-3 bg-white rounded-full shadow-sm" /></div></div>
                      <div className="flex items-center justify-between gap-1"><span>Ticket próx. a vencer</span><div className="w-7 h-4 bg-[#6A1B29] rounded-full flex items-center justify-end p-0.5"><span className="w-3 h-3 bg-white rounded-full shadow-sm" /></div></div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">En el sistema</span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1"><span>Mostrar alertas</span><div className="w-7 h-4 bg-[#6A1B29] rounded-full flex items-center justify-end p-0.5"><span className="w-3 h-3 bg-white rounded-full shadow-sm" /></div></div>
                      <div className="flex items-center justify-between gap-1"><span>Sonido de notif.</span><div className="w-7 h-4 bg-[#6A1B29] rounded-full flex items-center justify-end p-0.5"><span className="w-3 h-3 bg-white rounded-full shadow-sm" /></div></div>
                      <div className="flex items-center justify-between gap-1"><span>Badge de notif.</span><div className="w-7 h-4 bg-[#6A1B29] rounded-full flex items-center justify-end p-0.5"><span className="w-3 h-3 bg-white rounded-full shadow-sm" /></div></div>
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