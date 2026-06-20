import { auth } from "@/auth"; // Ajusta la ruta si tu auth está en otro lado
import { prisma } from "@/lib/prisma"; // Ajusta la ruta a tu instancia de Prisma
import AdministradorActividades from "@/components/admin_dashboard"; 
// Importamos tu nuevo componente

export default async function DashboardPage() {
  // 1. Obtenemos la sesión del usuario actual
  const session = await auth();
  const usuarioId = session?.user?.id;
  
  // 2. Definimos si es ADMIN u OPERADOR
  const rol = (session?.user as any)?.role === "ADMIN" ? "ADMIN" : "OPERADOR";
  
  // 3. Preparamos el filtro para Prisma según el rol
  let filtroActividades = {};
  // app/dashboard/gestion/page.tsx (o donde consultes las actividades para esta tabla)

const actividades = await prisma.ticketActivity.findMany({
  // si tienes filtros where aquí, se mantienen
  orderBy: { 
    fechaCreacion: 'desc' 
  },
  include: {
    operador: {
      select: {
        nombre: true // 👈 Traemos explícitamente el nombre del operador asignado
      }
    }
  }
});
  
  if (rol === "OPERADOR") {
    // Si es operador, solo ve las actividades que le asignaron a él
    filtroActividades = {
      operadorId: usuarioId 
      // NOTA: Asegúrate de que "operador_id" sea el nombre correcto en tu schema de Prisma
    };
  }

  

  return (
    <div>
      {/* 5. Rendereamos el componente visual pasándole los datos y el rol */}
      <AdministradorActividades rol={rol} ticketsBaseDatos={actividades} />
    </div>
  );
}