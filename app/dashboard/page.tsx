import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OperatorDashboard from "@/components/dashboard_operador"; // Asegúrate de que la ruta sea correcta

export default async function DashboardPage() {
  const session = await auth();
  const usuarioId = session?.user?.id;
  
  // Aquí usamos "ADMIN" o "OPERADOR" dependiendo de tu lógica de sesión
  const rol = (session?.user as any)?.role === "ADMIN" ? "ADMIN" : "OPERADOR";

  const filtroActividades = rol === "ADMIN" 
    ? {} 
    : { id: usuarioId }; 

  // Consultamos a la base de datos
  const actividades = await prisma.activity.findMany({
    where: filtroActividades,
    orderBy: { creadoEn: 'desc' },
    // IMPORTANTE: Si necesitas el nombre de la persona asignada, debes incluir la relación
    // include: { asignadoA: true } 
  });

  return (
    <div>
      {/* Pasamos los datos reales al componente visual */}
      <OperatorDashboard ticketsBaseDatos={actividades} />
    </div>
  );
}