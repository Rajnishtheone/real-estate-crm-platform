"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProperties } from '../../../hooks/useProperties';
import { updatePropertyStatus } from '../../../services/properties';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { LogoutButton } from '../../../components/LogoutButton';

const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white rounded-xl shadow-sm p-4">
    <div className="text-sm text-slate-500">{title}</div>
    <div className="text-2xl font-semibold">{value}</div>
  </div>
);

export default function AdminDashboard() {
  const { data, isLoading } = useProperties({ status: 'PENDING' });
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updatePropertyStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['properties'] }),
  });

  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Control center</p>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <LogoutButton />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Pending approvals" value={String(data?.pagination?.total || 0)} />
          <Card title="Listings" value={String(data?.data?.length || 0)} />
          <Card title="Cache" value="Auto" />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-3">Property Approvals</h3>
          {isLoading && <p>Loading pending listings...</p>}
          <div className="divide-y">
            {data?.data?.map((p: any) => (
              <div key={p.id} className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-slate-500">{p.locationCity}, {p.locationCountry} • ${Number(p.price).toLocaleString()}</div>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-1 rounded-lg bg-green-100 text-green-700" onClick={() => mutation.mutate({ id: p.id, status: 'ACTIVE' })}>Approve</button>
                  <button className="px-3 py-1 rounded-lg bg-red-100 text-red-700" onClick={() => mutation.mutate({ id: p.id, status: 'REJECTED' })}>Reject</button>
                </div>
              </div>
            ))}
            {data?.data?.length === 0 && <p className="py-4 text-sm text-slate-500">No pending listings.</p>}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
