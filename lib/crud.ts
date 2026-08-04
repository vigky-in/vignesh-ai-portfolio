import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

type Delegate = {
  findMany: (args?: any) => Promise<any>;
  create: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
};

async function requireAuth() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export function listCreateHandlers(delegate: Delegate, orderBy: any = { order: "asc" }) {
  async function GET() {
    const denied = await requireAuth();
    if (denied) return denied;
    const items = await delegate.findMany({ orderBy });
    return NextResponse.json(items);
  }

  async function POST(req: NextRequest) {
    const denied = await requireAuth();
    if (denied) return denied;
    const data = await req.json();
    const created = await delegate.create({ data });
    return NextResponse.json(created);
  }

  return { GET, POST };
}

export function itemHandlers(delegate: Delegate) {
  async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const denied = await requireAuth();
    if (denied) return denied;
    const data = await req.json();
    const updated = await delegate.update({ where: { id: params.id }, data });
    return NextResponse.json(updated);
  }

  async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    const denied = await requireAuth();
    if (denied) return denied;
    await delegate.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  }

  return { PATCH, DELETE };
}

export function singletonHandlers(
  findUnique: (id: string) => Promise<any>,
  upsert: (id: string, data: any) => Promise<any>,
  id: string
) {
  async function GET() {
    const denied = await requireAuth();
    if (denied) return denied;
    const item = await findUnique(id);
    return NextResponse.json(item);
  }

  async function PATCH(req: NextRequest) {
    const denied = await requireAuth();
    if (denied) return denied;
    const data = await req.json();
    const updated = await upsert(id, data);
    return NextResponse.json(updated);
  }

  return { GET, PATCH };
}
