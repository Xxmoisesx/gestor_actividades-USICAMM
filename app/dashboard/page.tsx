"use client"; // Forzamos componente de cliente para usar useState

import React, { useState } from "react";
import { Clock, AlertTriangle, CheckCircle, FileText, Calendar, Eye } from "lucide-react";
import ModalDetalleTicket from "@/components/ModalDetalleTicket";

export default function OperatorDashboard() {
  
  // Estado para controlar la apertura del modal flotante
  const [modalAbierto, setModalAbierto] = useState(false);

  // =========================================================================
  // 1. MODO MAQUETA (CON UN TICKET DE PRUEBA)
  // =========================================================================
  const tickets: any[] = [
    {
      id: "1bc64fef-b443-4ced-9601-c233547bad0e",
      folio: "TK-001",
      titulo: "Caída de sistema en proyecto venus",
      asignadoA: { nombre: "Alejandra Rosas" },
      prioridad: "ALTA",
      estado: "EN_REVISION",
      creadoEn: "2026-05-16T10:30:00.000Z",
      fechaLimite: "2026-05-20T00:00:00.000Z",
    }
  ];

  // 2. CÓMPUTO DE MÉTRICAS
  const pendientes = tickets.filter(t => t.estado === "PENDIENTE" || t.estado === "ASIGNADO").length;
  const enProceso = tickets.filter(t => t.estado === "EN_PROCESO").length;
  const finalizadas = tickets.filter(t => t.estado === "FINALIZADO").length;
  const urgentes = tickets.filter(t => t.prioridad === "CRITICA" || t.prioridad === "ALTA").length;
  const vencidas = tickets.filter(t => {
    if (!t.fechaLimite || t.estado === "FINALIZADO") return false;
    return new Date(t.fechaLimite) < new Date();
  }).length;

  return (
    <div className="space-y-8">
      
      {/* SECCIÓN DE CONTADORES (TARJETAS KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Pendientes</p>
            <p className="text-3xl font-black text-slate-800 mt-1">{pendientes}</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-lg"><FileText className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">En proceso</p>
            <p className="text-3xl font-black text-slate-800 mt-1">{enProceso}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-500 rounded-lg"><Clock className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Finalizadas</p>
            <p className="text-3xl font-black text-slate-800 mt-1">{finalizadas}</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-lg"><CheckCircle className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Urgentes</p>
            <p className="text-3xl font-black text-slate-600 mt-1">{urgentes}</p>
          </div>
          <div className="p-3 bg-red-50 text-red-500 rounded-lg"><AlertTriangle className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Vencidas</p>
            <p className="text-3xl font-black text-purple-700 mt-1">{vencidas}</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-500 rounded-lg"><Calendar className="w-6 h-6" /></div>
        </div>
      </div>

      {/* TABLA DE TICKETS ASIGNADOS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#6A1B29] text-white font-semibold tracking-wider">
                <th className="p-3.5">ID Ticket</th>
                <th className="p-3.5">Título</th>
                <th className="p-3.5">Asignado a</th>
                <th className="p-3.5">Prioridad</th>
                <th className="p-3.5">Estatus</th>
                <th className="p-3.5">Fecha de creación</th>
                <th className="p-3.5">Fecha límite</th>
                <th className="p-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-500">{ticket.folio || `TK-${ticket.id.substring(0,5)}`}</td>
                  <td className="p-3.5 text-slate-900 max-w-xs truncate">{ticket.titulo}</td>
                  <td className="p-3.5 text-slate-600">{ticket.asignadoA?.nombre || "N/A"}</td>
                  <td className="p-3.5">
                    <span className="flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        ticket.prioridad === 'CRITICA' ? 'bg-purple-600' :
                        ticket.prioridad === 'ALTA' ? 'bg-red-500' :
                        ticket.prioridad === 'MEDIA' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                      <span>{ticket.prioridad}</span>
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      ticket.estado === 'FINALIZADO' ? 'bg-emerald-100 text-emerald-800' :
                      ticket.estado === 'EN_PROCESO' ? 'bg-blue-100 text-blue-800' :
                      ticket.estado === 'EN_REVISION' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ticket.estado}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500">{new Date(ticket.creadoEn).toLocaleDateString('es-MX')}</td>
                  <td className="p-3.5 text-slate-500">
                    {ticket.fechaLimite ? new Date(ticket.fechaLimite).toLocaleDateString('es-MX') : 'N/A'}
                  </td>
                  <td className="p-3.5 text-center">
                    <button 
                      type="button"
                      onClick={() => setModalAbierto(true)} 
                      className="inline-flex p-1.5 text-slate-400 hover:text-[#6A1B29] hover:bg-slate-100 rounded-lg transition-all cursor-pointer" 
                      title="Ver detalles rápidos"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {/* RENDERIZADO CUANDO LA BASE DE DATOS ESTÁ VACÍA */}
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

      {/* COMPONENTE MODAL FLOTANTE */}
      <ModalDetalleTicket 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
      />

    </div>
  );
}