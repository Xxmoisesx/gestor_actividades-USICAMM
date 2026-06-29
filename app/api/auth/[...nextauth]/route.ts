import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { handlers } from "@/auth"; // Asegúrate de importar handlers de tu auth.ts

export const { GET, POST } = handlers;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "Correo", type: "text" },
        contrasena: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Hacemos la petición a tu API de NestJS
          const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              correo: credentials?.correo,
              contrasena: credentials?.contrasena,
            }),
          });

          const user = await res.json();

          // Si el backend responde OK y devuelve un usuario válido, lo retornamos
          if (res.ok && user) {
            return user;
          }
          
          return null; // Si falla, NextAuth rechaza el login
        } catch (error) {
          console.error("Error conectando con el backend:", error);
          return null;
        }
      }
    })
  ],
  // Aquí puedes conservar tus callbacks de jwt o session si los tenías
  pages: {
    signIn: '/login', // Asegúrate de que apunte a tu página de login
  }
};

const handler = NextAuth(authOptions);
