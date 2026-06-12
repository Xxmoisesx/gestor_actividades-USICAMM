"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link"; 

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const mánagerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const res = await signIn("credentials", {
        correo,
        contrasena,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Iniciar Sesión</CardTitle>
          <CardDescription>
            Gestión de Actividades - USICAMM
          </CardDescription>
        </CardHeader>
        <form onSubmit={mánagerSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md font-medium text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Correo Electrónico</label>
              <Input 
                type="email" 
                placeholder="ejemplo@correo.com" 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Contraseña</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={cargando}>
              {cargando ? "Accediendo..." : "Ingresar al Sistema"}
            </Button>

            {/* 🚀 AÑADE ESTO DEBAJO DE TU BOTÓN DE LOGIN */}
            <p className="text-sm text-center text-zinc-600">
              ¿No tienes una cuenta?{" "}
              <Link href="/registros" className="text-primary font-medium hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}