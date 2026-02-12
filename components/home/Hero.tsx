import Container from "../Container";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
    return (
        <section className="bg-background py-12 md:py-20 relative overflow-hidden">
            {/* Background doodle elements could go here */}

            <Container>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10">
                        <h5 className="font-caveat text-2xl mb-2 -rotate-2 inline-block bg-white px-2 border border-sketch-outline shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            ELYSIA
                        </h5>
                        <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6 font-caveat">
                            HANDMADE <br />
                            GIFTS <br />
                            <span className="text-primary relative inline-block">
                                FOR EVERYONE
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                        </h1>

                        <div className="border-l-4 border-primary pl-4 mb-8">
                            <p className="text-lg text-muted-foreground font-medium max-w-md">
                                Handcrafted accessories that started as a doodle on a napkin. Wearable art for the creative soul.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/shop"
                                className="group relative px-8 py-3 bg-primary text-white font-bold rounded-full border-2 border-sketch-outline shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-primary/90 transition-all flex items-center gap-2"
                            >
                                Start Exploring
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <button
                                className="group relative px-8 py-3 bg-white text-foreground font-bold rounded-full border-2 border-sketch-outline shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                Our Process
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Image Frame with sketch border */}
                        <div className="relative aspect-[4/3] bg-gray-100 rounded-lg border-2 border-sketch-outline shadow-[8px_8px_0px_rgba(0,0,0,1)] p-4 rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute -top-6 -left-6 z-20">
                                <img src="/placeholder-tape.png" alt="" className="w-24 h-auto opacity-80" />
                                {/* Placeholder for tape image or CSS tape */}
                            </div>

                            <div className="w-full h-full bg-slate-200 overflow-hidden rounded border border-gray-300 relative group">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gray-50">
                                    {/* Video or Image Fallback */}
                                    <video
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        poster="/hero-poster.jpg"
                                    >
                                        <source src="/hero-video.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                {/* Play button overlay (optional if autoplay) */}
                                {/* 
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                                    </div>
                                </div>
                                */}
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 text-xs font-bold border border-sketch-outline shadow-[2px_2px_0px_black]">
                                    Watch creation process ▼
                                </div>
                            </div>
                        </div>
                        {/* Decorative sketch arrow */}
                        <svg className="absolute -bottom-12 -left-12 w-32 h-32 text-sketch-outline transform rotate-12 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M80 20 Q 20 50 20 80" />
                            <path d="M20 80 L 30 70 M 20 80 L 35 85" />
                        </svg>
                    </div>
                </div>
            </Container>
        </section>
    );
}
