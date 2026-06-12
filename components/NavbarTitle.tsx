"use client";

import { usePathname } from "next/navigation";

// Diccionario para mapear las rutas con los nombres que quieres mostrar
const nombresRutas: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/gestion": "Gestión de Actividades",
  "/dashboard/crear": "Crear Actividad",
  "/dashboard/reportes": "Reportes generales",
  "/dashboard/usuarios": "Usuarios",
  "/dashboard/configuracion": "Configuración",
};

export default function NavbarTitle() {
  const pathname = usePathname();

  // 1. Intentar obtener el nombre exacto del diccionario
  let titulo = nombresRutas[pathname];

  // 2. Manejo de rutas dinámicas (por ejemplo: /dashboard/tickets/[id])
  if (!titulo) {
    if (pathname.startsWith("/dashboard/tickets/")) {
      titulo = "Detalle del Ticket";
    } else {
      titulo = "Panel de Control"; // Título por defecto si no coincide ninguna
    }
  }

  return (
    <h1 className="text-[26px]  text-lg  font-black text-slate-800 tracking-tight transition-all duration-200">
      {titulo}
    </h1>
  );
}