"use client";

import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { LogoutButton } from '../../../components/LogoutButton';

export default function NriDashboard() {
  return (
    <ProtectedRoute roles={["NRI","ADMIN"]}>
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Remote portfolio</p>
            <h1 className="text-3xl font-bold">NRI Management</h1>
          </div>
          <LogoutButton />
        </div>
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-3">Rent schedule</h3>
          <div className="divide-y">
            {[{due:'2026-04-01', amount:1200, status:'DUE'},{due:'2026-05-01', amount:1200, status:'DUE'}].map((p,i)=>(
              <div key={i} className="py-3 flex justify-between">
                <div>
                  <div className="font-semibold">Due {p.due}</div>
                  <div className="text-sm text-slate-500">${p.amount}</div>
                </div>
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">{p.status}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-3">Documents</h3>
          <p className="text-sm text-slate-600">Upload ownership proofs and tenancy documents.</p>
          <button className="mt-3 bg-primary text-white px-4 py-2 rounded-lg font-semibold">Upload</button>
        </section>
      </main>
    </ProtectedRoute>
  );
}
