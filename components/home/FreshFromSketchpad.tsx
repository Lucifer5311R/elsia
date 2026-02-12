import Container from "../Container";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export default async function FreshFromSketchpad() {
    const { data: products } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('is_featured', true)
        .limit(4)
        .order('created_at', { ascending: false });

    // Fallback if no featured products, just get latest 4
    let displayProducts = products;
    if (!products || products.length === 0) {
        const { data: latestProducts } = await supabase
            .from('products')
            .select(`
              *,
              categories (
                name
              )
            `)
            .limit(4)
            .order('created_at', { ascending: false });

        displayProducts = latestProducts;
    }

    return (
        <section className="py-20 bg-orange-50/30 relative">
            {/* Decorative wavy top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg className="relative block w-[calc(100%+1.3px)] h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FAF9F6" stroke="none"></path>
                </svg>
            </div>

            <Container>
                <div className="text-center mb-16 relative">
                    <div className="inline-block relative">
                        <span className="absolute -top-6 -right-6 bg-white border border-sketch-outline px-2 py-1 text-sm font-caveat rotate-12 shadow-sm text-primary font-bold">
                            Just dropped!
                        </span>
                        <h2 className="text-4xl font-bold font-caveat tracking-wide">
                            Fresh From The Sketchpad
                        </h2>
                    </div>
                </div>

                {(!displayProducts || displayProducts.length === 0) ? (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground font-caveat text-xl">
                            Loading fresh designs... or maybe we're just drawing them!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayProducts.map((product: any) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                // @ts-ignore
                                categoryName={product.categories?.name}
                            />
                        ))}
                    </div>
                )}
            </Container>

            {/* Decorative wavy bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-[calc(100%+1.3px)] h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FAF9F6" stroke="none"></path>
                </svg>
            </div>
        </section>
    );
}

