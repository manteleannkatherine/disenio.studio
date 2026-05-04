"use client";
import { Badge, DataTable } from "@disenio/ui";

interface User {
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  joined: string;
  status: "active" | "invited" | "suspended";
}

const USERS: User[] = [
  { name: "Ana Mantel",       email: "ana@disenio.io",      role: "admin",  joined: "2026-04-12", status: "active" },
  { name: "Sam Rivera",       email: "sam@acme.co",         role: "member", joined: "2026-04-18", status: "active" },
  { name: "Chen Liu",         email: "chen@studio.dev",     role: "member", joined: "2026-04-22", status: "invited" },
  { name: "Mira Patel",       email: "mira@labs.io",        role: "viewer", joined: "2026-04-25", status: "active" },
  { name: "Theo Park",        email: "theo@park.studio",    role: "admin",  joined: "2026-04-28", status: "active" },
  { name: "Jay Okafor",       email: "jay@design.co",       role: "viewer", joined: "2026-05-01", status: "suspended" },
  { name: "Lin Zhao",         email: "lin@founder.club",    role: "member", joined: "2026-05-02", status: "active" },
  { name: "Rosa Mendez",      email: "rosa@hola.lat",       role: "viewer", joined: "2026-05-03", status: "invited" },
];

const TONE: Record<User["status"], "neutral" | "accent" | "ink"> = {
  active: "accent",
  invited: "neutral",
  suspended: "ink",
};

export function DataTableDemo() {
  return (
    <DataTable
      data={USERS}
      searchable
      pageSize={5}
      rowKey={(u) => u.email}
      columns={[
        { id: "name", header: "Name", accessor: "name", sortable: true },
        { id: "email", header: "Email", accessor: "email" },
        {
          id: "role",
          header: "Role",
          accessor: "role",
          sortable: true,
          cell: (u) => <span className="mono text-xs uppercase tracking-wider text-[var(--ds-ink-soft)]">{u.role}</span>,
        },
        {
          id: "joined",
          header: "Joined",
          accessor: "joined",
          sortable: true,
          sortValue: (u) => new Date(u.joined),
        },
        {
          id: "status",
          header: "Status",
          accessor: "status",
          cell: (u) => <Badge tone={TONE[u.status]}>{u.status}</Badge>,
        },
      ]}
    />
  );
}
