"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createActivity(formData: FormData) {
  const titulo = formData.get("titulo") as string;
  const descripcion = formData.get("descripcion") as string;
  const prioridad = formData.get("prioridad") as string;
  const operadorId = formData.get("asignarA") as string; // ID del operador
  const fechaLimite = new Date(formData.get("fechaLimite") as string);

  try {
    await prisma.activity.create({
      data: {
        titulo,
        descripcion,
        prioridad,
        fechaLimite,
        operador: { connect: { id: operadorId } },
        estado: "Pendiente", // Valor inicial
      },
    });
    
    revalidatePath("/dashboard/gestion"); // Refresca la lista al volver
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al guardar la actividad" };
  }
}