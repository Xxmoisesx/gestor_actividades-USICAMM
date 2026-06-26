// app/dashboard/gestion/page.tsx
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/admin_dashboard"; // Nombre correcto
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const usuarioId = session?.user?.id;
  const rol = (session?.user as any)?.role === "ADMIN" ? "ADMIN" : "OPERADOR";
  
  // 1. Obtener actividades
  const actividades = await prisma.ticketActivity.findMany({
    include: { operador: { select: { nombre: true } } }
  });

  // 2. Obtener operadores (NECESARIO para que el select funcione)
  const listaOperadores = await prisma.user.findMany({
    where: { rol: "OPERADOR" }, // Ajusta según tu DB
    select: { id: true, nombre: true }
  });

  return (
    <div>
      {/* 3. Renderizamos el componente con el nombre correcto */}
      <AdminDashboard 
        rol={rol} 
        ticketsBaseDatos={actividades} 
        operadores={listaOperadores} // Pasamos la lista real
      />
    </div>
  );
}