import Link from 'next/link';

export type PropertyCardProps = {
  id: string;
  title: string;
  locationCity: string;
  locationCountry: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  image?: string;
};

export const PropertyCard = ({ id, title, locationCity, locationCountry, price, type, bedrooms, bathrooms, image }: PropertyCardProps) => (
  <Link href={`/properties/${id}`} className="bg-white shadow-sm rounded-xl overflow-hidden hover:-translate-y-1 transition block">
    {image ? <img src={image} alt={title} className="h-44 w-full object-cover" /> : <div className="h-44 bg-slate-200" />}
    <div className="p-4 space-y-1">
      <div className="text-sm text-primary font-semibold">{type}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-slate-600 text-sm">{locationCity}, {locationCountry}</p>
      <p className="text-slate-900 font-bold">${price.toLocaleString()}</p>
      <p className="text-sm text-slate-500">{bedrooms} bed • {bathrooms} bath</p>
    </div>
  </Link>
);
