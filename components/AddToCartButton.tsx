'use client';

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
    productId: number;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        await addToCart(productId);
        setIsAdding(false);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition active:scale-[0.98] flex items-center justify-center gap-2 font-caveat tracking-wide disabled:opacity-75 disabled:cursor-not-allowed"
        >
            <ShoppingBag className="w-5 h-5" />
            {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
    );
}
