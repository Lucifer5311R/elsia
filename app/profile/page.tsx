'use client';

import Container from "@/components/Container";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, LogOut, Edit2 } from "lucide-react";
import Link from "next/link";

type Profile = {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    state: string | null;
    pincode: string | null;
};

type Order = {
    id: number;
    total_amount: number;
    status: string;
    created_at: string;
    order_items: {
        quantity: number;
        products: {
            name: string;
            image_url: string | null;
        } | null;
    }[];
};

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'details' | 'orders' | 'address'>('orders');
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    // Form states
    const [formData, setFormData] = useState<Partial<Profile>>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);

            // Fetch Profile
            const { data: profileData } = await (supabase
                .from('profiles') as any)
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileData) {
                setProfile(profileData);
                setFormData(profileData);
            } else {
                // If no profile exists, create a basic one from auth metadata
                const newProfile = {
                    id: user.id,
                    full_name: user.user_metadata?.full_name || '',
                    avatar_url: user.user_metadata?.avatar_url || '',
                    phone: user.user_metadata?.phone || '',
                };
                setProfile(newProfile as Profile);
                setFormData(newProfile);
            }

            // Fetch Orders
            const { data: ordersData } = await (supabase
                .from('orders') as any)
                .select(`
                    *,
                    order_items (
                        quantity,
                        products (
                            name,
                            image_url
                        )
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (ordersData) {
                setOrders(ordersData);
            }

            setLoading(false);
        };

        getUserData();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        const { error } = await (supabase
            .from('profiles') as any)
            .upsert({
                id: user.id,
                ...formData,
                updated_at: new Date().toISOString()
            });

        if (error) {
            alert('Error saving profile: ' + error.message);
        } else {
            setProfile(formData as Profile);
            setIsEditing(false);
            alert('Profile updated successfully!');
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="py-20 min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="py-20 bg-background min-h-screen">
            <Container>
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 bg-slate-100 rounded-full mb-4 overflow-hidden border-2 border-white shadow-md">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <User className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                                <h2 className="font-caveat text-2xl font-bold text-center">{profile?.full_name || user?.email}</h2>
                                <p className="text-xs text-slate-500 truncate w-full text-center">{user?.email}</p>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    <Package className="w-5 h-5" /> My Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'details' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    <User className="w-5 h-5" /> Personal Details
                                </button>
                                <button
                                    onClick={() => setActiveTab('address')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'address' ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    <MapPin className="w-5 h-5" /> Address Book
                                </button>
                                <hr className="my-2 border-slate-100" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" /> Log Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-3">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm min-h-[500px]">
                            {activeTab === 'orders' && (
                                <div>
                                    <h2 className="text-2xl font-caveat font-bold mb-6">Order History</h2>
                                    {orders.length === 0 ? (
                                        <div className="text-center py-12 text-slate-400">
                                            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p>No orders yet. Time to go shopping!</p>
                                            <Link href="/shop" className="text-primary hover:underline mt-2 inline-block">Browse Shop</Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div key={order.id} className="border border-slate-100 rounded-xl p-4 hover:border-primary/20 transition-colors">
                                                    <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-2">
                                                        <div>
                                                            <p className="text-xs text-slate-400 uppercase tracking-wider">Order #{order.id}</p>
                                                            <p className="text-sm font-medium text-slate-600">{new Date(order.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-lg">Rs. {order.total_amount}</p>
                                                            <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {order.order_items.map((item, idx) => (
                                                            <div key={idx} className="flex items-center gap-4 text-sm">
                                                                <div className="w-10 h-10 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                                                                    {item.products?.image_url && <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="font-medium">{item.products?.name}</p>
                                                                    <p className="text-slate-500">Qty: {item.quantity}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {(activeTab === 'details' || activeTab === 'address') && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-caveat font-bold">
                                            {activeTab === 'details' ? 'Personal Details' : 'Shipping Address'}
                                        </h2>
                                        {!isEditing && (
                                            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-primary hover:underline text-sm font-bold">
                                                <Edit2 className="w-4 h-4" /> Edit
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-6 max-w-lg">
                                        {activeTab === 'details' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.full_name || ''}
                                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:text-slate-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone || ''}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:text-slate-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Avatar URL</label>
                                                    <input
                                                        type="text"
                                                        value={formData.avatar_url || ''}
                                                        onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:text-slate-500"
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {activeTab === 'address' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Address Line 1</label>
                                                    <input
                                                        type="text"
                                                        value={formData.address_line1 || ''}
                                                        onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:text-slate-500"
                                                        placeholder="House No, Building, Street"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Address Line 2 (Optional)</label>
                                                    <input
                                                        type="text"
                                                        value={formData.address_line2 || ''}
                                                        onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:text-slate-500"
                                                        placeholder="Area, Landmark"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                                        <input
                                                            type="text"
                                                            value={formData.city || ''}
                                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                            disabled={!isEditing}
                                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:text-slate-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                                                        <input
                                                            type="text"
                                                            value={formData.state || ''}
                                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                            disabled={!isEditing}
                                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:text-slate-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Pincode</label>
                                                    <input
                                                        type="text"
                                                        value={formData.pincode || ''}
                                                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:text-slate-500"
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {isEditing && (
                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    onClick={handleSaveProfile}
                                                    disabled={saving}
                                                    className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                                                >
                                                    {saving ? 'Saving...' : 'Save Changes'}
                                                </button>
                                                <button
                                                    onClick={() => { setIsEditing(false); setFormData(profile || {}); }}
                                                    className="px-6 py-2 rounded-lg border border-slate-200 font-bold hover:bg-slate-50 transition-colors text-slate-600"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
