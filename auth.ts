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
        // 1. Enviamos las credenciales al backend (NestJS)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correo: credentials.correo,
            contrasena: credentials.contrasena,
          }),
        });

        if (!res.ok) return null;

        const user = await res.json();

        // 2. Si el backend responde bien, devolvemos el objeto usuario
        // Asegúrate de que tu backend devuelva { id, name, email, role }
        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // 3. Pasamos el rol al token para que esté disponible en la sesión
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
});