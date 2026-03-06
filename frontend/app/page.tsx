import Link from 'next/link';

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-white shadow-sm p-4">
    <div className="text-sm text-slate-500">{label}</div>
    <div className="text-2xl font-semibold text-slate-900">{value}</div>
  </div>
);

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="uppercase tracking-[0.25em] text-sm">Premium Real Estate</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">Find, manage, and close deals faster.</h1>
          <p className="mt-4 text-lg text-blue-50 max-w-3xl">Marketplace, CRM, document vault, and NRI management in one platform.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/properties" className="bg-white text-primary px-5 py-3 rounded-lg font-semibold">Browse Properties</Link>
            <Link href="/login" className="border border-white/60 px-5 py-3 rounded-lg font-semibold">Login</Link>
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-10 grid gap-4 md:grid-cols-3">
        <StatCard label="Active listings" value="2,150" />
        <StatCard label="Leads this month" value="430" />
        <StatCard label="NRI portfolios" value="128" />
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white shadow-sm p-6">
          <h3 className="text-xl font-semibold">For Agents & Admins</h3>
          <p className="mt-2 text-slate-600">Manage listings, approvals, and lead pipelines with analytics.</p>
          <Link className="text-primary font-semibold mt-3 inline-block" href="/dashboard/agent">Go to dashboard ?</Link>
        </div>
        <div className="rounded-xl bg-white shadow-sm p-6">
          <h3 className="text-xl font-semibold">For NRI Clients</h3>
          <p className="mt-2 text-slate-600">Track rent, upload ownership docs, and work with property managers remotely.</p>
          <Link className="text-primary font-semibold mt-3 inline-block" href="/dashboard/nri">Manage portfolio ?</Link>
        </div>
      </section>
    </main>
  );
}
