"use client";

import React, { useState } from "react";
import { 
  X, Clock, ArrowLeftRight, User, Send 
} from "lucide-react";
import Link from "next/link";

// 1. Mapeos de estilos dinámicos para mantener la consistencia visual de tu UI
const mapPrioridades: Record<string, { label: string; style: string }> = {
  CRITICA: { label: "Crítica", style: "bg-red-100 text-red-700 border-red-200" },
  ALTA: { label: "Alta", style: "bg-orange-100 text-orange-700 border-orange-200" },
  MEDIA: { label: "Media", style: "bg-amber-100 text-amber-700 border-amber-200" },
  BAJA: { label: "Baja", style: "bg-slate-100 text-slate-600 border-slate-200" },
};

const mapEstados: Record<string, { label: string; style: string }> = {
  PENDIENTE: { label: "Pendiente", style: "bg-purple-50 text-purple-600 border-purple-100" },
  EN_PROCESO: { label: "En proceso", style: "bg-blue-50 text-blue-600 border-blue-100" },
  EN_REVISION: { label: "En revisión", style: "bg-amber-50 text-amber-600 border-amber-100" },
  FINALIZADA: { label: "Finalizada", style: "bg-emerald-50 text-emerald-600 border-emerald-100" },
};

interface ModalDetalleTicketProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: any; // 👈 Cambiado de ticketId a ticket para recibir todo el registro dinámico
}

