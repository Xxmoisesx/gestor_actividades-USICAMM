"use client"; 

import React, { useState } from "react";
import { Clock, AlertTriangle, CheckCircle, FileText, Calendar, Eye } from "lucide-react";
import ModalDetalleTicket from "@/components/ModalDetalleTicket";

// Le decimos al componente que va a recibir los 'tickets' desde afuera
export default function OperatorDashboard({ ticketsBaseDatos }: { ticketsBaseDatos: any[] }) {
  
  const [modalAbierto, setModalAbierto] = useState(false);

  // 1. USAMOS LOS TICKETS DE LA BASE DE DATOS
  const tickets = ticketsBaseDatos || [];

  // 2. CÓMPUTO DE MÉTRICAS (Igual que el tuyo)
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
      {/* SECCIÓN DE CONTADORES */}
      {/* ... (Todo tu código de los contadores queda exactamente igual) ... */}

      {/* TABLA DE TICKETS ASIGNADOS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            {/* ... (Tu <thead> queda igual) ... */}
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-500">{ticket.folio || `TK-${ticket.id.substring(0,5)}`}</td>
                  <td className="p-3.5 text-slate-900 max-w-xs truncate">{ticket.titulo}</td>
                  {/* Asegúrate de que Prisma traiga la relación del usuario, o ajusta esta línea según tu esquema */}
                  <td className="p-3.5 text-slate-600">{ticket.asignadoA?.nombre || "N/A"}</td>
                  
                  {/* ... (El resto de tus <td> quedan exactamente igual) ... */}
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

      <ModalDetalleTicket 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
      />
    </div>
  );
}