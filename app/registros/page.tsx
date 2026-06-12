"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registrarUsuario } from "./action"; // Importamos la acción que creamos en el Paso 1
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRegistroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setExito("");
    setCargando(true);

    // Ejecutamos la acción del servidor
    const resultado = await registrarUsuario({ nombre, correo, contrasena, telefono });

    if (resultado?.error) {
      setError(resultado.error);
      setCargando(false);
    } else {
      setExito("¡Usuario registrado con éxito! Redirigiendo al inicio...");
      
      // Esperamos 2 segundos para que el usuario vea el mensaje de éxito y lo mandamos al login
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Crear Cuenta</CardTitle>
          <CardDescription>
            Regístrate en el Gestor de Actividades - USICAMM
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegistroSubmit}>
          <CardContent className="space-y-4">
            {/* Mensaje de Error */}
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md font-medium text-center">
                {error}
              </div>
            )}

            {/* Mensaje de Éxito */}
            {exito && (
              <div className="bg-emerald-500/15 text-emerald-600 text-sm p-3 rounded-md font-medium text-center">
                {exito}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Nombre Completo</label>
              <Input 
                type="text" 
                placeholder="Juan Pérez" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={cargando}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Correo Electrónico</label>
              <Input 
                type="email" 
                placeholder="ejemplo@correo.com" 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={cargando}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Telefono</label>
              <Input 
                type="text" 
                placeholder="55 1234 5678" 
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                disabled={cargando}
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
                disabled={cargando}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={cargando}>
              {cargando ? "Registrando..." : "Registrar Usuario"}
            </Button>
            
            <p className="text-sm text-center text-zinc-600">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/" className="text-primary font-medium hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}