export default function ModalDetalleTicket({ isOpen, onClose, ticket }: ModalDetalleTicketProps) {
  const [tabActiva, setTabActiva] = useState<"comentarios" | "historial">("comentarios");
  const [nuevoComentario, setNuevoComentario] = useState("");

  // Si el modal está cerrado o no hay un ticket seleccionado aún, no renderizamos nada
  if (!isOpen || !ticket) return null;

  // Formateadores de fechas seguros
  const fechaCreacionStr = ticket.fechaCreacion 
    ? new Date(ticket.fechaCreacion).toLocaleDateString("es-MX", { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
    : "N/A";

  const fechaLimiteStr = ticket.fechaLimite 
    ? new Date(ticket.fechaLimite).toLocaleDateString("es-MX", { day: '2-digit', month: '2-digit', year: '2-digit' })
    : "Sin límite";

  // Obtenemos los estilos dinámicos o usamos unos por defecto por seguridad
  const prioridadInfo = mapPrioridades[ticket.prioridad] || { label: ticket.prioridad, style: "bg-slate-50 text-slate-600" };
  const estadoInfo = mapEstados[ticket.estado] || { label: ticket.estado, style: "bg-slate-50 text-slate-600" };

  // Fallback para comentarios por si aún no los incluyes en la relación de Prisma
  const comentariosData = ticket.comentarios || [
    {
      id: 1,
      autor: ticket.operador?.nombre || "Sistema",
      rol: ticket.operador ? "Operador Asignado" : "Automatización",
      fecha: fechaCreacionStr,
      avatar: ticket.operador?.nombre?.substring(0, 2).toUpperCase() || "SYS",
      mensaje: ticket.descripcion || "Actividad inicializada sin descripción adicional.",
      tipo: ticket.operador ? "usuario" : "sistema"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* CONTENEDOR DEL MODAL FLOTANTE */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER DEL MODAL DINÁMICO */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3">
              {/* Mostramos el código correlativo (TK-001) o el ID como fallback */}
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {ticket.codigo || `TK-${String(ticket.id).padStart(3, '0')}`}
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${prioridadInfo.style}`}>
                {prioridadInfo.label}
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${estadoInfo.style}`}>
                {estadoInfo.label}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800 mt-2 capitalize">
              {ticket.titulo}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
              {ticket.descripcion || "Sin descripción proporcionada."}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* METADATA / BADGES SUPERIORES DINÁMICOS */}
        <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px]">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Asignado a</p>
            <p className="text-slate-700 font-bold mt-0.5">{ticket.operador?.nombre || "Sin asignar"}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Fecha de creación</p>
            <p className="text-slate-700 font-bold mt-0.5">{fechaCreacionStr}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Fecha Límite</p>
            <p className="text-slate-700 font-bold mt-0.5">{fechaLimiteStr}</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Origen</p>
            <p className="text-slate-700 font-bold mt-0.5">{ticket.origen || "Manual"}</p>
          </div>
        </div>

        {/* NAVEGACIÓN DE PESTAÑAS (TABS) */}
        <div className="px-6 pt-3 flex items-center space-x-6 border-b border-slate-100 text-xs font-bold">
          <button
            onClick={() => setTabActiva("comentarios")}
            className={`pb-2.5 relative transition-colors ${
              tabActiva === "comentarios" ? "text-[#6A1B29]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Comentarios ({comentariosData.length})
            {tabActiva === "comentarios" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6A1B29]" />}
          </button>
          <button
            onClick={() => setTabActiva("historial")}
            className={`pb-2.5 relative transition-colors ${
              tabActiva === "historial" ? "text-[#6A1B29]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Historial
            {tabActiva === "historial" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6A1B29]" />}
          </button>
        </div>

        {/* CARDS DE RESUMEN DE INDICADORES */}
        <div className="px-6 py-4 grid grid-cols-3 gap-4 bg-slate-50/20 border-b border-slate-100">
          <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center space-x-3 shadow-sm">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Estatus Base</p>
              <p className="text-xs font-black text-slate-800 uppercase text-[10px]">{ticket.estado}</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center space-x-3 shadow-sm">
            <ArrowLeftRight className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Prioridad ID</p>
              <p className="text-xs font-black text-slate-800">{ticket.prioridad}</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center space-x-3 shadow-sm">
            <User className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Responsable Actual</p>
              <p className="text-xs font-black text-slate-800 truncate max-w-[120px]">
                {ticket.operador?.nombre?.split(" ")[0] || "Por asignar"}
              </p>
            </div>
          </div>
        </div>

        {/* CUERPO CENTRAL SCROLLABLE */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">
          
          {/* ================= PESTAÑA DE COMENTARIOS ================= */}
          {tabActiva === "comentarios" && (
            <div className="space-y-6">
              
              {/* INPUT PARA AGREGAR RESPUESTA AL PROCESO */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm flex items-end gap-3">
                <textarea
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder="Añadir una actualización o nota sobre el proceso..."
                  className="flex-1 text-xs bg-transparent border-none resize-none focus:outline-none placeholder-slate-400 text-slate-800 min-h-[40px] max-h-[120px]"
                />
                <button className="p-2 bg-[#6A1B29] hover:bg-[#54141F] text-white rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* LISTA DE COMENTARIOS VERTICAL */}
              <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-slate-200/60">
                {comentariosData.map((comentario: any) => {
                  const esSistema = comentario.tipo === "sistema";
                  return (
                    <div key={comentario.id} className="relative flex gap-3 items-start">
                      
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 z-10 shadow-sm border ${
                        esSistema 
                          ? "bg-slate-100 border-slate-300 text-slate-500" 
                          : "bg-amber-50 border-amber-200 text-amber-800"
                      }`}>
                        {comentario.avatar}
                      </div>

                      <div className={`flex-1 rounded-xl border p-3.5 shadow-sm ${
                        esSistema 
                          ? "bg-slate-50/80 border-slate-200/50" 
                          : "bg-white border-slate-200/80"
                      }`}>
                        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-800">{comentario.autor}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-slate-100 text-slate-600`}>
                              {comentario.rol}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">{comentario.fecha}</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${esSistema ? "text-slate-500 italic" : "text-slate-600 font-medium"}`}>
                          {comentario.mensaje}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= PESTAÑA DE HISTORIAL ================= */}
          {tabActiva === "historial" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-6">
                  Línea de tiempo de estatus
                </h4>
                
                <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200">
                  <div className="min-w-[850px] relative px-4">
                    <div className="absolute top-[38px] left-8 right-8 h-0.5 bg-slate-200 -z-0" />
                    
                    <div className="grid grid-cols-5 gap-2 relative z-10">
                      
                      {/* PENDIENTE */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-800 block">Pendiente</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{fechaCreacionStr}</span>
                        <span className="text-[10px] text-slate-500 italic block mt-0.5">Origen: {ticket.origen}</span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ring-1 ring-emerald-600/30 bg-emerald-600`}>
                          ✓
                        </div>
                      </div>

                      {/* ASIGNADO */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-800 block">Asignado</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{ticket.operador ? fechaCreacionStr : "—"}</span>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5 truncate max-w-[150px]">
                          {ticket.operador ? `Asignado a ${ticket.operador.nombre}` : "Esperando operador"}
                        </span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ${ticket.operador ? 'bg-emerald-600 ring-emerald-600/30' : 'bg-slate-300 ring-slate-300/30'}`}>
                          {ticket.operador ? "✓" : "•"}
                        </div>
                      </div>

                      {/* EN PROCESO */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-800 block">En proceso</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">—</span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ${ticket.estado === 'EN_PROCESO' ? 'bg-blue-600 animate-pulse ring-blue-600/30' : 'bg-slate-300'}`}>
                          •
                        </div>
                      </div>

                      {/* EN REVISION */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-800 block">En revisión</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">—</span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ${ticket.estado === 'EN_REVISION' ? 'bg-amber-500 animate-pulse ring-amber-500/30' : 'bg-slate-300'}`}>
                          •
                        </div>
                      </div>

                      {/* FINALIZADA */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-800 block">Finalizada</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">—</span>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ${ticket.estado === 'FINALIZADA' ? 'bg-emerald-600 ring-emerald-600/30' : 'bg-slate-300'}`}>
                          •
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER DEL MODAL */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <Link href={`/dashboard/ticket_report?id=${ticket.id}`}>
            <button className="bg-[#6A1B29] hover:bg-[#54141F] text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer">
              Ver reporte completo
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}