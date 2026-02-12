'use client';

import Link from "next/link";
import Container from "./Container";
import { ShoppingBag, User, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { itemCount } = useCart();

    useEffect(() => {
        // Check initial user
        supabase.auth.getUser().then(({ data: { user } }: any) => {
            setUser(user);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="w-full border-b-2 border-sketch-outline sticky top-0 z-50 bg-background/95 backdrop-blur-sm sketch-border-bottom">
            <Container>
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link href="/" className="text-3xl font-bold font-caveat tracking-wide relative group z-50">
                        <span className="relative z-10">ELYSIA</span>
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/20 -skew-x-12 group-hover:bg-primary/40 transition-colors"></span>
                    </Link>

                    {/* Desktop Menu */}
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

                    {/* Icons & Mobile Toggle */}
                    <div className="flex items-center gap-4 z-50">
                        {user ? (
                            <Link
                                href="/profile"
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden md:block"
                                title="My Profile"
                            >
                                <User className="w-5 h-5" />
                            </Link>
                        ) : (
                            <Link href="/login" className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden md:block" title="Log In">
                                <User className="w-5 h-5" />
                            </Link>
                        )}

                        <Link href="/cart" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors group">
                            <ShoppingBag className="w-5 h-5 group-hover:text-primary transition-colors" />
                            {itemCount > 0 && (
                                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-in zoom-in duration-300">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu Overlay */}
                    {/* Mobile Menu Overlay */}
                    {isMenuOpen && (
                        <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-right duration-300">
                            <div className="flex justify-end p-6">
                                <button onClick={toggleMenu} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-8 h-8 text-slate-800" />
                                </button>
                            </div>
                            <div className="flex flex-col items-center justify-center flex-1 gap-8 pb-20">
                                <Link href="/" onClick={toggleMenu} className="text-4xl font-caveat font-bold text-primary mb-8">
                                    ELYSIA
                                </Link>
                                <Link href="/shop" onClick={toggleMenu} className="text-2xl font-medium tracking-wide hover:text-primary transition-colors">
                                    Shop
                                </Link>
                                <Link href="/about" onClick={toggleMenu} className="text-2xl font-medium tracking-wide hover:text-primary transition-colors">
                                    About
                                </Link>
                                <Link href="/journal" onClick={toggleMenu} className="text-2xl font-medium tracking-wide hover:text-primary transition-colors">
                                    Journal
                                </Link>
                                <div className="w-12 h-1 bg-slate-100 rounded-full my-4"></div>
                                {user ? (
                                    <Link href="/profile" onClick={toggleMenu} className="flex items-center gap-3 text-xl font-medium tracking-wide text-primary">
                                        <User className="w-6 h-6" /> My Profile
                                    </Link>
                                ) : (
                                    <Link href="/login" onClick={toggleMenu} className="flex items-center gap-3 text-xl font-medium tracking-wide">
                                        <User className="w-6 h-6" /> Log In
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </nav>
    );
}

