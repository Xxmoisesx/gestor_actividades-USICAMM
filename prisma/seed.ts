import { PrismaClient, Rol, EstadoTicket, Prioridad } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Borrando datos antiguos para la prueba...');
  // Limpiamos tablas para no duplicar datos en cada prueba
  await prisma.transfer.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  console.log('👤 Creando usuario Operador de pruebas...');
  const operador = await prisma.user.create({
    data: {
      nombre: "Juan Pérez",
      correo: "juan.perez@correo.com",
      telefono: "5512345678",
      contrasena: "password123", // En producción usarías bcrypt
      rol: Rol.OPERADOR,
    },
  });

  console.log(`✅ Operador creado con ID: ${operador.id}`);

  console.log('🎟️ Insertando los tickets del boceto...');
  const ticketsFalsos = [
    {
      folio: "TK-2024-0001",
      titulo: "Fuga de agua en calle Reforma",
      descripcion: "Se reporta fuga severa de agua potable sobre la banqueta.",
      estado: EstadoTicket.EN_PROCESO,
      prioridad: Prioridad.ALTA,
      asignadoAId: operador.id,
    },
    {
      folio: "TK-2024-0002",
      titulo: "Alumbrado público dañado",
      descripcion: "Luminaria fundida parpadeando toda la noche.",
      estado: EstadoTicket.PENDIENTE,
      prioridad: Prioridad.MEDIA,
      asignadoAId: operador.id,
    },
    {
      folio: "TK-2024-0003",
      titulo: "Bache en Av. Juárez",
      descripcion: "Bache profundo que ya afectó a tres vehículos.",
      estado: EstadoTicket.EN_PROCESO,
      prioridad: Prioridad.ALTA,
      asignadoAId: operador.id,
    },
    {
      folio: "TK-2024-0004",
      titulo: "Recolección de basura irregular",
      descripcion: "El camión recolector no ha pasado en 4 días.",
      estado: EstadoTicket.PENDIENTE,
      prioridad: Prioridad.BAJA,
      asignadoAId: operador.id,
    },
    {
      folio: "TK-2024-0005",
      titulo: "Semáforo sin funcionar",
      descripcion: "Cruce peligroso por semáforo completamente apagado.",
      estado: EstadoTicket.EN_REVISION,
      prioridad: Prioridad.CRITICA,
      asignadoAId: operador.id,
    },
  ];

  for (const ticket of ticketsFalsos) {
    await prisma.ticket.create({ data: ticket });
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