"use client";

import React, { useState, useEffect } from "react";
import { 
  X, Clock, ArrowLeftRight, User, Send 
} from "lucide-react";
import Link from "next/link";

// Mapeos de estilos dinámicos para mantener la consistencia visual de tu UI
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
  ticket: any | null; // ✨ Corregido: Permite null para eliminar la línea roja del componente padre
}

export default function ModalDetalleTicket({ isOpen, onClose, ticket }: ModalDetalleTicketProps) {
  const [tabActiva, setTabActiva] = useState<"comentarios" | "historial">("comentarios");
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [historial, setHistorial] = useState<any[]>([]);
  const [cargandoComentarios, setCargandoComentarios] = useState(false);
  const [cargandoHistorial, setCargandoHistorial] = useState(false);
  const [usuarioSesion, setUsuarioSesion] = useState<{ id: string; nombre: string; rol: string } | null>(null);

  // 1. Obtener la sesión del usuario de forma segura evitando "Unexpected end of JSON"
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => {
        if (!res.ok) return null;
        // 🛡️ Leemos como texto primero para validar que no venga vacío
        return res.text().then((text) => (text ? JSON.parse(text) : null));
      })
      .then((session) => {
        if (session?.user) {
          setUsuarioSesion({
            id: session.user.id,
            nombre: session.user.name || "Usuario",
            rol: (session.user as any).rol || "OPERADOR",
          });
        }
      })
      .catch((err) => console.error("Error al obtener sesión del usuario:", err));
  }, []);

  // 2. Cargar los comentarios reales desde el backend de NestJS al abrir el modal
  useEffect(() => {
    if (isOpen && ticket?.id) {
      setCargandoComentarios(true);
      fetch(`https://backend-moises.vercel.app//api/tickets/${ticket.id}/comentarios`)
        .then((res) => {
          if (!res.ok) throw new Error("Error en la respuesta del servidor");
          return res.json();
        })
        .then((data) => {
          setComentarios(data);
        })
        .catch((err) => {
          console.error("Error al cargar comentarios desde el backend:", err);
          // Fallback seguro si la API no responde
          setComentarios([
            {
              id: "fallback-initial",
              contenido: ticket.descripcion || "Actividad inicializada sin descripción adicional.",
              fechaCreacion: ticket.fechaCreacion || new Date().toISOString(),
              usuario: {
                nombre: ticket.operador?.nombre || "Sistema",
                rol: ticket.operador ? "OPERADOR" : "ADMIN"
              }
            }
          ]);
        })
        .finally(() => {
          setCargandoComentarios(false);
        });
    }
  }, [isOpen, ticket?.id, ticket?.descripcion, ticket?.fechaCreacion, ticket?.operador]);

  // 3. Cargar el historial desde el backend de NestJS
  useEffect(() => {
    if (isOpen && ticket?.id) {
      setCargandoHistorial(true);
      const primaryUrl = `https://backend-moises.vercel.app//api/tickets/${ticket.id}/historial`;
      const fallbackUrl = `https://backend-moises.vercel.app//api/tickets/${ticket.id}/comentarios/historial`;

      fetch(primaryUrl)
        .then(async (res) => {
          if (!res.ok) {
            console.warn(`Historial primary endpoint failed: ${res.status} ${res.statusText}`);
            const fallbackRes = await fetch(fallbackUrl);
            if (!fallbackRes.ok) {
              throw new Error(`Historial fallback failed: ${fallbackRes.status}`);
            }
            return fallbackRes.json();
          }
          return res.json();
        })
        .then((data) => setHistorial(data))
        .catch((err) => {
          console.error("Error al cargar historial:", err);
          setHistorial([]);
        })
        .finally(() => setCargandoHistorial(false));
    } else {
      setHistorial([]);
    }
  }, [isOpen, ticket?.id]);

  // 4. Enviar comentario respetando la sesión activa
 const handleEnviarComentario = async () => {
  if (!nuevoComentario.trim() || !ticket?.id) return;

  const autorId = usuarioSesion?.id;

  if (!autorId) {
    alert("Error: No se detectó un ID de usuario activo en tu sesión. Verifica los callbacks de NextAuth.");
    return;
  }

  try {
    const response = await fetch(`https://backend-moises.vercel.app//api/tickets/${ticket.id}/comentarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contenido: nuevoComentario,
        usuarioId: autorId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al guardar el comentario");
    }

    // 1. Obtener la respuesta directa del servidor NestJS
    const comentarioCreado = await response.json();
    
    // 2. Inyectar directamente al estado sin alterar las propiedades del usuario
    setComentarios((prev) => [...prev, comentarioCreado]);
    
    // 3. Limpiar el cuadro de texto
    setNuevoComentario("");
  } catch (err: any) {
    console.error("Error al enviar comentario:", err);
    alert(err.message || "Hubo un error al enviar tu comentario.");
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviarComentario();
    }
  };

  if (!isOpen || !ticket) return null;

  // Formateadores de fechas seguros
  const fechaCreacionStr = ticket.fechaCreacion 
    ? new Date(ticket.fechaCreacion).toLocaleDateString("es-MX", { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
    : "N/A";

  const fechaLimiteStr = ticket.fechaLimite 
    ? new Date(ticket.fechaLimite).toLocaleDateString("es-MX", { day: '2-digit', month: '2-digit', year: '2-digit' })
    : "Sin límite";

  const prioritizedInfo = mapPrioridades[ticket.prioridad] || { label: ticket.prioridad, style: "bg-slate-50 text-slate-600" };
  const estadoInfo = mapEstados[ticket.estado] || { label: ticket.estado, style: "bg-slate-50 text-slate-600" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {ticket.codigo || `TK-${String(ticket.id).padStart(3, '0')}`}
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${prioritizedInfo.style}`}>
                {prioritizedInfo.label}
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

        {/* METADATA */}
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

        {/* TABS */}
        <div className="px-6 pt-3 flex items-center space-x-6 border-b border-slate-100 text-xs font-bold">
          <button
            onClick={() => setTabActiva("comentarios")}
            className={`pb-2.5 relative transition-colors ${
              tabActiva === "comentarios" ? "text-[#6A1B29]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Comentarios ({comentarios.length})
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

        {/* INDICADORES */}
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

        {/* CUERPO CENTRAL */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">
          {tabActiva === "comentarios" && (
            <div className="space-y-6">
              
              {/* TEXTAREA INPUT */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm flex items-end gap-3">
                <textarea
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Añadir una actualización o nota sobre el proceso..."
                  className="flex-1 text-xs bg-transparent border-none resize-none focus:outline-none placeholder-slate-400 text-slate-800 min-h-[40px] max-h-[120px]"
                />
                <button 
                  onClick={handleEnviarComentario}
                  disabled={!nuevoComentario.trim()}
                  className={`p-2 rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm ${
                    nuevoComentario.trim() 
                      ? "bg-[#6A1B29] hover:bg-[#54141F] text-white" 
                      : "bg-slate-100 text-slate-300 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* LISTA DE COMENTARIOS */}
              <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-slate-200/60">
                {cargandoComentarios ? (
                  <div className="py-8 text-center text-xs text-slate-400 italic">
                    Cargando comentarios...
                  </div>
                ) : comentarios.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400 italic">
                    No hay comentarios aún en este ticket. ¡Escribe una nota para iniciar!
                  </div>
                ) : (
                  comentarios.map((comentario: any) => {
                    const esSistema = comentario.id === "fallback-initial" || comentario.usuarioId === "sistema";
                    const autorNombre = comentario.usuario?.nombre || "Sistema";
                    
                    const avatar = autorNombre
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase();

                    const esOperadorAsignado = ticket.operadorId === comentario.usuarioId;
                   const rolTexto = esOperadorAsignado
                      ? "OPERADOR ASIGNADO"
                      : (comentario.usuario?.rol === "ADMIN" ? "ADMINISTRADOR" : "OPERADOR");

                    const fechaFormateada = comentario.fechaCreacion
                      ? new Date(comentario.fechaCreacion).toLocaleDateString("es-MX", {
                          day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit"
                        })
                      : "—";

                    return (
                      <div key={comentario.id} className="relative flex gap-3 items-start animate-fade-in">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 z-10 shadow-sm border ${
                          esSistema ? "bg-slate-100 border-slate-300 text-slate-500" : "bg-amber-50 border-amber-200 text-amber-800"
                        }`}>
                          {avatar}
                        </div>

                        <div className={`flex-1 rounded-xl border p-3.5 shadow-sm ${
                          esSistema ? "bg-slate-50/80 border-slate-200/50" : "bg-white border-slate-200/80"
                        }`}>
                          <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-slate-800">{autorNombre}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border ${
                                esOperadorAsignado ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"
                              }`}>
                                {rolTexto}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium">{fechaFormateada}</span>
                          </div>
                          <p className={`text-xs leading-relaxed ${esSistema ? "text-slate-500 italic" : "text-slate-600 font-medium"}`}>
                            {comentario.contenido}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* HISTORIAL */}
        {tabActiva === "historial" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-6">
                Línea de tiempo de estatus
              </h4>
              
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200">
                <div className="flex items-start min-w-max px-4">
                  {/* Aquí mapeamos el historial real. Asegúrate que ticket.historial contenga 
                      la creación, las transferencias y cambios de estado en orden cronológico */}
                  {cargandoHistorial ? (
                    <div className="py-8 text-center text-xs text-slate-400 italic">
                      Cargando historial...
                    </div>
                  ) : historial.length > 0 ? (
                    historial.map((evento: any, index: number, arr: any[]) => {
                      const isLast = index === arr.length - 1;
                      return (
                        <div key={evento.id || index} className="relative flex flex-col items-center w-32">
                          {!isLast && (
                            <div className="absolute top-[68px] left-[50%] w-full h-0.5 bg-slate-200 -z-0" />
                          )}

                          <div className="text-center flex flex-col items-center">
                            <span className="text-[11px] font-bold text-slate-800 block">{evento.titulo}</span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                              {new Date(evento.fecha).toLocaleDateString("es-MX", { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="text-[9px] text-slate-500 italic block mt-0.5 max-w-[100px] truncate">
                              {evento.descripcion || ""}
                            </span>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm mt-3 border-4 border-white ${
                              isLast 
                                ? 'bg-blue-600 animate-pulse ring-1 ring-blue-600/30' 
                                : 'bg-emerald-600 ring-1 ring-emerald-600/30'
                            }`}>
                              {isLast ? "•" : "✓"}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400 italic">No hay registros históricos disponibles.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        </div>

        {/* FOOTER */}
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