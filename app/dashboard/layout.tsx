"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarTitle from "@/components/NavbarTitle";
import { useSession, signOut } from "next-auth/react";
import { 
  Menu, 
  Home, 
  LayoutGrid, 
  List, 
  FilePlus, 
  FileText, 
  Users, 
  Bell, 
  Sliders, 
  LogOut,
  Search
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { data: session } = useSession();

  const nombreUsuario = session?.user?.name || "Usuario";
  
  // Aquí definimos si es Administrador u Operador basándonos en la sesión
  const rolUsuario = (session?.user as any)?.role === "ADMIN" ? "Administrador" : "Operador";

  // 1. Definimos todas las opciones posibles con sus roles permitidos
  const menuPrincipalCompleto = [
    { nombre: "Dashboard", ruta: "/dashboard", icono: Home, roles: ["Administrador", "Operador"] },
    { nombre: "Actividades", ruta: "/dashboard/gestion", icono: List, roles: ["Administrador", "Operador"] },
    { nombre: "Crear actividad", ruta: "/dashboard/crear", icono: FilePlus, roles: ["Administrador"] },
    { nombre: "Reportes", ruta: "/dashboard/reportes", icono: FileText, roles: ["Administrador"] },
    { nombre: "Usuarios", ruta: "/dashboard/usuarios", icono: Users, roles: ["Administrador"] },
  ];

  const menuInferiorCompleto = [
    { nombre: "Configuración", ruta: "/dashboard/configuracion", icono: Sliders, roles: ["Administrador"] },
  ];

  // 2. Filtramos los menús para que solo contengan las rutas permitidas para el rol actual
  const menuPrincipal = menuPrincipalCompleto.filter(item => item.roles.includes(rolUsuario));
  const menuInferior = menuInferiorCompleto.filter(item => item.roles.includes(rolUsuario));

  return (
    <div className="flex h-screen bg-[#6A1B29] font-sans overflow-hidden">
      
      {/* ==========================================
          BARRA LATERAL (GUINDA)
          ========================================== */}
      <aside 
        className={`${isSidebarOpen ? "w-[280px]" : "w-20"} flex flex-col transition-all duration-300 ease-in-out shrink-0 text-white`}
      >
        <div className="h-24 flex items-center justify-between px-5">
          <div className={`flex items-center overflow-hidden transition-all duration-300 ${isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
            <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold">MX</span>
            </div>
            <div className="flex flex-col ml-3 whitespace-nowrap">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-wide">SEP</span>
                <span className="text-sm font-light text-white/50">|</span>
                <span className="text-sm font-semibold">USICAMM</span>
              </div>
              <span className="text-[8px] tracking-[0.2em] text-white/70">GOBIERNO DE MÉXICO</span>
            </div>
          </div>

          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0 ${!isSidebarOpen && "mx-auto"}`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 flex flex-col justify-between">
          <nav className="space-y-1 px-3">
            {/* Renderizamos el menú principal ya filtrado */}
            {menuPrincipal.map((item) => {
              const activo = pathname === item.ruta;
              return (
                <Link 
                  key={item.nombre} 
                  href={item.ruta}
                  className={`flex items-center px-3 py-3.5 rounded-xl transition-all group ${
                    activo ? "text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  title={!isSidebarOpen ? item.nombre : ""}
                >
                  <item.icono className={`w-5 h-5 shrink-0 ${activo ? "text-white" : "text-white/70 group-hover:text-white"}`} />
                  <span className={`ml-4 text-[15px] font-medium whitespace-nowrap transition-all duration-300 ${
                    isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  }`}>
                    {item.nombre}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="px-3 pb-6">
            <nav className="space-y-1 mb-6 border-t border-white/10 pt-6">
              {/* Renderizamos el menú inferior ya filtrado. Si está vacío, no mostrará nada en esta sección */}
              {menuInferior.map((item) => (
                <Link 
                  key={item.nombre} 
                  href={item.ruta}
                  className="flex items-center px-3 py-3.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all group"
                  title={!isSidebarOpen ? item.nombre : ""}
                >
                  <item.icono className="w-5 h-5 shrink-0" />
                  <span className={`ml-4 text-[15px] font-medium whitespace-nowrap transition-all duration-300 ${
                    isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  }`}>
                    {item.nombre}
                  </span>
                </Link>
              ))}
            </nav>

            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center px-3 py-3.5 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
              title={!isSidebarOpen ? "Cerrar sesión" : ""}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className={`ml-4 text-[15px] font-medium whitespace-nowrap transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              }`}>
                Cerrar sesión
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* ==========================================
          CONTENEDOR PRINCIPAL BLANCO (CON CURVA)
          ========================================== */}
      <div className="flex-1 flex flex-col bg-slate-50 rounded-tl-[2.5rem] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] overflow-hidden min-w-0 transition-all duration-300">
        
        {/* NAVBAR SUPERIOR CON BUSCADOR Y PERFIL */}
        <header className="h-24 bg-white flex items-center justify-between px-10 shrink-0 border-b border-gray-100">
          <NavbarTitle/>

          {/* Grupo Derecho: Buscador, Campana y Perfil */}
          <div className="flex items-center gap-6">
            
            {/* Buscador */}
            <div className="relative flex items-center w-[300px]">
              <input 
                type="text" 
                placeholder="Buscar actividades, tickets..." 
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#6A1B29] focus:border-[#6A1B29] transition-all"
              />
              <Search className="w-4 h-4 text-gray-500 absolute right-4" />
            </div>

            {/* Campana de Notificaciones */}
            <button className="relative p-2 text-[#6A1B29] hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-6 h-6" />
            </button>

            {/* Perfil de Usuario */}
            <div className="flex items-center gap-3">
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt={nombreUsuario} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#6A1B29] text-white flex items-center justify-center font-bold text-sm border border-white/20 shadow-sm shrink-0 uppercase">
                  {nombreUsuario.split(" ").map(n => n[0]).join("").substring(0, 2)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-700 leading-tight capitalize">{nombreUsuario.toLowerCase()}</span>
                <span className="text-xs text-gray-400 font-medium">{rolUsuario}</span>
              </div>
            </div>

          </div>
        </header>

        {/* ÁREA DE CONTENIDO */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-10">
          {children}
        </main>
      </div>

    </div>
  );
}