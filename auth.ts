import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma" 
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credenciales",
      credentials: {
        correo: { label: "Correo electrónico", type: "text" },
        celular: { label: "Número de celular", type: "text" }, // Campo para capturar el teléfono
        contrasena: { label: "Contraseña", type: "password" }
      },
      
      // En tu auth.ts
async authorize(credentials) {
  console.log("======= DEBUG LOGIN =======");
  console.log("Credenciales recibidas desde el formulario:", credentials);

  const emailOrPhoneInput = credentials?.correo as string | undefined;
  const celularInput = credentials?.celular as string | undefined;
  const passwordInput = credentials?.contrasena as string | undefined;

  if (!passwordInput || (!emailOrPhoneInput && !celularInput)) {
    throw new Error("Faltan datos");
  }

  let usuario = null;

  // 1. Buscamos de manera flexible
  if (emailOrPhoneInput && emailOrPhoneInput.trim() !== "") {
    // Como el teléfono está llegando dentro de 'correo', buscamos en AMBOS campos con un OR
    usuario = await prisma.user.findFirst({
      where: {
        OR: [
          { correo: emailOrPhoneInput },
          { telefono: emailOrPhoneInput } // 👈 Si es un número y viene en 'correo', Prisma lo encontrará aquí
        ]
      }
    });
  } else if (celularInput && celularInput.trim() !== "") {
    usuario = await prisma.user.findFirst({
      where: { telefono: celularInput }
    });
  }

  console.log("Usuario encontrado en Prisma:", usuario ? { id: usuario.id, nombre: usuario.nombre, telefono: usuario.telefono } : "NULL (No se encontró)");
  console.log("===========================");

  if (!usuario || !usuario.contrasena) {
    throw new Error("Usuario no encontrado");
  }

  // 2. Compara la contraseña escrita con el hash seguro de la DB
  const contrasenaCoincide = await bcrypt.compare(
    passwordInput, 
    usuario.contrasena
  );

  if (!contrasenaCoincide) {
    throw new Error("Contraseña incorrecta");
  }

  // 3. Retorna el perfil del usuario para la sesión
  return {
    id: usuario.id.toString(), 
    name: usuario.nombre,
    email: usuario.correo,
    role: usuario.rol
  };
}
    })
  ],
  // 🚀 ESTO SOLUCIONA EL ERROR DE LA CAPTURA DEL DASHBOARD (ID inactivo)
  callbacks: {
    async jwt({ token, user }) {
      // Cuando el usuario inicia sesión, guardamos su ID y Rol en el Token JWT
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasamos los datos del Token JWT directamente a la sesión accesible en el Frontend
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
})

