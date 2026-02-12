import Link from "next/link";
import Container from "./Container";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full border-b-2 border-sketch-outline sticky top-0 z-50 bg-background/95 backdrop-blur-sm sketch-border-bottom">
            <Container>
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className="text-3xl font-bold font-caveat tracking-wide relative group">
                        <span className="relative z-10">ELYSIA</span>
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/20 -skew-x-12 group-hover:bg-primary/40 transition-colors"></span>
                    </Link>

                    <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                        <Link href="/shop" className="hover:text-primary transition-colors relative group">
                            Shop
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="/about" className="hover:text-primary transition-colors relative group">
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                        <Link href="/journal" className="hover:text-primary transition-colors relative group">
                            Journal
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </Container>
        </nav>
    );
}
