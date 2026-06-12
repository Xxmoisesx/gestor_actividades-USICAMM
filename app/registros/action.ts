"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Rol } from "@prisma/client";

export async function registrarUsuario(formData: { nombre: string; correo: string; contrasena: string; telefono?: string }) {
  const { nombre, correo, contrasena, telefono } = formData;

  try {
    // 1. Validar que no vengan campos vacíos
    if (!nombre || !correo || !contrasena) {
      return { error: "Todos los campos son obligatorios." };
    }

    // 2. Verificar si el usuario ya existe en la Base de Datos
    const usuarioExistente = await prisma.user.findUnique({
      where: { correo },
    });

    if (usuarioExistente) {
      return { error: "El correo electrónico ya está registrado." };
    }

    // 3. Encriptar la contraseña de forma segura
    const contrasenaHasheada = await bcrypt.hash(contrasena, 10);

    // 4. Crear el usuario en Supabase usando tus campos en español (nombre, correo, contrasena)
    // Nota: Le asignamos un rol por defecto, por ejemplo "USER" o el que maneje tu esquema de Prisma
    // 4. Crear el usuario en Supabase
    await prisma.user.create({
      data: {
        nombre,
        correo,
        contrasena: contrasenaHasheada,
        telefono: telefono || "", // Puedes dejarlo vacío o agregar un campo opcional en tu formulario
        rol: Rol.OPERADOR, // 🚀 Cambiado de "USER" a Rol.USER
      },
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Error en el registro de usuario:", error);
    return { error: "Ocurrió un error inesperado en el servidor." };
  }
}