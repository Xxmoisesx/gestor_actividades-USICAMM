import { auth } from "@/auth"; // Ajusta la ruta si tu auth está en otro lado
import { prisma } from "@/lib/prisma"; // Ajusta la ruta a tu instancia de Prisma
import AdministradorActividades from "@/components/admin_dashboard"; // Importamos tu nuevo componente

export default async function DashboardPage() {
  // 1. Obtenemos la sesión del usuario actual
  const session = await auth();
  const usuarioId = session?.user?.id;
  
  // 2. Definimos si es ADMIN u OPERADOR
  const rol = (session?.user as any)?.role === "ADMIN" ? "ADMIN" : "OPERADOR";
  
  // 3. Preparamos el filtro para Prisma según el rol
  let filtroActividades = {};
  
  if (rol === "OPERADOR") {
    // Si es operador, solo ve las actividades que le asignaron a él
    filtroActividades = {
      operador_id: usuarioId 
      // NOTA: Asegúrate de que "operador_id" sea el nombre correcto en tu schema de Prisma
    };
  }

  // 4. Traemos los datos reales de la base de datos
  const actividades = await prisma.activity.findMany({
    where: filtroActividades,
    orderBy: { creadoEn: 'desc' }, // Ajusta "creadoEn" según tu schema
  });

  return (
    <div>
      {/* 5. Rendereamos el componente visual pasándole los datos y el rol */}
      <AdministradorActividades rol={rol} ticketsBaseDatos={actividades} />
    </div>
  );
}