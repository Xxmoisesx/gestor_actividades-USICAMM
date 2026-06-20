"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, Download, Plus, Filter, 
  ClipboardList, FileWarning, Users, Clock, Timer,
  Eye, Edit, MoreVertical, CheckCircle, ArrowRightLeft, UserPlus,
  Trash2, X // 👈 Corregido: Importamos el icono X que faltaba
} from 'lucide-react';
import Link from 'next/link';
import ModalDetalleTicket from "./ModalDetalleTicket"; 

interface AdministradorActividadesProps { 
  rol: string; 
  ticketsBaseDatos?: any[]; 
}

export default function AdministradorActividades({ 
  rol, 
  ticketsBaseDatos = [] 
}: AdministradorActividadesProps) {
  
  // ==========================================
  // ESTADOS PRINCIPALES Y REACTIVIDAD
  // ==========================================
  // Convertimos los tickets en estado para que la edición/transferencia sea funcional en tiempo real
  const [tickets, setTickets] = useState<any[]>(ticketsBaseDatos);
  const [tabActiva, setTabActiva] = useState<"TODAS" | "SIN_ASIGNAR" | "CRITICAS" | "VENCIDAS" | "TRANSFERIDAS">("TODAS");
  
  // Sincronizar el estado local si las props cambian externamente
  useEffect(() => {
    setTickets(ticketsBaseDatos);
  }, [ticketsBaseDatos]);

  // ==========================================
  // ESTADOS PARA EL MODAL DE DETALLES
  // ==========================================
  const [modalOpen, setModalOpen] = useState(false);
  const [ticketSeleccionado, setTicketSeleccionado] = useState<any>(null);

  // ==========================================
  // 👈 Corregido: ESTADOS Y LÓGICA DE TRANSFERENCIA (Movidos dentro del componente)
  // ==========================================
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false); 
  const [ticketATransferir, setTicketATransferir] = useState<any>(null); // Guarda el ticket específico a editar
  const [selectedResponsable, setSelectedResponsable] = useState("");
  const [motivoTransferencia, setMotivoTransferencia] = useState("");

  // Normalizamos la validación del rol para evitar problemas de mayúsculas/minúsculas
  const esAdmin = rol?.toUpperCase() === "ADMIN";

  // Función interna para abrir el detalle al hacer clic en el ojo
  const abrirDetalle = (ticket: any) => {
    setTicketSeleccionado(ticket);
    setModalOpen(true);
  };

  // Función para preparar y abrir el modal de transferencia
  const abrirModalTransferencia = (ticket: any) => {
    setTicketATransferir(ticket);
    setIsTransferModalOpen(true);
  };

  // Manejador del envío del formulario de transferencia
  const handleTransferirSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketATransferir) return;

    // LÓGICA FUNCIONAL: Actualizamos el estado local de los tickets
    setTickets(prevTickets => 
      prevTickets.map(t => {
        if (t.id === ticketATransferir.id) {
          return {
            ...t,
            origen: "TRANSFERIDO", // Lo marca como transferido para que entre en el filtro
            operador: {
              ...t.operador,
              nombre: selectedResponsable // Asigna el nuevo responsable
            }
          };
        }
        return t;
      })
    );

    console.log(`Ticket #${ticketATransferir.id} transferido a:`, selectedResponsable, "Motivo:", motivoTransferencia);
    
    // Resetear formulario y cerrar modal
    setSelectedResponsable("");
    setMotivoTransferencia("");
    setTicketATransferir(null);
    setIsTransferModalOpen(false);
  };

  // ==========================================
  // CÓMPUTO DINÁMICO DE FILTROS Y MÉTRICAS
  // ==========================================
  const sinAsignarTickets = tickets.filter(t => !t.operador || !t.operador?.nombre);
  const criticasTickets = tickets.filter(t => t.prioridad === "CRITICA" || t.prioridad === "ALTA");
  const vencidasTickets = tickets.filter(t => {
    if (!t.fechaLimite || t.estado === "FINALIZADO") return false;
    return new Date(t.fechaLimite) < new Date();
  });
  const transferidasTickets = tickets.filter(t => t.origen === "Transferido" || t.origen === "TRANSFERIDO");

  const ticketsFiltrados = tickets.filter(t => {
    if (tabActiva === "SIN_ASIGNAR") return !t.operador || !t.operador?.nombre;
    if (tabActiva === "CRITICAS") return t.prioridad === "CRITICA" || t.prioridad === "ALTA";
    if (tabActiva === "VENCIDAS") return t.fechaLimite && t.estado !== "FINALIZADO" && new Date(t.fechaLimite) < new Date();
    if (tabActiva === "TRANSFERIDAS") return t.origen === "Transferido" || t.origen === "TRANSFERIDO";
    return true; 
  });

  // ==========================================
  // CÓMPUTO DINÁMICO DE CARGA DE TRABAJO
  // ==========================================
  const totalConOperador = tickets.filter(t => t.operador?.nombre).length;
  const mapaOperadores: Record<string, number> = {};
  
  tickets.forEach(t => {
    if (t.operador?.nombre) {
      mapaOperadores[t.operador.nombre] = (mapaOperadores[t.operador.nombre] || 0) + 1;
    }
  });

  const cargaOperadores = Object.entries(mapaOperadores).map(([nombre, count]) => {
    const porcentaje = totalConOperador > 0 ? Math.round((count / totalConOperador) * 100) : 0;
    let color = "bg-emerald-500";
    if (porcentaje > 35 && porcentaje <= 70) color = "bg-amber-500";
    if (porcentaje > 70) color = "bg-rose-500";

    return { nombre, actividades: count, porcentaje, color };
  }).sort((a, b) => b.actividades - a.actividades);

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      
      {/* 1. ENCABEZADO Y PESTAÑAS INTERACTIVAS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex space-x-6 text-sm font-medium overflow-x-auto pb-1 invisible-scrollbar">
          <button 
            onClick={() => setTabActiva("TODAS")}
            className={`pb-2 whitespace-nowrap transition-all ${tabActiva === "TODAS" ? "text-indigo-700 border-b-2 border-indigo-700 font-bold" : "text-slate-500 hover:text-slate-800"}`}
          >
            Todas las actividades
          </button>
          <button 
            onClick={() => setTabActiva("SIN_ASIGNAR")}
            className={`pb-2 whitespace-nowrap flex items-center gap-1.5 transition-all ${tabActiva === "SIN_ASIGNAR" ? "text-indigo-700 border-b-2 border-indigo-700 font-bold" : "text-slate-500 hover:text-slate-800"}`}
          >
            Sin asignar 
            <span className={`py-0.5 px-2 rounded-full text-[10px] ${sinAsignarTickets.length > 0 ? "bg-amber-100 text-amber-700 font-bold" : "bg-slate-100 text-slate-600"}`}>
              {sinAsignarTickets.length}
            </span>
          </button>
          <button 
            onClick={() => setTabActiva("CRITICAS")}
            className={`pb-2 whitespace-nowrap flex items-center gap-1.5 transition-all ${tabActiva === "CRITICAS" ? "text-indigo-700 border-b-2 border-indigo-700 font-bold" : "text-slate-500 hover:text-slate-800"}`}
          >
            Críticas 
            <span className={`py-0.5 px-2 rounded-full text-[10px] ${criticasTickets.length > 0 ? "bg-rose-100 text-rose-700 font-bold" : "bg-slate-100 text-slate-600"}`}>
              {criticasTickets.length}
            </span>
          </button>
          <button 
            onClick={() => setTabActiva("VENCIDAS")}
            className={`pb-2 whitespace-nowrap flex items-center gap-1.5 transition-all ${tabActiva === "VENCIDAS" ? "text-indigo-700 border-b-2 border-indigo-700 font-bold" : "text-slate-500 hover:text-slate-800"}`}
          >
            Vencidas 
            <span className={`py-0.5 px-2 rounded-full text-[10px] ${vencidasTickets.length > 0 ? "bg-purple-100 text-purple-700 font-bold" : "bg-slate-100 text-slate-600"}`}>
              {vencidasTickets.length}
            </span>
          </button>
          <button 
            onClick={() => setTabActiva("TRANSFERIDAS")}
            className={`pb-2 whitespace-nowrap flex items-center gap-1.5 transition-all ${tabActiva === "TRANSFERIDAS" ? "text-indigo-700 border-b-2 border-indigo-700 font-bold" : "text-slate-500 hover:text-slate-800"}`}
          >
            Transferidas 
            <span className="bg-blue-50 text-blue-600 py-0.5 px-2 rounded-full text-[10px]">
              {transferidasTickets.length}
            </span>
          </button>
        </div>
        
        {/* BOTÓN REGISTRO (SOLO ADMIN) */}
        <div className="flex items-center gap-3">
          {esAdmin && (
            <Link href="/dashboard/crear">  
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-sm transition-colors">
                <Plus className="w-4 h-4" /> Nueva actividad
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* 2. FILTROS RÁPIDOS SUPERIORES */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por folio, título..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto justify-end">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filtrar
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="w-3.5 h-3.5" /> Exportar
          </button>
        </div>
      </div>
      
      {/* 4. CONTENIDO PRINCIPAL: TABLA Y PANELES LATERALES */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* TABLA PRINCIPAL */}
        <div className={`bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col ${esAdmin ? "xl:col-span-3" : "xl:col-span-4"}`}>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/70">
                  <th className="p-4 w-10"><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></th>
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
                {ticketsFiltrados.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4"><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></td>
                    
                    <td className="p-4 font-bold text-slate-500">
                      {ticket.codigo || ticket.folio || `TK-${String(ticket.id)}`}
                    </td>
                    
                    <td className="p-4 font-medium text-slate-900 max-w-xs truncate" title={ticket.titulo}>
                      {ticket.titulo}
                    </td>
                    
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        ticket.prioridad === 'CRITICA' || ticket.prioridad === 'ALTA' ? 'text-red-700 bg-red-50 border border-red-100' :
                        ticket.prioridad === 'MEDIA' ? 'text-amber-700 bg-amber-50 border border-amber-100' : 
                        'text-emerald-700 bg-emerald-50 border border-emerald-100'
                      }`}>
                        {ticket.prioridad}
                      </span>
                    </td>
                    
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        ticket.estado === 'FINALIZADO' ? 'text-emerald-700 bg-emerald-50' :
                        ticket.estado === 'PENDIENTE' || ticket.estado === 'ASIGNADO' ? 'text-amber-700 bg-amber-50' :
                        ticket.estado === 'EN_PROCESO' ? 'text-blue-700 bg-blue-50' : 
                        'text-indigo-700 bg-indigo-50'
                      }`}>
                        {ticket.estado}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-xs text-slate-600">
                      {ticket.operador?.nombre ? (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-800">
                            {ticket.operador.nombre}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Sin asignar</span>
                      )}
                    </td>

                    <td className="p-4 text-xs text-slate-600">
                      {ticket.fechaCreacion ? (
                        new Date(ticket.fechaCreacion).toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    
                    {/* ACCIONES DE FILA REESCRITAS POR ROLES */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        
                        {/* 1. OJO DE DETALLE (Común para todos los roles) */}
                        <button 
                          onClick={() => abrirDetalle(ticket)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-md bg-white shadow-sm border border-slate-200/80 transition-all" 
                          title="Ver detalle de la actividad"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* 2. TRANSFERIR TICKET */}
                        <button 
                          onClick={() => abrirModalTransferencia(ticket)} // 👈 Corregido: Enviamos el contexto del ticket
                          className="inline-flex items-center space-x-2 px-3 py-1.5 border border-amber-600/40 text-amber-800 hover:bg-amber-50 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm bg-white"
                          title="Transferir actividad a otro operador"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                          <span>Transferir</span>
                        </button>

                        {/* 3. ICONO DE BASURA / ELIMINAR (Exclusivo de Administrador) */}
                        {esAdmin && (
                          <button 
                            onClick={() => console.log("Eliminar ticket:", ticket.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md bg-white shadow-sm border border-slate-200/80 transition-all" 
                            title="Eliminar actividad"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                ))}
                
                {ticketsFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-slate-400 italic bg-slate-50/50">
                      No hay actividades en esta categoría en este momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* RECUENTO PIE DE TABLA */}
          <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50 rounded-b-xl">
            <span className="text-xs text-slate-500">
              Mostrando {ticketsFiltrados.length > 0 ? '1' : '0'} a {ticketsFiltrados.length} de {ticketsFiltrados.length} actividades
            </span>
            <div className="flex gap-1 items-center">
              <button className="px-2.5 py-1.5 border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 rounded-md text-xs transition-colors">&lt;</button>
              <button className="px-3 py-1.5 border border-indigo-600 bg-indigo-600 text-white rounded-md text-xs font-bold shadow-sm">1</button>
              <button className="px-2.5 py-1.5 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 rounded-md text-xs transition-colors">Siguiente</button>
            </div>
          </div>
        </div>

        {/* PANELES LATERALES: CARGA DE TRABAJO (SOLO ADMIN) */}
        {esAdmin && (
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-800">Carga de trabajo por operador</h3>
                <button className="text-[10px] text-indigo-600 font-bold hover:underline">Ver detalle ↗</button>
              </div>
              <div className="space-y-4">
                {cargaOperadores.map((op, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-indigo-700 uppercase">
                      {op.nombre.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 truncate">{op.nombre}</span>
                        <span className="font-bold text-slate-600">{op.porcentaje}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${op.color}`} 
                          style={{ width: `${Math.min(op.porcentaje, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">{op.actividades} actividades asignadas</p>
                    </div>
                  </div>
                ))}
                
                {cargaOperadores.length === 0 && (
                  <div className="text-center py-6 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-400 italic">
                      Sin operadores con actividades asignadas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* VENTANA FLOTANTE: DETALLE DE TICKET SELECCIONADO */}
      <ModalDetalleTicket 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        ticket={ticketSeleccionado} 
      />

      {/* ================= MODAL FLOTANTE DE TRANSFERENCIA ================= */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
            
            {/* Cabecera del Modal */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-800">
                <ArrowRightLeft className="w-4 h-4 text-[#6A1B29]" />
                <h3 className="text-sm font-black tracking-tight uppercase">
                  Transferir Ticket {ticketATransferir?.codigo || `TK-${ticketATransferir?.id}`}
                </h3>
              </div>
              <button 
                onClick={() => setIsTransferModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formulario del Modal */}
            <form onSubmit={handleTransferirSubmit}>
              <div className="p-5 space-y-4">
                
                {/* Info del Responsable Actual Dinámico */}
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs">
                  <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Responsable en turno</p>
                  <p className="text-slate-700 font-bold mt-0.5">
                    {ticketATransferir?.operador?.nombre || "Sin asignar (Mesa de entrada)"}
                  </p>
                </div>

                {/* Selección de Nuevo Responsable */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Asignar a nuevo responsable
                  </label>
                  <select
                    required
                    value={selectedResponsable}
                    onChange={(e) => setSelectedResponsable(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 text-xs font-semibold rounded-xl p-3 text-slate-700 outline-none focus:border-[#6A1B29] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="" disabled>Selecciona un operador...</option>
                    <option value="Carlos Ramírez">Carlos Ramírez (Especialista)</option>
                    <option value="Juan Pérez">Juan Pérez (Mesa de ayuda)</option>
                    <option value="Alejandra Rosas">Alejandra Rosas (Administradora)</option>
                  </select>
                </div>

                {/* Motivo de Transferencia */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Motivo del reenvío / Justificación
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={motivoTransferencia}
                    onChange={(e) => setMotivoTransferencia(e.target.value)}
                    placeholder="Describe detalladamente por qué el caso debe ser atendido por otra célula o especialista..."
                    className="w-full bg-slate-50/50 border border-slate-200 text-xs font-medium rounded-xl p-3 text-slate-700 outline-none focus:border-[#6A1B29] focus:bg-white transition-all resize-none placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Botones de acción del Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#6A1B29] hover:bg-[#54141F] text-white font-bold text-xs px-5 py-2 rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Confirmar Transferencia
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}