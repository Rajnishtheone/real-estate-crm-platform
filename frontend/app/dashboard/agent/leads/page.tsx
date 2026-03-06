"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLeads, updateLeadStatus } from '../../../../services/leads';
import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { LogoutButton } from '../../../../components/LogoutButton';
import { TableSkeleton } from '../../../../components/Skeletons';

const statuses = ['NEW','CONTACTED','NEGOTIATION','CLOSED'];

export default function LeadManagementPage() {
  const { data, isLoading } = useQuery({ queryKey: ['leads'], queryFn: fetchLeads });
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateLeadStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });

  return (
    <ProtectedRoute roles={["AGENT","ADMIN"]}>
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Lead Management</h1>
          <LogoutButton />
        </div>
        <div className="bg-white rounded-xl shadow-sm">
          <table className="w-full text-left">
            <thead className="border-b bg-slate-50">
              <tr><th className="p-3">Name</th><th className="p-3">Property</th><th className="p-3">Status</th></tr>
            </thead>
            <tbody>
              {isLoading && <tr><td className="p-3" colSpan={3}><TableSkeleton rows={3} cols={3} /></td></tr>}
              {data?.data?.length === 0 && !isLoading && <tr><td className="p-3" colSpan={3}>No leads assigned.</td></tr>}
              {data?.data?.map((lead: any) => (
                <tr key={lead.id} className="border-b">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.property?.title}</td>
                  <td className="p-3">
                    <select
                      className="border rounded px-2 py-1"
                      value={lead.status}
                      onChange={(e)=> mutation.mutate({ id: lead.id, status: e.target.value })}
                    >
                      {statuses.map((s)=> <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </ProtectedRoute>
  );
}
