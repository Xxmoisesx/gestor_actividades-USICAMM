"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registrarUsuario } from "./action"; // Importación original preservada
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegistroPage() {
  const router = useRouter();
  
  // Tus estados originales
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);

  // Estado visual para ocultar/mostrar contraseña
  const [verContrasena, setVerContrasena] = useState(false);

  const handleRegistroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setExito("");
    setCargando(true);

    // Ejecutamos tu acción del servidor original
    const resultado = await registrarUsuario({ nombre, correo, contrasena, telefono });

    if (resultado?.error) {
      setError(resultado.error);
      setCargando(false);
    } else {
      setExito("¡Usuario registrado con éxito! Redirigiendo al inicio...");
      
      // Esperamos 2 segundos para que el usuario vea el mensaje de éxito y lo mandamos al login
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 antialiased">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl flex flex-col items-center">
        
        {/* LOGO E IDENTIDAD INSTITUCIONAL */}
        <div className="mb-6 w-full text-center flex flex-col items-center">
          <div className="text-[#6A1B29] font-black text-xs tracking-widest uppercase mb-1">
            Gobierno de México
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Crear cuenta
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Regístrate en el Gestor de Actividades - USICAMM
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleRegistroSubmit} className="w-full space-y-4">
          
          {/* MENSAJE DE ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-medium text-center shadow-sm">
              {error}
            </div>
          )}

          {/* MENSAJE DE ÉXITO */}
          {exito && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-xl font-medium text-center shadow-sm">
              {exito}
            </div>
          )}

          {/* INPUT: NOMBRE COMPLETO */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Nombre Completo
            </label>
            <input 
              type="text" 
              placeholder="Juan Pérez" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={cargando}
              required
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6A1B29] focus:ring-1 focus:ring-[#6A1B29] transition-all disabled:opacity-50"
            />
          </div>

          {/* INPUT: CORREO ELECTRÓNICO */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              placeholder="ejemplo@correo.com" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={cargando}
              required
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6A1B29] focus:ring-1 focus:ring-[#6A1B29] transition-all disabled:opacity-50"
            />
          </div>

          {/* INPUT: TELÉFONO */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Teléfono
            </label>
            <input 
              type="text" 
              placeholder="55 1234 5678" 
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              disabled={cargando}
              required
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6A1B29] focus:ring-1 focus:ring-[#6A1B29] transition-all disabled:opacity-50"
            />
          </div>
          
          {/* INPUT: CONTRASEÑA CON BOTÓN DE OJO */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Contraseña
            </label>
            <div className="relative">
              <input 
                type={verContrasena ? "text" : "password"} 
                placeholder="••••••••" 
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                disabled={cargando}
                required
                className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6A1B29] focus:ring-1 focus:ring-[#6A1B29] transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setVerContrasena(!verContrasena)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {verContrasena ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* BOTÓN PRINCIPAL REGISTRAR */}
          <button 
            type="submit" 
            disabled={cargando} 
            className="w-full mt-2 py-2.5 bg-[#6A1B29] hover:bg-[#541420] text-white font-bold text-xs rounded-xl shadow-md shadow-red-900/10 transition-all cursor-pointer disabled:opacity-50"
          >
            {cargando ? "Registrando..." : "Registrar Usuario"}
          </button>
        </form>

        {/* ENLACE DE REGRESO AL LOGIN */}
        <div className="mt-6 text-xs text-slate-500 text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/" className="font-bold text-[#6A1B29] hover:underline">
            Inicia sesión aquí
          </Link>
        </div>

      </div>
    </div>
  );
}