"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createActivity(formData: FormData) {
  const titulo = formData.get("titulo") as string;
  const descripcion = formData.get("descripcion") as string;
  const prioridad = formData.get("prioridad") as "CRITICA" | "ALTA" | "MEDIA" | "BAJA";
  const operadorId = formData.get("asignarA") as string;
  const fechaLimite = new Date(formData.get("fechaLimite") as string);

  try {
    // 1. Generar el código secuencial único (Ej: TK-001, TK-002...)
    const totalTickets = await prisma.ticketActivity.count();
    const nuevoCodigo = `TK-${String(totalTickets + 1).padStart(3, "0")}`;

    // 2. Crear el registro en la nueva tabla consolidada ticket_activity
    await prisma.ticketActivity.create({
      data: {
        codigo: nuevoCodigo,
        titulo,
        descripcion,
        prioridad,
        fechaLimite,
        estado: "PENDIENTE", // Se alinea automáticamente con tu Enum EstadoTicket
        origen: "Manual",    // Al ser creado desde este formulario, lo marcamos como Manual
        operador: { 
          connect: { id: operadorId } 
        },
      },
    });

    // Revalidar la ruta para actualizar el listado en tiempo real
    revalidatePath("/dashboard/gestion");
  } catch (error) {
    console.error("Error al crear la actividad unificada:", error);
    // Retornamos para evitar que ejecute el redirect si hubo un fallo crítico
    return;
  }

  // Redirección fuera del try-catch para cumplir con Next.js
  redirect("/dashboard/gestion");
}