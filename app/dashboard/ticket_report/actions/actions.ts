"use server";

import { prisma } from "@/lib/prisma"; // Asegúrate de importar correctamente tu instancia de prisma
import { EstadoTicket } from "@prisma/client";

export async function transferirTicketAction(formData: {
  ticketId: string | number;
  nuevoResponsableId: string;
  motivo: string;
}) {
  try {
    // 1. Convertir el ID a número (ya que en tu Prisma es un Int autoincrementable)
    const idTicket = Number(formData.ticketId);

    // 2. Obtener los datos actuales del ticket
    const ticketActual = await prisma.ticketActivity.findUnique({
      where: { id: idTicket },
      include: {
        transferencias: {
          orderBy: { fechaInicio: 'desc' }, // ✅ Corregido: 'fecha' -> 'fechaInicio'
          take: 1,
        },
      },
    });

    if (!ticketActual) throw new Error("Ticket no encontrado");

    const anteriorResponsableId = ticketActual.operadorId; // ✅ Corregido: 'asignadoId' -> 'operadorId'

    // 3. Calcular minutos transcurridos desde el último cambio o creación
    const ultimaFecha = ticketActual.transferencias[0]?.fechaInicio || ticketActual.fechaCreacion; // ✅ Corregido: 'fecha' -> 'fechaInicio'
    const tiempoMinutos = Math.round((new Date().getTime() - new Date(ultimaFecha).getTime()) / 60000);

    // 4. Transacción de base de datos para asegurar consistencia
    await prisma.$transaction([
      
      // A. Registrar la transferencia en el historial
      prisma.transfer.create({ // ✅ Corregido: 'transferencia' -> 'transfer'
        data: {
          ticketActivityId: ticketActual.id, // ✅ Corregido: 'ticketId' -> 'ticketActivityId'
          origenUsuarioId: anteriorResponsableId, // ✅ Corregido: 'anteriorId' -> 'origenUsuarioId'
          destinoUsuarioId: formData.nuevoResponsableId, // ✅ Corregido: 'nuevoId' -> 'destinoUsuarioId'
          motivo: formData.motivo,
          fechaInicio: new Date(), // El registro actual inicia en este momento
          // Nota: Si decides añadir 'tiempoMinutos' a tu modelo Transfer en el schema.prisma, 
          // puedes descomentar la siguiente línea:
          // tiempoMinutos: tiempoMinutos > 0 ? tiempoMinutos : 1,
        },
      }),

      // B. Actualizar el responsable directo del ticket, pasar a "En proceso" e incrementar contador
      prisma.ticketActivity.update({
        where: { id: ticketActual.id },
        data: {
          operadorId: formData.nuevoResponsableId, // ✅ Corregido a 'operadorId'
          estado: EstadoTicket.EN_PROCESO, // ✅ Corregido: 'estatusActual' -> 'estado'
          numTransferencias: { increment: 1 }, // ✅ Aprovechamos para aumentar tu contador numTransferencias automático
        },
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error al transferir ticket:", error);
    return { success: false, error: (error as Error).message };
  }
}