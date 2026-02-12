'use client';

import Container from "@/components/Container";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CartPage() {
    const { items, isLoading, removeFromCart, updateQuantity } = useCart();
    const [user, setUser] = useState<any>(null);
    const [creatingOrder, setCreatingOrder] = useState(false);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }: any) => setUser(user));
    }, []);

    const subtotal = items.reduce((sum, item) => sum + (item.products.price * item.quantity), 0);
    const shipping = 0; // Free shipping logic can vary
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        setCreatingOrder(true);
        try {
            // 1. Create Order
            const { data: orderData, error: orderError } = await (supabase
                .from('orders') as any) // Type casting due to strict types
                .insert({
                    user_id: user.id,
                    total_amount: total,
                    status: 'pending'
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Order Items
            const orderItems = items.map(item => ({
                order_id: orderData.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price_at_time: item.products.price
            }));

            const { error: itemsError } = await (supabase
                .from('order_items') as any) // Type casting
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3. Clear Cart
            // Faster to delete by user_id
            await (supabase
                .from('cart_items') as any)
                .delete()
                .eq('user_id', user.id);

            // Force fetch to update UI immediately
            await Promise.all(items.map(async (item) => {
                // Context will auto-update if we trigger fetch, but manual clear is safer for UI
                removeFromCart(item.id);
            }));


            // 4. Redirect to WhatsApp with formatted message
            const phoneNumber = "7510336340";

            // Fetch profile for formatted message
            const { data: profile } = await (supabase
                .from('profiles') as any)
                .select('full_name, address_line1, city, pincode, phone')
                .eq('id', user.id)
                .single();

            const customerName = profile?.full_name || user.user_metadata?.full_name || 'Valued Customer';
            const address = profile?.address_line1 ? `\n*Shipping Address:*\n${profile.address_line1}, ${profile.city || ''} - ${profile.pincode || ''}` : '';
            const customerPhone = profile?.phone || '';

            let message = `*New Order #${orderData.id}*\n`;
            message += `--------------------------------\n`;
            message += `*Customer:* ${customerName}\n`;
            if (customerPhone) message += `*Phone:* ${customerPhone}\n`;
            if (address) message += `${address}\n`;
            message += `--------------------------------\n`;
            message += `*Items:*\n`;

            items.forEach(item => {
                message += `• ${item.products.name} (x${item.quantity}) - Rs. ${item.products.price * item.quantity}\n`;
            });

            message += `--------------------------------\n`;
            message += `*TOTAL PAYABLE: Rs. ${total}*\n`;
            message += `--------------------------------\n`;
            message += `\nI would like to confirm this order. Please send me payment details.`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

        } catch (error: any) {
            console.error('Checkout error:', error);
            alert('Something went wrong creating your order. Please try again.');
        } finally {
            setCreatingOrder(false);
        }
    };

    if (isLoading) {
        return (
            <div className="py-20 min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="py-20 min-h-screen bg-background text-center px-4">
                <Container>
                    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h2 className="text-2xl font-caveat font-bold mb-2">Please Log In</h2>
                        <p className="text-slate-500 mb-6">You need to be logged in to view your cart.</p>
                        <Link href="/login" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition w-full md:w-auto">
                            Log In
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="py-12 md:py-20 bg-background min-h-screen">
            <Container>
                <h1 className="text-4xl font-bold font-caveat mb-8 text-center">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center bg-white p-8 md:p-12 rounded-2xl border border-dashed border-slate-200 max-w-2xl mx-auto mx-4">
                        <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-500 text-lg mb-6">Your cart is empty.</p>
                        <Link href="/shop" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">
                            Browse Shop <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row gap-4 items-center">
                                    <div className="w-full sm:w-24 h-48 sm:h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {item.products.image_url && (
                                            <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <h3 className="font-caveat text-xl font-bold">{item.products.name}</h3>
                                        <p className="text-slate-500 text-sm">Rs. {item.products.price}</p>
                                    </div>
                                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                            title="Remove Item"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
                                <h3 className="text-xl font-bold font-caveat mb-4">Order Summary</h3>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center text-slate-600">
                                        <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                        <span className="font-mono">Rs. {subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-600">
                                        <span>Delivery</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                </div>
                                <div className="border-t border-dashed border-slate-200 pt-4 flex justify-between items-center mb-6">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-xl text-primary font-mono">Rs. {total}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={creatingOrder}
                                    className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/20 hover:shadow-xl hover:scale-[1.02] transition active:scale-[0.98] font-caveat text-xl tracking-wide flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {creatingOrder ? 'Processing...' : (
                                        <>
                                            <span>Checkout on WhatsApp</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-center text-slate-400 mt-3">
                                    You'll be redirected to WhatsApp to confirm your order details securely.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
