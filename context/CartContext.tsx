'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

type CartItem = {
    id: number;
    product_id: number;
    quantity: number;
    products: {
        name: string;
        price: number;
        image_url: string | null;
        slug: string;
    };
};

type CartContextType = {
    items: CartItem[];
    itemCount: number;
    isLoading: boolean;
    addToCart: (productId: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
};

const defaultContext: CartContextType = {
    items: [],
    itemCount: 0,
    isLoading: true,
    addToCart: async () => { },
    removeFromCart: async () => { },
    updateQuantity: async () => { }
};

const CartContext = createContext<CartContextType>(defaultContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    // Fetch user and cart on mount
    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }: any) => {
            setUser(user);
            if (user) fetchCart(user.id);
            else setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchCart(session.user.id);
            } else {
                setItems([]);
                setIsLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchCart = async (userId: string) => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
                id,
                product_id,
                quantity,
                products (
                    name,
                    price,
                    image_url,
                    slug
                )
            `)
            .eq('user_id', userId);

        if (error) console.error('Error fetching cart:', error);
        else setItems(data as unknown as CartItem[]);
        setIsLoading(false);
    };

    const router = useRouter();
    const pathname = usePathname();

    // ... (existing code)

    const addToCart = async (productId: number) => {
        if (!user) {
            router.push(`/login?next=${encodeURIComponent(pathname)}`);
            return;
        }

        // Optimistic UI update could happen here, but for now let's ensure backend sync
        // Check if item already exists in LOCALLY cached items first
        const existingItem = items.find(item => item.product_id === productId);

        if (existingItem) {
            await updateQuantity(existingItem.id, existingItem.quantity + 1);
        } else {
            const { data, error } = await (supabase
                .from('cart_items') as any)
                .insert({
                    user_id: user.id,
                    product_id: productId,
                    quantity: 1
                } as any)
                .select()
                .single();

            if (error) {
                console.error('Error adding to cart:', error);
                alert(`Error adding to cart: ${error.message}`);
            } else {
                // Force fetch to get the relational data (product details)
                await fetchCart(user.id);
                // Also show a visual indicator if possible, but the context update should trigger re-renders
                // We can assume success if we got here
            }
        }
    };

    const removeFromCart = async (itemId: number) => {
        if (!user) return;

        // Optimistic
        setItems(prev => prev.filter(item => item.id !== itemId));

        const { error } = await (supabase
            .from('cart_items') as any)
            .delete()
            .eq('id', itemId);

        if (error) {
            console.error('Error removing from cart:', error);
            // Revert if error (omitted for brevity, but good practice)
            fetchCart(user.id);
        }
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        if (!user) return;
        if (quantity < 1) return;

        // Optimistic update
        setItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, quantity } : item
        ));

        const { error } = await (supabase
            .from('cart_items') as any)
            .update({ quantity } as any)
            .eq('id', itemId);

        if (error) {
            console.error('Error updating cart:', error);
            fetchCart(user.id); // Revert on error
        }
    };

    return (
        <CartContext.Provider value={{
            items,
            itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
            isLoading,
            addToCart,
            removeFromCart,
            updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
