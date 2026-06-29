import { auth } from "@/auth";
import AdminDashboard from "@/components/admin_dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  // 1. Extraemos el rol y el ID del usuario de la sesión
  const user = session?.user as any;
  const isAdmin = user?.role === "ADMIN";
  const userId = user?.id;

  const rol = isAdmin ? "ADMIN" : "OPERADOR";

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ||'https://localhost:4000';

  // 2. Construimos la URL de tickets dinámicamente
  // Si no es admin, añadimos el operadorId como query param
  const ticketsUrl = isAdmin 
    ? `${BACKEND_URL}/api/tickets` 
    : `${BACKEND_URL}/api/tickets?operadorId=${userId}`;

  // 3. Hacemos el fetch con la URL ajustada
  const [actividadesRes, operadoresRes] = await Promise.all([
    fetch(ticketsUrl, { cache: 'no-store' }),
    fetch(`${BACKEND_URL}/api/users`, { cache: 'no-store' })
  ]);

  if (!actividadesRes.ok) {
     throw new Error(`Error al cargar tickets: ${actividadesRes.status}`);
  }
  
  if (!operadoresRes.ok) {
     throw new Error(`Error al cargar operadores: ${operadoresRes.status}`);
  }

  const actividades = await actividadesRes.json();
  const listaOperadores = await operadoresRes.json();

  return (
    <div>
      <AdminDashboard 
        rol={rol} 
        ticketsBaseDatos={actividades} 
        operadores={listaOperadores}
      />
    </div>
  );
}