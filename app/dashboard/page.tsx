import { auth } from "@/auth";
import OperatorDashboard from "@/components/dashboard_operador"; 

export default async function DashboardPage() {
  try {
    // 1. Obtenemos la sesión para identificar quién está entrando
    const session = await auth();
    const user = session?.user as any;
    
    // 2. Determinamos la URL dinámicamente
    // Si es ADMIN no filtramos, si es OPERADOR filtramos por su ID
    const isAdmin = user?.role === "ADMIN";
    const userId = user?.id;
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets`;
    
    const url = isAdmin ? baseUrl : `${baseUrl}?operadorId=${userId}`;

    // 3. Realizamos el fetch con la URL construida
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
       throw new Error(`Error en API: ${res.status}`);
    }

    const tickets = await res.json();
    
    return (
      <main>
        <OperatorDashboard 
           ticketsBaseDatos={tickets} 
        />
      </main>
    );
    
  } catch (error) {
    console.error("ERROR EN DASHBOARD PRINCIPAL:", error); 
    return <div>Error al cargar los datos.</div>;
  }
}