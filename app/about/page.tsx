import Container from "@/components/Container";
import { Heart, Sparkles, PenTool } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="py-20 bg-background min-h-screen">
            <Container>
                {/* Header Section */}
                <div className="text-center mb-16 relative">
                    <div className="inline-block relative">
                        <h1 className="text-5xl font-bold font-caveat tracking-wide">
                            The Story of Elysia
                        </h1>
                        <div className="w-full h-1 bg-sketch-outline absolute bottom-0 left-0 opacity-20 rotate-1"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 rotate-1 hover:rotate-0 transition-transform duration-500">
                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                            Welcome to <span className="font-caveat text-3xl text-primary font-bold">Elysia</span>, where every stroke tells a story and every gift holds a memory.
                        </p>
                        <p className="mt-4 text-slate-600 leading-relaxed">
                            We believe in the magic of handmade things. In a world of mass production, we take a step back to the sketchpad, creating unique, personalized gifts that carry the warmth of human touch. From hand-painted frames to custom hampers, everything here starts with an idea and ends with a smile.
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-orange-50/50 rounded-xl border border-orange-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                                <PenTool className="w-6 h-6" />
                            </div>
                            <h3 className="font-caveat text-2xl font-bold mb-2">Handcrafted</h3>
                            <p className="text-sm text-slate-600">Made with love, care, and attention to detail.</p>
                        </div>
                        <div className="text-center p-6 bg-purple-50/50 rounded-xl border border-purple-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-purple-500">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="font-caveat text-2xl font-bold mb-2">Made with Love</h3>
                            <p className="text-sm text-slate-600">Every piece is created from the heart.</p>
                        </div>
                        <div className="text-center p-6 bg-blue-50/50 rounded-xl border border-blue-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-blue-500">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="font-caveat text-2xl font-bold mb-2">Unique</h3>
                            <p className="text-sm text-slate-600">One-of-a-kind designs you won't find elsewhere.</p>
                        </div>
                    </div>

                    {/* Founder Section (Placeholder) */}
                    <div className="bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                        <h2 className="text-3xl font-caveat font-bold mb-6">Meet the Maker</h2>
                        <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 flex items-center justify-center text-slate-400">
                            Photo
                        </div>
                        <p className="text-slate-600 italic">
                            "I started Elysia to bring a little more color and joy into everyday moments. Thank you for supporting my small business!"
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
