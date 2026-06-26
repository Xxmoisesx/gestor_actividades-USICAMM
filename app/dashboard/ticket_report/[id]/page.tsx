// app/dashboard/ticket_report/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Rol } from "@prisma/client";
import ModalDetalleTicket from "@/components/ModalDetalleTicket";

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

  return (
    <div className="p-6">
      {/* Pasamos los datos reales de la BD al componente que pinta la interfaz */}
      <ModalDetalleTicket ticket={ticket} isOpen={true} onClose={() => {}} />
    </div>
  );
}