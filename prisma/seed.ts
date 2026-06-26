import { PrismaClient, Rol, EstadoTicket } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Borrando datos antiguos para la prueba...');
  // Limpiamos tablas para no duplicar datos en cada prueba
  await prisma.history.deleteMany();
  await prisma.evidence.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.transfer.deleteMany();
  await prisma.ticketActivity.deleteMany();
  await prisma.priority.deleteMany();
  await prisma.user.deleteMany();

  console.log('🎨 Creando prioridades...');
  const prioridades = [
    {
      nombre: "Crítica",
      colorText: "text-red-700",
      colorBg: "bg-red-50",
      colorBorder: "border-red-100",
    },
    {
      nombre: "Alta",
      colorText: "text-orange-700",
      colorBg: "bg-orange-50",
      colorBorder: "border-orange-100",
    },
    {
      nombre: "Media",
      colorText: "text-amber-700",
      colorBg: "bg-amber-50",
      colorBorder: "border-amber-100",
    },
    {
      nombre: "Baja",
      colorText: "text-slate-600",
      colorBg: "bg-slate-50",
      colorBorder: "border-slate-100",
    },
  ];

  const dbPrioridades: Record<string, any> = {};
  for (const prio of prioridades) {
    const created = await prisma.priority.create({ data: prio });
    dbPrioridades[prio.nombre] = created;
  }

  console.log('👤 Creando usuario Operador de pruebas...');
  const operador = await prisma.user.create({
    data: {
      nombre: "Juan Pérez",
      correo: "juan.perez@correo.com",
      telefono: "5512345678",
      contrasena: "$2a$10$Xm14N4lD2H3o0cE9m6v5XeUu7C5r12fG.7W2l3m4n5o6p7q8r9s1t", // hash de password123
      rol: Rol.OPERADOR,
    },
  });

  console.log(`✅ Operador creado con ID: ${operador.id}`);

  console.log('🎟️ Insertando los tickets/actividades unificados...');
  const ticketsFalsos = [
    {
      codigo: "TK-001",
      titulo: "Fuga de agua en calle Reforma",
      descripcion: "Se reporta fuga severa de agua potable sobre la banqueta.",
      estado: EstadoTicket.EN_PROCESO,
      prioridadId: dbPrioridades["Alta"].id,
      operadorId: operador.id,
      fechaLimite: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 día
    },
    {
      codigo: "TK-002",
      titulo: "Alumbrado público dañado",
      descripcion: "Luminaria fundida parpadeando toda la noche.",
      estado: EstadoTicket.PENDIENTE,
      prioridadId: dbPrioridades["Media"].id,
      operadorId: operador.id,
      fechaLimite: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 días
    },
    {
      codigo: "TK-003",
      titulo: "Bache en Av. Juárez",
      descripcion: "Bache profundo que ya afectó a tres vehículos.",
      estado: EstadoTicket.EN_PROCESO,
      prioridadId: dbPrioridades["Alta"].id,
      operadorId: operador.id,
      fechaLimite: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 días
    },
    {
      codigo: "TK-004",
      titulo: "Recolección de basura irregular",
      descripcion: "El camión recolector no ha pasado en 4 días.",
      estado: EstadoTicket.PENDIENTE,
      prioridadId: dbPrioridades["Baja"].id,
      operadorId: operador.id,
      fechaLimite: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 días
    },
    {
      codigo: "TK-005",
      titulo: "Semáforo sin funcionar",
      descripcion: "Cruce peligroso por semáforo completamente apagado.",
      estado: EstadoTicket.EN_REVISION,
      prioridadId: dbPrioridades["Crítica"].id,
      operadorId: operador.id,
      fechaLimite: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 horas
    },
  ];

  for (const ticket of ticketsFalsos) {
    await prisma.ticketActivity.create({ data: ticket });
  }

  console.log('🚀 ¡Base de datos poblada con éxito para las pruebas!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });