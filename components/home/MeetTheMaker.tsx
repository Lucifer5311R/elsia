import Container from "../Container";
import Image from "next/image";

export default function MeetTheMaker() {
    return (
        <section className="py-20 bg-emerald-50/50 relative overflow-hidden">
            {/* Decorative Background Blob */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-100/50 rounded-l-[100px] -z-10 translate-x-1/4"></div>

            <Container>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 relative p-8 bg-white border-2 border-sketch-outline rounded-[2rem_255px_3px_25px/255px_5px_225px_3px] shadow-[8px_8px_0px_rgba(0,0,0,1)] rotate-1">
                        <div className="absolute -top-6 -left-6 z-10 -rotate-12">
                            <div className="bg-orange-200 text-orange-900 border border-sketch-outline px-4 py-2 font-bold font-caveat shadow-[2px_2px_0px_rgba(0,0,0,1)] text-xl">
                                Meet The Maker
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold mb-4 font-caveat">
                            Hi, I'm Sneha Lal.
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Everything you see here started as a random doodle in my morning coffee sketchbook.
                            I believe art shouldn't just hang on walls—it should be worn, carried, and lived with.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Every product is ethically sourced and printed with eco-friendly inks.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-sketch-outline">
                                <Image
                                    src="/maker-portrait.jpg"
                                    alt="Sneha Lal"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-caveat text-lg text-primary">Sneha Lal.</span>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 relative flex justify-center">
                        <div className="relative w-80 h-80 md:w-96 md:h-96">
                            {/* Image Mask / Shape */}
                            <div className="absolute inset-0 bg-slate-200 rounded-full border-4 border-white shadow-[0px_0px_0px_2px_rgba(26,26,26,1)] overflow-hidden">
                                <Image
                                    src="/maker-portrait.jpg"
                                    alt="Sneha Lal - Maker of Elysia"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Sticker/Tape Element */}
                            <div className="absolute bottom-4 -left-4 bg-[#e6d5c3] border-2 border-sketch-outline px-4 py-2 font-bold font-caveat shadow-[4px_4px_0px_rgba(0,0,0,0.8)] -rotate-3 text-lg">
                                Original Sketches
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
