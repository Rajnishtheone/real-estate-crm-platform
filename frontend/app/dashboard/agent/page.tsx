"use client";

import Link from 'next/link';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { LogoutButton } from '../../../components/LogoutButton';

const PipelineCard = ({ title, count }: { title: string; count: number }) => (
  <div className="rounded-xl bg-white shadow-sm p-4">
    <div className="text-sm text-slate-500">{title}</div>
    <div className="text-2xl font-semibold">{count}</div>
  </div>
);

export default function AgentDashboard() {
  return (
    <ProtectedRoute roles={["AGENT","ADMIN"]}>
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Pipeline overview</p>
            <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/properties/new" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold">New Listing</Link>
            <LogoutButton />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <PipelineCard title="New" count={6} />
          <PipelineCard title="Contacted" count={12} />
          <PipelineCard title="Negotiation" count={4} />
          <PipelineCard title="Closed" count={8} />
        </div>
      </main>
    </ProtectedRoute>
  );
}
