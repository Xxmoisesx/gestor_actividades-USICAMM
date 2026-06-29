// auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "Correo", type: "text" },
        contrasena: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              correo: credentials?.correo,
              contrasena: credentials?.contrasena,
            }),
          });

          if (!res.ok) return null;

          const user = await res.json();
          
          // Debugging: Verifica en la terminal qué campos trae tu usuario
          console.log("DATOS QUE LLEGAN DEL BACKEND:", user); 
          
          return user || null;
        } catch (error) {
          console.error("Error al conectar con el backend:", error);
          return null; // Es obligatorio retornar null si falla
        }
      }
    })
  ],
});