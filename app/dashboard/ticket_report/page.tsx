"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, ArrowRightLeft, Pencil, Clock, Info, 
  User, RefreshCw, CheckCircle2, Circle, X 
} from "lucide-react";

export default function DetalleTicketPage() {
  const [tabActiva, setTabActiva] = useState("historial");
  
  // Estados para controlar el modal flotante de transferencia
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedResponsable, setSelectedResponsable] = useState("");
  const [motivoTransferencia, setMotivoTransferencia] = useState("");

  // Mock data basado exactamente en tu maqueta
  const transferenciasData = [
    { id: "1", anterior: "Juan Pérez", nuevo: "María López", fecha: "16/05/2024 11:05", tiempo: "2h 5m", color: "bg-[#541420]", motivo: "El ticket corresponde a otra área" },
    { id: "2", anterior: "María López", nuevo: "Carlos Ramírez", fecha: "16/05/2024 15:20", tiempo: "4h 15m", color: "bg-amber-600", motivo: "Requiere atención especializada" },
    { id: "-", anterior: "Carlos Ramírez", nuevo: "-", fecha: "16/05/2024 16:45", tiempo: "1h 25m", color: "bg-emerald-700", motivo: "En proceso de solución" },
  ];

  const timelineEstatus = [
    { titulo: "Pendiente", fecha: "16/05/2024 09:00", desc: "Sistema", tipo: "check" },
    { titulo: "Asignado", fecha: "16/05/2024 09:00", desc: "Sistema - Asignado a Juan Pérez", tipo: "blue" },
    { titulo: "En proceso", fecha: "16/05/2024 09:15", desc: "Juan Pérez", tipo: "blue" },
    { titulo: "Transferido", fecha: "16/05/2024 11:05", desc: "Juan Pérez → María López", tipo: "amber" },
    { titulo: "En proceso", fecha: "16/05/2024 11:05", desc: "María López", tipo: "blue" },
    { titulo: "Transferido", fecha: "16/05/2024 15:20", desc: "María López → Carlos Ramírez", tipo: "amber" },
    { titulo: "En proceso", fecha: "16/05/2024 15:20", desc: "Carlos Ramírez", tipo: "blue" },
    { titulo: "En revisión", fecha: "16/05/2024 16:45", desc: "Carlos Ramírez", tipo: "check" },
  ];

  const handleTransferirSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de tu base de datos posteriormente
    console.log("Transfiriendo a:", selectedResponsable, "Motivo:", motivoTransferencia);
    
    // Resetear formulario y cerrar modal
    setSelectedResponsable("");
    setMotivoTransferencia("");
    setIsTransferModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 text-slate-800 antialiased">
      
      {/* BOTÓN VOLVER */}
      <div className="mb-5">
        <button className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al listado</span>
        </button>
      </div>

      {/* ENCABEZADO PRINCIPAL DEL TICKET */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Ticket #TK-2024-00125</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-600 border border-red-100">
              Alta prioridad
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Falla en acceso al sistema de evaluación docente
          </p>
        </div>

        {/* ACCIONES DEL TICKET */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsTransferModalOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-amber-600/40 text-amber-800 hover:bg-amber-50 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm bg-white"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Transferir ticket</span>
          </button>
        </div>
      </div>

      {/* GRILLA DE INFORMACIÓN METADATA */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6 text-xs">
        <div>
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Fecha de creación</p>
          <p className="text-slate-700 font-bold mt-1">16/05/2024 09:00</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Origen</p>
          <p className="text-slate-700 font-bold mt-1">Plataforma de Quejas</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Estatus actual</p>
          <span className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-blue-600 font-bold border border-blue-100 mt-1">
            En proceso
          </span>
        </div>
        <div>
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Asignado a</p>
          <p className="text-slate-700 font-bold mt-1">María López</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Fecha límite</p>
          <p className="text-slate-700 font-bold mt-1">24/05/2024</p>
        </div>
      </div>

      {/* PESTAÑAS (TABS) */}
      <div className="flex items-center space-x-6 border-b border-slate-200 mb-6 overflow-x-auto scrollbar-none text-xs font-bold">
        {["Información general", "Comentarios (3)", "Archivos (2)", "Historial", "Bitácora"].map((tab) => {
          const val = tab.toLowerCase().split(" ")[0];
          const esActiva = tabActiva === val || (val === "historial" && tabActiva === "historial");
          return (
            <button
              key={tab}
              onClick={() => setTabActiva(val)}
              className={`pb-3 transition-all relative ${
                esActiva ? "text-[#6A1B29]" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab}
              {esActiva && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6A1B29]" />}
            </button>
          );
        })}
      </div>

      {/* CONTENIDO DE LA PESTAÑA HISTORIAL */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <h3 className="text-sm font-bold text-slate-800">Historial de responsables (transferencias)</h3>
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* TARJETAS RESUMEN KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex items-center space-x-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tiempo total</p>
                  <p className="text-sm font-black text-slate-800">7h 45m</p>
                </div>
              </div>
              <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex items-center space-x-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ArrowRightLeft className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Transferencias</p>
                  <p className="text-sm font-black text-slate-800">2</p>
                </div>
              </div>
              <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><User className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Responsable actual</p>
                  <p className="text-sm font-black text-slate-800">María López</p>
                </div>
              </div>
              <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex items-center space-x-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><RefreshCw className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estatus actual</p>
                  <p className="text-sm font-black text-blue-600">En proceso</p>
                </div>
              </div>
            </div>

            {/* DIAGRAMA DE RECORRIDO EN EL TIEMPO */}
            <div className="overflow-x-auto border border-slate-100 rounded-xl p-4 bg-slate-50/30">
              <div className="min-w-[600px] text-[11px]">
                <div className="grid grid-cols-9 border-b border-slate-100 pb-2 text-slate-400 font-bold text-center">
                  <div className="text-left font-bold text-slate-500">Responsable</div>
                  <div>09:00</div><div>10:00</div><div>11:00</div><div>12:00</div><div>13:00</div><div>14:00</div><div>16:00</div><div>17:00</div>
                </div>

                <div className="space-y-4 pt-4 relative">
                  <div className="grid grid-cols-9 items-center min-h-[40px]">
                    <div className="font-bold text-slate-700">Juan Pérez</div>
                    <div className="col-span-2 relative">
                      <div className="bg-[#6A1B29] text-white p-2 rounded-xl text-center font-bold text-[10px] shadow-sm">
                        09:00 - 11:05 <span className="block opacity-80 font-normal">2h 5m</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-9 items-center min-h-[40px]">
                    <div className="font-bold text-slate-700">María López</div>
                    <div className="col-span-2"></div>
                    <div className="col-span-3">
                      <div className="bg-amber-500 text-white p-2 rounded-xl text-center font-bold text-[10px] shadow-sm">
                        11:05 - 15:20 <span className="block opacity-80 font-normal">4h 15m</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-9 items-center min-h-[40px]">
                    <div className="font-bold text-slate-700">Carlos Ramírez</div>
                    <div className="col-span-5"></div>
                    <div className="col-span-2">
                      <div className="bg-emerald-600 text-white p-2 rounded-xl text-center font-bold text-[10px] shadow-sm">
                        15:20 - 16:45 <span className="block opacity-80 font-normal">1h 25m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLA DE DETALLE DE TRANSFERENCIAS */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Detalle de transferencias</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <th className="p-3.5 w-12 text-center">#</th>
                    <th className="p-3.5">Responsable anterior</th>
                    <th className="p-3.5">Responsable nuevo</th>
                    <th className="p-3.5">Fecha y hora</th>
                    <th className="p-3.5">Tiempo con el ticket</th>
                    <th className="p-3.5">Motivo de transferencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  {transferenciasData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-3.5 text-center font-bold text-slate-400">{row.id}</td>
                      <td className="p-3.5 font-bold text-slate-800">{row.anterior}</td>
                      <td className="p-3.5 font-bold text-slate-800">{row.nuevo}</td>
                      <td className="p-3.5 text-slate-500">{row.fecha}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 text-[10px] font-bold text-white rounded-full ${row.color}`}>
                          {row.tiempo}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 max-w-xs truncate" title={row.motivo}>
                        {row.motivo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-5 pb-2 border-b border-slate-100">
            Línea de tiempo de estatus
          </h3>

          <div className="relative border-l border-slate-200 ml-2.5 pl-5 space-y-6 text-xs">
            {timelineEstatus.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[27px] top-0.5 bg-white rounded-full p-0.5">
                  {item.tipo === "check" && <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-white" />}
                  {item.tipo === "blue" && <Circle className="w-4 h-4 text-blue-600 fill-blue-600" />}
                  {item.tipo === "amber" && <Circle className="w-4 h-4 text-amber-500 fill-amber-500" />}
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-[13px]">{item.titulo}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{item.fecha}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= MODAL FLOTANTE DE TRANSFERENCIA ================= */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
            
            {/* Cabecera del Modal */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-800">
                <ArrowRightLeft className="w-4 h-4 text-[#6A1B29]" />
                <h3 className="text-sm font-black tracking-tight uppercase">Transferir Ticket</h3>
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
                
                {/* Info del Responsable Actual */}
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs">
                  <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Responsable en turno</p>
                  <p className="text-slate-700 font-bold mt-0.5">María López (Operador - Soporte)</p>
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