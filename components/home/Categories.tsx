import Container from "../Container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Categories() {
    const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true })
        .limit(3);

    return (
        <section className="py-16 bg-background relative">
            {/* Decorative wavy line separator */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-[calc(100%+1.3px)] h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FAF9F6" stroke="none"></path>
                    {/* Simplified wave for the sketch look */}
                    <path d="M0,50 Q30,60 60,50 T120,50 T180,50 T240,50 T300,50 T360,50 T420,50 T480,50 T540,50 T600,50 T660,50 T720,50 T780,50 T840,50 T900,50 T960,50 T1020,50 T1080,50 T1140,50 T1200,50" fill="none" stroke="#ddd" strokeWidth="2" className="opacity-50" />
                </svg>
            </div>

            <Container>
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-caveat tracking-wide transform -rotate-1">
                            Curated Collections
                        </h2>
                        <p className="text-muted-foreground mt-2 font-caveat text-lg ml-4">
                            Pick your vibe
                        </p>
                    </div>
                    <Link href="/shop" className="text-primary font-bold hover:underline flex items-center gap-1 text-sm md:text-base">
                        View All Categories <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {(categories || []).map((cat: any, idx: number) => (
                        <div
                            key={cat.id}
                            className={`group relative aspect-square bg-white rounded-lg border-2 border-sketch-outline p-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-1 transition-all ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0`}
                        >
                            <Link href={`/shop?category=${cat.slug}`} className="block w-full h-full">
                                <div className="w-full h-full bg-slate-100 overflow-hidden rounded relative">
                                    {/* Placeholder Content */}
                                    {cat.image_url ? (
                                        <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-4xl font-caveat">
                                            {cat.name} Image
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4 bg-white border-2 border-sketch-outline px-4 py-1 text-lg font-bold font-caveat shadow-[2px_2px_0px_rgba(0,0,0,1)] transform -rotate-2 group-hover:rotate-0 transition-transform">
                                        {cat.name}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    {!categories?.length && (
                        <div className="col-span-3 text-center py-10 text-muted-foreground font-caveat text-xl">
                            Loading collections...
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

