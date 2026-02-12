import Container from "@/components/Container";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Database } from "@/types/database.types";
import AddToCartButton from "@/components/AddToCartButton";

export const revalidate = 0;

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

type ProductWithCategory = Database['public']['Tables']['products']['Row'] & {
    categories: { name: string } | null;
};

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;

    const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('slug', slug)
        .single();

    if (error || !data) {
        notFound();
    }

    const product = data as unknown as ProductWithCategory;

    // @ts-ignore
    const categoryName = product.categories?.name;

    return (
        <div className="py-20 bg-background min-h-screen">
            <Container>
                <Link href="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition gap-1 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Shop
                </Link>

                <div className="grid md:grid-cols-2 gap-6 md:gap-12 bg-white p-4 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                    {/* Image Section */}
                    <div className="bg-slate-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center border border-slate-100 relative group">
                        {product.image_url ? (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-3xl text-muted-foreground/30 font-caveat relative z-10">
                                {product.name} Image
                            </div>
                        )}

                        {/* Decorative sketch elements */}
                        <div className="absolute inset-4 border-2 border-dashed border-slate-200 rounded-lg pointer-events-none opacity-50"></div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="inline-block bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                                {categoryName || 'Product'}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold font-caveat mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                            Rs. {product.price}
                            {product.is_sale && (
                                <span className="text-sm font-normal text-muted-foreground bg-slate-100 px-2 py-1 rounded line-through">
                                    Rs. {Math.round(product.price * 1.2)}
                                </span>
                            )}
                        </p>

                        <div className="prose prose-slate max-w-none mb-8 text-muted-foreground leading-relaxed">
                            <p>{product.description || "No description available for this handwritten masterpiece."}</p>
                        </div>

                        {/* Features / Highlights */}
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Check className="w-3 h-3" />
                                </div>
                                Handmade with love
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Check className="w-3 h-3" />
                                </div>
                                Unique & Personalized
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <Check className="w-3 h-3" />
                                </div>
                                Eco-friendly packaging
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-100">
                            <AddToCartButton productId={product.id} />
                            <p className="text-center text-xs text-muted-foreground mt-3">
                                Secure checkout • Fast shipping
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
