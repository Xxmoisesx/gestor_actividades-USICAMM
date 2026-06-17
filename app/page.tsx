"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  
  // Tu lógica y estados originales
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Estados visuales de la maqueta
  const [metodo, setMetodo] = useState<"correo" | "celular">("correo");
  const [verContrasena, setVerContrasena] = useState(false);

  const mánagerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const res = await signIn("credentials", {
        correo, // Se sigue mandando este valor como identificador
        contrasena,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 antialiased">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl flex flex-col items-center">
        
        {/* LOGO E IDENTIDAD INSTITUTIONAL */}
        <div className="mb-6 w-full text-center flex flex-col items-center">
          <div className="text-[#6A1B29] font-black text-xs tracking-widest uppercase mb-1">
            Gobierno de México
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Iniciar sesión
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ingresa con tu correo electrónico o número de celular
          </p>
        </div>

        {/* SELECTOR DE MÉTODO (ESTILO MAQUETA) */}
        <div className="w-full grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setMetodo("correo")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              metodo === "correo"
                ? "bg-[#6A1B29] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Correo electrónico
          </button>
          <button
            type="button"
            onClick={() => setMetodo("celular")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              metodo === "celular"
                ? "bg-[#6A1B29] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Número de celular
          </button>
        </div>

        {/* FORMULARIO ACTIVO */}
        <form onSubmit={mánagerSubmit} className="w-full space-y-4">
          
          {/* MENSAJE DE ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-medium text-center shadow-sm">
              {error}
            </div>
          )}

          {/* INPUT DINÁMICO (CORREO O CELULAR) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {metodo === "correo" ? "Correo electrónico" : "Número de celular"}
            </label>
            <input 
              type={metodo === "correo" ? "email" : "text"} 
              placeholder={metodo === "correo" ? "ejemplo@correo.gob.mx" : "5512345678"} 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              disabled={cargando}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6A1B29] focus:ring-1 focus:ring-[#6A1B29] transition-all disabled:opacity-50"
            />
          </div>
          
          {/* INPUT CONTRASEÑA CON BOTÓN DE OJO */}
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
                required
                disabled={cargando}
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

          {/* OLVIDASTE CONTRASEÑA */}
          <div className="text-right">
            <a href="#recuperar" className="text-[11px] font-bold text-[#6A1B29] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* BOTÓN PRINCIPAL ACCEDER */}
          <button 
            type="submit" 
            disabled={cargando} 
            className="w-full py-2.5 bg-[#6A1B29] hover:bg-[#541420] text-white font-bold text-xs rounded-xl shadow-md shadow-red-900/10 transition-all cursor-pointer disabled:opacity-50"
          >
            {cargando ? "Accediendo..." : "Iniciar sesión"}
          </button>
        </form>
        {/* ENLACE DE REGISTRO PRESERVANDO TU ENRUTAMIENTO REAL */}
        <div className="mt-6 text-xs text-slate-500">
          ¿No tienes una cuenta?{" "}
          <Link href="/registros" className="font-bold text-[#6A1B29] hover:underline">
            Regístrate aquí
          </Link>
        </div>

      </div>
    </div>
  );
}