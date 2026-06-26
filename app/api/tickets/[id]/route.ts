import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: Params) {
  const ticketId = Number(params.id);
  if (Number.isNaN(ticketId)) {
    return NextResponse.json({ error: "ID de ticket inválido." }, { status: 400 });
  }

  const ticket = await prisma.ticketActivity.findUnique({
    where: { id: ticketId },
    include: {
      operador: true,
      prioridad: true,
      transferencias: {
        include: {
          origenUsuario: true,
          destinoUsuario: true,
        },
        orderBy: { fechaInicio: "asc" },
      },
      historialEventos: {
        include: { usuario: true },
        orderBy: { creadoEn: "asc" },
      },
    },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket no encontrado." }, { status: 404 });
  }

  return NextResponse.json(ticket);
}
