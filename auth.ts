// auth.ts (VERSION LIMPIA - SIN PRISMA)
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        correo: {},
        contrasena: {},
      },
      authorize: async (credentials) => {
        // Llamada a TU backend en NestJS
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo: credentials.correo,
            contrasena: credentials.contrasena,
          }),
        });

        if (!res.ok) return null; // Si el login falla, auth retorna null

        return await res.json(); // Retorna el usuario del backend
      },
    }),
  ],
  // ... callbacks de jwt y session ...
});