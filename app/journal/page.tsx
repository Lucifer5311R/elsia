import Container from "@/components/Container";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export const revalidate = 60;

export default async function JournalPage() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
    }

    return (
        <div className="py-20 bg-background min-h-screen">
            <Container>
                <div className="text-center mb-16 relative">
                    <div className="inline-block relative">
                        <h1 className="text-5xl font-bold font-caveat tracking-wide">
                            The Elysia Journal
                        </h1>
                        <div className="w-full h-1 bg-sketch-outline absolute bottom-0 left-0 opacity-20 rotate-1"></div>
                    </div>
                    <p className="mt-4 text-muted-foreground">Stories, sketches, and tutorials from our studio.</p>
                </div>

                {!posts || posts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500 font-caveat text-xl">
                            The pages are currently blank... Stay tuned for our first story!
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <Link href={`/journal/${post.slug}`} key={post.id} className="group">
                                <article className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                    <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                        {post.image_url ? (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 font-caveat text-2xl bg-slate-50">
                                                Elysia
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="text-xs font-bold tracking-wider text-primary uppercase mb-2">
                                            {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
                                        </div>
                                        <h2 className="text-2xl font-caveat font-bold mb-3 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-600 line-clamp-3 text-sm leading-relaxed mb-4 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <div className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read Story →
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
