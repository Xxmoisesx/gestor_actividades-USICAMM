"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createActivity(formData: FormData) {
  // 1. Extraemos los valores del formulario
  const data = {
    titulo: formData.get("titulo"),
    descripcion: formData.get("descripcion"),
    prioridad: formData.get("prioridad"),
    operadorId: formData.get("asignarA"), // <--- Mapeamos 'asignarA' a 'operadorId' aquí
    fechaLimite: formData.get("fechaLimite"),
  };

  // 2. Realizamos la petición
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets`, { // Asegúrate de que esta URL sea la correcta para crear tickets
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Aquí enviamos el objeto con los nombres correctos
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("DETALLE DEL ERROR DEL BACKEND:", errorData);
    throw new Error("No se pudo crear la actividad en el servidor");
  }

  // 3. Si todo sale bien
  revalidatePath("/dashboard/gestion");
  redirect("/dashboard/gestion");
}