import React from 'react';
import { 
  Search, Download, Plus, Filter, 
  ClipboardList, FileWarning, Users, Clock, Timer,
  Eye, Edit, MoreVertical, CheckCircle, ArrowRightLeft, UserPlus
} from 'lucide-react';

export default function AdministradorActividades() {
  // Arreglos vacíos a la espera de los datos reales de la base de datos
  const tickets: any[] = [];
  const cargaOperadores: any[] = [];
  const sinAsignar: any[] = [];

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      
      {/* 1. ENCABEZADO Y PESTAÑAS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex space-x-6 text-sm font-medium overflow-x-auto pb-1">
          <button className="text-indigo-700 border-b-2 border-indigo-700 pb-2 whitespace-nowrap">Todas las actividades</button>
          <button className="text-slate-500 hover:text-slate-800 pb-2 whitespace-nowrap flex items-center gap-1.5">
            Sin asignar <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-[10px]">{sinAsignar.length}</span>
          </button>
          <button className="text-slate-500 hover:text-slate-800 pb-2 whitespace-nowrap flex items-center gap-1.5">
            Críticas <span className="bg-red-50 text-red-600 py-0.5 px-2 rounded-full text-[10px]">0</span>
          </button>
          <button className="text-slate-500 hover:text-slate-800 pb-2 whitespace-nowrap flex items-center gap-1.5">
            Vencidas <span className="bg-red-50 text-red-600 py-0.5 px-2 rounded-full text-[10px]">0</span>
          </button>
          <button className="text-slate-500 hover:text-slate-800 pb-2 whitespace-nowrap flex items-center gap-1.5">
            Transferidas <span className="bg-amber-50 text-amber-600 py-0.5 px-2 rounded-full text-[10px]">0</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Nueva actividad
          </button>
        </div>
      </div>

      {/* 2. FILTROS RÁPIDOS */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="w-40">
          <label className="text-[10px] font-bold text-slate-500 mb-1.5 block">Estado</label>
          <select className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <option>Todos</option>
          </select>
        </div>
        <div className="w-40">
          <label className="text-[10px] font-bold text-slate-500 mb-1.5 block">Prioridad</label>
          <select className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <option>Todas</option>
          </select>
        </div>
        <div className="w-40">
          <label className="text-[10px] font-bold text-slate-500 mb-1.5 block">Responsable</label>
          <select className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <option>Todos</option>
          </select>
        </div>
        <div className="w-40">
          <label className="text-[10px] font-bold text-slate-500 mb-1.5 block">Área</label>
          <select className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <option>Todas</option>
          </select>
        </div>
        <div className="w-56">
          <label className="text-[10px] font-bold text-slate-500 mb-1.5 block">Fecha creación</label>
          <div className="relative">
            <input type="date" className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
          </div>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-50 shadow-sm transition-colors ml-auto">
          <Filter className="w-4 h-4" /> Filtros avanzados
        </button>
      </div>

      {/* 3. TARJETAS DE MÉTRICAS OPERATIVAS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><ClipboardList className="w-6 h-6" /></div>
          <div>
            <p className="text-[11px] font-bold text-slate-500">Total actividades</p>
            <p className="text-2xl font-black text-slate-800">{tickets.length}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">100% del total</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-lg"><FileWarning className="w-6 h-6" /></div>
          <div>
            <p className="text-[11px] font-bold text-slate-500">Sin asignar</p>
            <p className="text-2xl font-black text-slate-800">{sinAsignar.length}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">0% del total</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-500 rounded-lg"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-[11px] font-bold text-slate-500">Carga prom. operador</p>
            <p className="text-2xl font-black text-slate-800">0</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Actividades</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-red-50 text-red-500 rounded-lg"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-[11px] font-bold text-slate-500">Próximas a vencer</p>
            <p className="text-2xl font-black text-slate-800">0</p>
            <p className="text-[10px] text-slate-400 mt-0.5">En los próximos 3 días</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-lg"><Timer className="w-6 h-6" /></div>
          <div>
            <p className="text-[11px] font-bold text-slate-500">Tiempo prom. resolución</p>
            <p className="text-2xl font-black text-slate-800">0 <span className="text-sm font-bold">días</span></p>
            <p className="text-[10px] text-slate-400 mt-0.5">Últimos 30 días</p>
          </div>
        </div>
      </div>

      {/* 4. CONTENIDO PRINCIPAL: TABLA Y PANELES LATERALES */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* TABLA PRINCIPAL */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold">
                  <th className="p-4 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="p-4">Folio</th>
                  <th className="p-4">Título</th>
                  <th className="p-4">Prioridad</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Responsable</th>
                  <th className="p-4">Fecha creación</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {tickets.map((ticket, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                    <td className="p-4 font-semibold text-slate-500">{ticket.id}</td>
                    <td className="p-4 font-medium text-slate-900">{ticket.titulo}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-sm ${
                        ticket.prioridad === 'Crítica' ? 'text-red-600 bg-red-50' :
                        ticket.prioridad === 'Alta' ? 'text-orange-600 bg-orange-50' :
                        ticket.prioridad === 'Media' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'
                      }`}>
                        {ticket.prioridad}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        ticket.estado === 'En revisión' ? 'text-indigo-600 bg-indigo-50' :
                        ticket.estado === 'Pendiente' ? 'text-amber-600 bg-amber-50' :
                        ticket.estado === 'En proceso' ? 'text-blue-600 bg-blue-50' : 'text-emerald-600 bg-emerald-50'
                      }`}>
                        {ticket.estado}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {ticket.responsable?.charAt(0) || '-'}
                        </div>
                        <span className="font-medium">{ticket.responsable || 'Sin asignar'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{ticket.fecha}</span>
                        <span className="text-[10px] text-slate-400">{ticket.hora}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded bg-white shadow-sm border border-slate-200" title="Ver detalle"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded bg-white shadow-sm border border-slate-200" title="Editar"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded bg-white shadow-sm border border-slate-200" title="Más opciones"><MoreVertical className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {/* ESTADO VACÍO DE LA TABLA */}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-slate-400 italic bg-slate-50/50">
                      No hay actividades registradas en el sistema en este momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Paginación */}
          <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50 rounded-b-xl">
            <span className="text-xs text-slate-500">Mostrando 0 a 0 de 0 actividades</span>
            <div className="flex gap-1 items-center opacity-50 pointer-events-none">
              <button className="px-3 py-1.5 border border-slate-200 bg-white text-slate-400 rounded-md text-xs">&lt;</button>
              <button className="px-3 py-1.5 border border-indigo-600 bg-indigo-600 text-white rounded-md text-xs font-bold">1</button>
              <button className="px-3 py-1.5 border border-slate-200 bg-white text-slate-600 rounded-md text-xs">Siguiente</button>
            </div>
          </div>
        </div>

        {/* PANELES LATERALES */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Carga de trabajo por operador */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-800">Carga de trabajo por operador</h3>
              <button className="text-[10px] text-indigo-600 font-bold hover:underline">Ver detalle ↗</button>
            </div>
            <div className="space-y-4">
              {cargaOperadores.map((op, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-600">
                    {op.nombre.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700 truncate">{op.nombre}</span>
                      <span className="font-bold text-slate-500">{op.porcentaje}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
                      <div className={`h-1.5 rounded-full ${op.color}`} style={{ width: `${Math.min(op.porcentaje, 100)}%` }}></div>
                    </div>
                    <p className="text-[10px] text-slate-400">{op.actividades} actividades</p>
                  </div>
                </div>
              ))}
              
              {/* ESTADO VACÍO DE OPERADORES */}
              {cargaOperadores.length === 0 && (
                <p className="text-xs text-center text-slate-400 italic py-4">
                  Sin operadores con actividades asignadas.
                </p>
              )}
            </div>
          </div>

          {/* Actividades sin asignar */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-800">Actividades sin asignar</h3>
              <span className="bg-red-50 text-red-600 py-0.5 px-2 rounded-full text-[10px] font-bold">{sinAsignar.length}</span>
            </div>
            <div className="space-y-3 mb-4">
              {sinAsignar.map((sa, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] font-mono text-slate-400">{sa.id.split('-')[2]}</span>
                    <span className="text-xs text-slate-700 truncate">{sa.titulo}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${
                    sa.prioridad === 'Alta' ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50'
                  }`}>
                    {sa.prioridad}
                  </span>
                </div>
              ))}
              
              {/* ESTADO VACÍO SIN ASIGNAR */}
              {sinAsignar.length === 0 && (
                <p className="text-xs text-center text-slate-400 italic py-2">
                  No hay actividades pendientes de asignación.
                </p>
              )}
            </div>
          </div>

          {/* Acciones Rápidas Administrativas */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Acciones rápidas</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-slate-600 border border-slate-100 group">
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-center">Asignar actividades</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-slate-600 border border-slate-100 group">
                <ArrowRightLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-center">Transferir actividades</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-slate-600 border border-slate-100 group">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-center">Reasignación masiva</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-slate-600 border border-slate-100 group">
                <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-center">Cerrar actividades</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}