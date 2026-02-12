import Container from "../Container";
import { Plus } from "lucide-react";

const products = [
    {
        name: "Frames",
        category: "Home Decor",
        price: "Rs. 499",
        image: "/placeholder-frames.jpg",
    },
    {
        name: "Mini Frames",
        category: "Gifts",
        price: "Rs. 299",
        image: "/placeholder-mini-frames.jpg",
    },
    {
        name: "Doll",
        category: "Toys",
        price: "Rs. 899",
        image: "/placeholder-doll.jpg",
    },
    {
        name: "Key Chains",
        category: "Accessories",
        price: "Rs. 149",
        image: "/placeholder-keychains.jpg",
    },
];

export default function FreshFromSketchpad() {
    return (
        <section className="py-20 bg-orange-50/30 relative">
            {/* Decorative wavy top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg className="relative block w-[calc(100%+1.3px)] h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FAF9F6" stroke="none"></path>
                </svg>
            </div>

            <Container>
                <div className="text-center mb-16 relative">
                    <div className="inline-block relative">
                        <span className="absolute -top-6 -right-6 bg-white border border-sketch-outline px-2 py-1 text-sm font-caveat rotate-12 shadow-sm text-primary font-bold">
                            Just dropped!
                        </span>
                        <h2 className="text-4xl font-bold font-caveat tracking-wide">
                            Fresh From The Sketchpad
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.name} className="bg-white rounded-xl p-4 shadow-sm group hover:shadow-md transition border border-transparent hover:border-sketch-outline">
                            <div className="aspect-square bg-slate-100 rounded-lg mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-caveat text-xl">
                                    {product.name}
                                </div>
                                <button className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-primary border border-gray-100 hover:scale-110 transition">
                                    <Plus className="w-5 h-5" />
                                </button>
                                {product.name === "Doll" && (
                                    <span className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-sm">
                                        Sale
                                    </span>
                                )}
                            </div>

                            <div>
                                <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-muted-foreground text-sm">{product.category}</p>
                                    <p className="font-bold text-primary font-caveat text-lg">{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>

            {/* Decorative wavy bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-[calc(100%+1.3px)] h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FAF9F6" stroke="none"></path>
                </svg>
            </div>
        </section>
    );
}
