// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/', 
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;               // 👈 ¡FALTABA ESTO! Guardamos el ID en el JWT
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // 👈 ¡FALTABA ESTO! Pasamos el ID al frontend
        (session.user as any).role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAuthRoute = nextUrl.pathname === "/" || nextUrl.pathname === "/registros";

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirige automáticamente a la página de login (/)
      }

      if (isOnAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      return true;
    },
  },
  providers: [], // Se define en auth.ts para evitar importar Prisma en Edge
  session: {
    strategy: "jwt",
  }
} satisfies NextAuthConfig;