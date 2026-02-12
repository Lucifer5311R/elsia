import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Database } from "@/types/database.types";

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCardProps {
    product: Product;
    categoryName?: string;
}

export default function ProductCard({ product, categoryName }: ProductCardProps) {
    return (
        <Link href={`/product/${product.slug}`} className="block">
            <div className="bg-white rounded-xl p-4 shadow-sm group hover:shadow-md transition border border-transparent hover:border-sketch-outline h-full flex flex-col">
                <div className="aspect-square bg-slate-100 rounded-lg mb-4 overflow-hidden relative">
                    {product.image_url ? (
                        <div className="relative w-full h-full">
                            {/* 
                  Using a simple div for now if image is external url, 
                  or we can use Next.js Image if we configure domains.
                  For now assuming simple usage or Supabase storage url.
               */}
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-caveat text-xl p-4 text-center">
                            {product.name}
                        </div>
                    )}

                    <button className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-primary border border-gray-100 hover:scale-110 transition z-10">
                        <Plus className="w-5 h-5" />
                    </button>

                    {product.is_sale && (
                        <span className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-sm z-10">
                            Sale
                        </span>
                    )}
                </div>

                <div className="mt-auto">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-muted-foreground text-sm">{categoryName || 'Product'}</p>
                        <p className="font-bold text-primary font-caveat text-lg">Rs. {product.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
