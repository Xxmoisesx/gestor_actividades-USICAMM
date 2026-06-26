// app/dashboard/ticket_report/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Rol } from "@prisma/client";
import DetalleTicketVista/ModalDetalleTicket from "@/components/ModalDetalleTicket"; // Revisa cómo se llama tu archivo de diseño gráfico

interface Props {
  params: { id: string };
}

export default async function DetalleTicketPage({ params }: Props) {
  // Convertir el ID de la URL a número entero (PostgreSQL/MySQL Int)
  const ticketId = parseInt(params.id);
  if (isNaN(ticketId)) notFound();

  // 1. Consulta real a la Base de Datos con todas las relaciones de tu esquema
  const ticket = await prisma.ticketActivity.findUnique({
    where: { id: ticketId },
    include: {
      prioridad: true,      // Relación al modelo Priority
      operador: true,       // Usuario asignado actualmente (antes asignadoA)
      transferencias: {
        include: { 
          origenUsuario: true,  // Usuario que transfiere
          destinoUsuario: true  // Usuario que recibe
        },
        orderBy: { fechaInicio: "asc" }
      },
      historialEventos: {   // Tu tabla de auditoría/logs (antes historialEstatus)
        orderBy: { creadoEn: "desc" }
      }
    }
  });

  // Si el ID no existe en la base de datos, Next.js muestra la página 404
  if (!ticket) notFound();

  // 2. Traer los operadores disponibles para cuando se quiera transferir el ticket en esta página
  const operadores = await prisma.user.findMany({
    where: { 
      rol: Rol.OPERADOR, 
      id: { not: ticket.operadorId } // Excluir al operador que ya lo tiene asignado
    }
  });

  return (
    <div className="p-6">
      {/* Pasamos los datos reales de la BD al componente que pinta la interfaz */}
      <ModalDetalleTicket ticket={ticket} operadores={operadores} />
    </div>
  );
}