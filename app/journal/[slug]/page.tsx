import Container from "@/components/Container";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Database } from "@/types/database.types";

export const revalidate = 60;

interface JournalPostProps {
    params: Promise<{
        slug: string;
    }>;
}

type Post = Database['public']['Tables']['posts']['Row'];

export default async function JournalPostPage({ params }: JournalPostProps) {
    const { slug } = await params;

    const { data: postData, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !postData) {
        notFound();
    }

    const post = postData as Post;

    return (
        <div className="py-20 bg-background min-h-screen">
            <Container>
                <Link href="/journal" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition gap-1 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Journal
                </Link>

                <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {post.image_url && (
                        <div className="aspect-video w-full relative">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        <header className="mb-8 text-center">
                            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
                                <Calendar className="w-4 h-4" />
                                {post.published_at ? new Date(post.published_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'Draft'}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold font-caveat mb-4 leading-tight">
                                {post.title}
                            </h1>
                        </header>

                        <div className="prose prose-slate max-w-none prose-headings:font-caveat prose-headings:font-bold prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl leading-loose text-lg text-slate-700">
                            {/* 
                                NOTE: In a real app, you'd verify this content is safe HTML or use a markdown parser. 
                                For now, we are displaying raw text or assuming simple content.
                                If the content is Markdown, we would use a library like `react-markdown`.
                                If it's HTML from a CMS, we would use `dangerouslySetInnerHTML`.
                             */}
                            {post.content ? (
                                <div className="whitespace-pre-wrap">{post.content}</div>
                            ) : (
                                <p className="italic text-slate-400">No content available.</p>
                            )}
                        </div>
                    </div>
                </article>
            </Container>
        </div>
    );
}
