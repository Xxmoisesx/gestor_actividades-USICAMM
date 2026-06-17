"use client";

import React, { useState } from "react";
import { 
  X, Clock, ArrowLeftRight, User, Send 
} from "lucide-react";
import Link from "next/link";

interface ModalDetalleTicketProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId?: string;
}

export default function ModalDetalleTicket({ isOpen, onClose, ticketId = "TK-001" }: ModalDetalleTicketProps) {
  // Estado para controlar qué pestaña interna del modal se muestra
  const [tabActiva, setTabActiva] = useState<"comentarios" | "historial">("comentarios");
  const [nuevoComentario, setNuevoComentario] = useState("");

  if (!isOpen) return null;

  // Datos simulados de los comentarios con la propiedad corregida 'tipo'
  const comentariosData = [
    {
      id: 1,
      autor: "Alejandra Rosas",
      rol: "Administradora",
      fecha: "16/05/2026 10:30 AM",
      avatar: "AR",
      mensaje: "Se reporta que no tienen acceso para entrar a la plataforma de evaluación en Proyecto Venus. Se prioriza como Alta debido a la jornada de evaluación activa.",
      tipo: "usuario"
    },
    {
      id: 2,
      autor: "Sistema USICAMM",
      rol: "Automatización",
      fecha: "16/05/2026 11:05 AM",
      avatar: "SYS",
      mensaje: "Ticket transferido automáticamente a la célula de Soporte Técnico (Operador asignado: María López) por balanceo de carga.",
      tipo: "sistema"
    },
    {
      id: 3,
      autor: "María López",
      rol: "Operador - Soporte",
      fecha: "16/05/2026 01:15 PM",
      avatar: "ML",
      mensaje: "Revisando logs del servidor. Se detectó una caída intermitente en la base de datos de Proyecto Venus. Escalando al especialista para el reinicio de servicios.",
      tipo: "usuario"
    },
    {
      id: 4,
      autor: "Carlos Ramírez",
      rol: "Operador - Especialista",
      fecha: "16/05/2026 03:20 PM",
      avatar: "CR",
      mensaje: "Servicios restablecidos de forma exitosa. Se reinició el contenedor de autenticación. Monitoreando comportamiento en producción.",
      tipo: "usuario"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* CONTENEDOR DEL MODAL FLOTANTE */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER DEL MODAL */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{ticketId}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100">
                Alta
              </span>
              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[11px] font-bold border border-blue-100">
                En revisión
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800 mt-2">
              Caída de sistema en proyecto venus
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Se reporta que no tienen acceso para entrar a la plataforma
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* METADATA / BADGES SUPERIORES */}
        <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px]">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Asignado a</p>
            <p className="text-slate-700 font-bold mt-0.5">Alejandra Rosas</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Fecha de creación</p>
            <p className="text-slate-700 font-bold mt-0.5">16/05/26 10:30</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Fecha Límite</p>
            <p className="text-slate-700 font-bold mt-0.5">20/05/26</p>
          </div>
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Origen</p>
            <p className="text-slate-700 font-bold mt-0.5">Tickets</p>
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
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Tiempo Total</p>
              <p className="text-xs font-black text-slate-800">7h 45m</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center space-x-3 shadow-sm">
            <ArrowLeftRight className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Transferencias</p>
              <p className="text-xs font-black text-slate-800">2</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center space-x-3 shadow-sm">
            <User className="w-4 h-4 text-slate-400" />
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Responsable Actual</p>
              <p className="text-xs font-black text-slate-800">Carlos Ramírez</p>
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

              {/* LISTA DE COMENTARIOS VERTICAL (PROCESO) */}
              <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-slate-200/60">
                {comentariosData.map((comentario) => {
                  const esSistema = comentario.tipo === "sistema";
                  return (
                    <div key={comentario.id} className="relative flex gap-3 items-start">
                      
                      {/* CÍRCULO / AVATAR */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 z-10 shadow-sm border ${
                        esSistema 
                          ? "bg-slate-100 border-slate-300 text-slate-500" 
                          : "bg-amber-50 border-amber-200 text-amber-800"
                      }`}>
                        {comentario.avatar}
                      </div>

                      {/* BURBUJA DE COMENTARIO */}
                      <div className={`flex-1 rounded-xl border p-3.5 shadow-sm ${
                        esSistema 
                          ? "bg-slate-50/80 border-slate-200/50" 
                          : "bg-white border-slate-200/80"
                      }`}>
                        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-800">{comentario.autor}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                              esSistema 
                                ? "bg-slate-200 text-slate-500" 
                                : comentario.rol.includes("Administradora")
                                ? "bg-red-50 text-[#6A1B29] border border-red-100"
                                : "bg-blue-50 text-blue-600 border border-blue-100"
                            }`}>
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
              {/* CONTENEDOR DE LA LÍNEA DE TIEMPO HORIZONTAL */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-6">
                  Línea de tiempo de estatus
                </h4>
                
                {/* Contenedor con scroll horizontal */}
                <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200">
                  <div className="min-w-[850px] relative px-4">
                    
                    {/* LÍNEA CONECTORA DE FONDO */}
                    <div className="absolute top-[38px] left-8 right-8 h-0.5 bg-slate-200 -z-0" />
                    
                    {/* GRILLA DE PASOS */}
                    <div className="grid grid-cols-5 gap-2 relative z-10">
                      
                      {/* PASO 1 */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-800 block">Pendiente</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">16/05/2026 09:00</span>
                        <span className="text-[10px] text-slate-500 italic block mt-0.5">Sistema</span>
                        <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ring-1 ring-emerald-600/30">
                          ✓
                        </div>
                      </div>

                      {/* PASO 2 */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-800 block">Asignado</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">16/05/2026 09:00</span>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Sistema asignó Juan Pérez</span>
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ring-1 ring-blue-600/30">
                          •
                        </div>
                      </div>

                      {/* PASO 3 */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-800 block">En proceso</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">16/05/2026 09:15</span>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Juan Pérez</span>
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ring-1 ring-blue-600/30">
                          •
                        </div>
                      </div>

                      {/* PASO 4 */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-800 block">Transferido</span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">16/05/2026 11:15</span>
                        <span className="text-[10px] text-slate-600 font-bold block mt-0.5">Juan Pérez → María López</span>
                        <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ring-1 ring-amber-500/30">
                          ◆
                        </div>
                      </div>

                      {/* PASO 5 */}
                      <div className="text-center flex flex-col items-center">
                        <span className="text-[11px] font-black text-[#6A1B29] block">En revisión</span>
                        <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">16/05/2026 16:45</span>
                        <span className="text-[10px] text-slate-700 font-bold block mt-0.5">Carlos Ramírez</span>
                        <div className="w-5 h-5 rounded-full bg-[#6A1B29] flex items-center justify-center text-white text-[10px] shadow-md mt-3 border-4 border-white ring-2 ring-[#6A1B29]/40 animate-pulse">
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
          <Link href="/dashboard/ticket_report">
            <button className="bg-[#6A1B29] hover:bg-[#54141F] text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer">
              Detalles
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}