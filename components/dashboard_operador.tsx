"use client"; 

import React, { useState } from "react";
import { Clock, AlertTriangle, CheckCircle, FileText, Calendar, Eye } from "lucide-react";
import ModalDetalleTicket from "@/components/ModalDetalleTicket";

interface OperatorDashboardProps {
  ticketsBaseDatos: any[];
}

export default function OperatorDashboard({ ticketsBaseDatos }: OperatorDashboardProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [ticketSeleccionado, setTicketSeleccionado] = useState<any>(null);

  // 1. USAMOS LOS TICKETS DE LA BASE DE DATOS
  const tickets = ticketsBaseDatos || [];

  // 2. CÓMPUTO DE MÉTRICAS REALES
  const pendientes = tickets.filter(t => t.estado === "PENDIENTE" || t.estado === "ASIGNADO").length;
  const enProceso = tickets.filter(t => t.estado === "EN_PROCESO").length;
  const finalizadas = tickets.filter(t => t.estado === "FINALIZADO").length;
  const urgentes = tickets.filter(t => t.prioridad === "CRITICA" || t.prioridad === "ALTA").length;
  const vencidas = tickets.filter(t => {
    if (!t.fechaLimite || t.estado === "FINALIZADO") return false;
    return new Date(t.fechaLimite) < new Date();
  }).length;

  const abrirDetalle = (ticket: any) => {
    setTicketSeleccionado(ticket);
    setModalAbierto(true);
  };

  return (
    <div className="space-y-8">
      
      {/* SECCIÓN DE CONTADORES RESTAURADA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Tarjeta: PENDIENTES */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Pendientes</span>
            <span className="text-2xl font-bold text-slate-800 block">{pendientes}</span>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-500 rounded-lg">
            <FileText className="h-5 w-5" />
          </div>
        </div>

        {/* Tarjeta: EN PROCESO */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">En proceso</span>
            <span className="text-2xl font-bold text-slate-800 block">{enProceso}</span>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-500 rounded-lg">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        {/* Tarjeta: FINALIZADAS */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Finalizadas</span>
            <span className="text-2xl font-bold text-slate-800 block">{finalizadas}</span>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-lg">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>

        {/* Tarjeta: URGENTES */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Urgentes</span>
            <span className="text-2xl font-bold text-slate-800 block">{urgentes}</span>
          </div>
          <div className="p-2.5 bg-rose-50 text-rose-500 rounded-lg">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        {/* Tarjeta: VENCIDAS */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Vencidas</span>
            <span className="text-2xl font-bold text-slate-800 block">{vencidas}</span>
          </div>
          <div className="p-2.5 bg-purple-50 text-purple-500 rounded-lg">
            <Calendar className="h-5 w-5" />
          </div>
        </div>

      </div>

      {/* TABLA DE TICKETS ASIGNADOS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#6A1B29] text-white font-bold uppercase tracking-wider">
                <th className="p-3.5 border-b border-slate-200">ID Ticket</th>
                <th className="p-3.5 border-b border-slate-200">Título</th>
                <th className="p-3.5 border-b border-slate-200">Asignado a</th>
                <th className="p-3.5 border-b border-slate-200">Prioridad</th>
                <th className="p-3.5 border-b border-slate-200">Estatus</th>
                <th className="p-3.5 border-b border-slate-200">Fecha de creación</th>
                <th className="p-3.5 border-b border-slate-200">Fecha límite</th>
                <th className="p-3.5 border-b border-slate-200 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50/70 transition-colors">
                  
                  {/* ID Ticket con blindaje de tipo */}
                  <td className="p-3.5 font-bold text-slate-500">
                    {ticket.codigo || ticket.folio || `TK-${String(ticket.id).substring(0, 5)}`}
                  </td>
                  
                  {/* Título de la actividad */}
                  <td className="p-3.5 text-slate-900 max-w-xs truncate">{ticket.titulo}</td>
                  
                  <td className="px-6 py-4 text-xs text-slate-600">
                      {ticket.operador?.nombre ? (
                        <div className="flex items-center gap-2">
                          {/* Tu inicial o avatar si lo usas */}
                          <span className="font-medium text-slate-800">
                            {ticket.operador.nombre}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Sin asignar</span>
                      )}
                    </td>
                  
                  {/* Prioridad con indicador visual de punto de color */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className={`h-2 w-2 rounded-full ${
                        ticket.prioridad === "CRITICA" || ticket.prioridad === "ALTA" 
                          ? "bg-red-500" 
                          : ticket.prioridad === "MEDIA" 
                          ? "bg-amber-500" 
                          : "bg-green-500"
                      }`} />
                      <span className="text-slate-700 text-[11px] uppercase">{ticket.prioridad}</span>
                    </div>
                  </td>
                  
                  {/* Estatus estilo Badge */}
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                      ticket.estado === "FINALIZADO" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : ticket.estado === "EN_PROCESO"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}>
                      {ticket.estado}
                    </span>
                  </td>
                  
                  {/* Fecha de Creación formateada */}
                  <td className="p-3.5 text-slate-600">
                    {ticket.fechaCreacion ? (
                      new Date(ticket.fechaCreacion).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* Fecha Límite formateada */}
                  <td className="p-3.5 text-slate-600">
                    {ticket.fechaLimite ? (
                      new Date(ticket.fechaLimite).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                    ) : (
                      "-"
                    )}
                  </td>
                  
                  {/* Botón de Acciones */}
                  <td className="p-3.5 text-center">
                    <button 
                      onClick={() => abrirDetalle(ticket)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center justify-center"
                      title="Ver detalle"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>

                </tr>
              ))}

              {tickets.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-slate-400 italic bg-slate-50/50">
                    No tienes tickets asignados en este momento. ¡Buen trabajo!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal interactivo de detalles */}
      <ModalDetalleTicket 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
        ticket={ticketSeleccionado}
      />
    </div>
  );
}