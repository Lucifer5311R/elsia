import Link from "next/link";
import Container from "./Container";

export default function Navbar() {
    return (
        <nav className="w-full border-b">
            <Container>
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className="text-xl font-semibold">
                        Elsia
                    </Link>

                    <div className="hidden md:flex gap-6 text-sm">
                        <Link href="/">Home</Link>
                        <Link href="/collections">Collections</Link>
                        <Link href="/custom-hampers">Custom Hampers</Link>
                        <Link href="/contact">Contact</Link>
                    </div>

                    <a
                        href="https://wa.me/91XXXXXXXXXX"
                        target="_blank"
                        className="rounded-full bg-black text-white px-4 py-2 text-sm"
                    >
                        Order Now
                    </a>
                </div>
            </Container>
        </nav>
    );
}
