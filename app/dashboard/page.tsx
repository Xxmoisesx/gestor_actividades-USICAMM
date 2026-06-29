// app/dashboard/page.tsx
import { auth } from "@/auth";
import OperatorDashboard from "@/components/dashboard_operador";
export default async function GestionPage() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/tickets`, {
      cache: "no-store",
    });

    if (!res.ok) {
       // Esto imprimirá el error real en tu terminal de VS Code
       const errorText = await res.text();
       console.error("ERROR EN FETCH DE TICKETS:", res.status, errorText);
       throw new Error(`Error en API: ${res.status}`);
    }

    const tickets = await res.json();
    // ... tu lógica de renderizado
    
  } catch (error) {
    // ESTO ES LO QUE DEBES VER EN LA TERMINAL:
    console.error("DEBUG - CAUSA DEL ERROR:", error); 
    return <div>Error al cargar los datos: {String(error)}</div>;
  }
}