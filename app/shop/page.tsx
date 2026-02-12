import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Disable static caching for now

interface ShopPageProps {
    searchParams: Promise<{
        category?: string;
    }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const { category } = await searchParams;

    let query = supabase
        .from('products')
        .select(`
      *,
      categories (
        name,
        slug
      )
    `)
        .order('created_at', { ascending: false });

    // If category slug is provided, filter by it
    // We use !inner on the join if we were doing it that way, but since we are filtering products 
    // based on a related table's column, we need to ensure the relationship logic works. 
    // Supabase JS allows filtering on joined tables if using !inner, or we can just filter by category_id if we knew it.
    // simpler approach: fetch all and filter in memory (bad for scale) or use !inner.
    // Let's try the !inner approach which is standard for "Give me products where category.slug = X".
    if (category) {
        query = supabase
            .from('products')
            .select(`
                *,
                categories!inner (
                    name,
                    slug
                )
            `)
            .eq('categories.slug', category)
            .order('created_at', { ascending: false });
    }

    const { data: products, error } = await query;

    if (error) {
        console.error("Error fetching products:", error);
        return (
            <Container>
                <div className="py-20 text-center">
                    <h1 className="text-3xl font-bold font-caveat text-red-500">
                        Oops! Could not load products.
                    </h1>
                    <p className="text-muted-foreground">Please try again later.</p>
                </div>
            </Container>
        );
    }

    return (
        <div className="py-20 bg-background min-h-screen">
            <Container>
                <div className="text-center mb-16 relative">
                    <div className="inline-block relative">
                        <h1 className="text-5xl font-bold font-caveat tracking-wide">
                            Shop All
                        </h1>
                        <div className="w-full h-1 bg-sketch-outline absolute bottom-0 left-0 opacity-20 rotate-1"></div>
                    </div>
                    <p className="text-muted-foreground mt-4 font-caveat text-xl">
                        Find the perfect handmade gift
                    </p>
                </div>

                {(!products || products.length === 0) ? (
                    <div className="text-center py-20 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                        <p className="text-xl text-muted-foreground font-caveat">
                            No products found directly from the sketchpad yet!
                        </p>
                        <p className="text-sm text-slate-400 mt-2">
                            Check back soon or add items to your database.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product: any) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                // @ts-ignore: Supabase join typing can be tricky, categories is an object here
                                categoryName={product.categories?.name}
                            />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
