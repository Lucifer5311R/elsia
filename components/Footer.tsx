import Container from "./Container";
import { Instagram, Linkedin, Twitter } from "lucide-react";
// Twitter is often used as X, but Lucide has a Twitter icon. Or I can check if TikTok is available. 
// Lucide might not have TikTok. I'll use Twitter for now.

export default function Footer() {
    return (
        <footer className="bg-[#3D4C41] text-white py-16 relative overflow-hidden">
            {/* Background Texture Overlay (optional) */}
            <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')]"></div>

            <Container>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-caveat mb-4">
                        Join the Sketch Club
                    </h2>
                    <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
                        Get 10% off your first order and exclusive peeks at new doodles.
                    </p>

                    <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-16">
                        <input
                            type="email"
                            placeholder="Your email here..."
                            className="flex-1 bg-white/10 border border-emerald-400/30 rounded-full px-6 py-3 text-white placeholder:text-emerald-200/50 focus:outline-none focus:border-primary transition"
                        />
                        <button
                            type="submit"
                            className="bg-[#C68E5D] text-white font-bold rounded-full px-8 py-3 hover:bg-[#B57D4C] transition shadow-lg"
                        >
                            Subscribe
                        </button>
                    </form>

                    <div className="border-t border-emerald-400/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-emerald-200/60 text-sm">
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition">Instagram</a>
                            <a href="#" className="hover:text-white transition">Pinterest</a>
                            <a href="#" className="hover:text-white transition">TikTok</a>
                        </div>

                        <p>© 2026 ELYSIA. Designed with love and charcoal.</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
