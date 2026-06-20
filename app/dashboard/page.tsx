import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OperatorDashboard from "@/components/dashboard_operador"; // Asegúrate de que la ruta sea correcta

export default async function DashboardPage() {
  const session = await auth();
  const usuarioId = session?.user?.id;
  
  // Aquí usamos "ADMIN" o "OPERADOR" dependiendo de tu lógica de sesión
 const filtroActividades = (session?.user as any)?.role == "ADMIN"
  ? {} 
  : { operadorId: usuarioId };

// CONSULTAMOS A LA BASE DE DATOS
const actividades = await prisma.ticketActivity.findMany({
  where: filtroActividades,
  orderBy: { fechaCreacion: 'desc' },
  include: {
    operador: true, // Esto resolverá que se vea el nombre del asignado
  },
});

  return (
    <div>
      {/* Pasamos los datos reales al componente visual */}
      <OperatorDashboard ticketsBaseDatos={actividades} />
    </div>
  );
}