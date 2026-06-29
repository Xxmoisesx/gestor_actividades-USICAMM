import { auth } from "@/auth";
import AdminDashboard from "@/components/admin_dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // 1. Obtenemos la sesión del usuario
  const session = await auth();

  // 2. Definimos el rol correctamente antes de pasarlo al componente
  // Si no hay sesión o no hay rol, por seguridad asignamos "OPERADOR"
  const rol = (session?.user as any)?.role === "ADMIN" ? "ADMIN" : "OPERADOR";

  // 3. Hacemos las peticiones al backend
  const [actividadesRes, operadoresRes] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/api/tickets`, { cache: 'no-store' }),
    fetch(`${process.env.BACKEND_URL}/api/users`, { cache: 'no-store' })
  ]);

  // Si alguna petición falla, lanzamos el error para que Next.js lo capture
  if (!actividadesRes.ok) {
     throw new Error(`Error al cargar tickets: ${actividadesRes.status} ${actividadesRes.statusText}`);
  }
  
  if (!operadoresRes.ok) {
     throw new Error(`Error al cargar operadores: ${operadoresRes.status} ${operadoresRes.statusText}`);
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