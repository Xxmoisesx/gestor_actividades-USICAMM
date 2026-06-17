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
        correo: { label: "Correo electrónico", type: "email" },
        contrasena: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        const emailInput = credentials?.correo || credentials?.correo;
        const passwordInput = credentials?.contrasena || credentials?.contrasena;

        if (!emailInput || !passwordInput) {
          throw new Error("Faltan datos")
        }

        // 1. Busca el usuario en la DB usando el correo
        const usuario = await prisma.user.findUnique({
          where: { correo: emailInput as string }
        })

        if (!usuario || !usuario.contrasena) {
          throw new Error("Usuario no encontrado")
        }

        // 2. Compara la contraseña escrita con el hash seguro de la DB
        const contrasenaCoincide = await bcrypt.compare(
          passwordInput as string, 
          usuario.contrasena
        )

        if (!contrasenaCoincide) {
          throw new Error("Contraseña incorrecta")
        }

        // 3. Retorna el perfil del usuario para la sesión si todo está correcto
        return {
          id: usuario.id,
          name: usuario.nombre,
          email: usuario.correo,
          role: usuario.rol
        }
      }
    })
  ]
})
