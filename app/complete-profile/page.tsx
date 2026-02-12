'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@/components/Container';

function CompleteProfileContent() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const nextUrl = searchParams.get('next') || '/';

    useEffect(() => {
        // Check if verify user is logged in
        supabase.auth.getSession().then(({ data: { session } }: any) => {
            if (!session) {
                router.push('/login');
            }
        });
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setError('No user found');
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({
            data: { phone: phone }
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push(nextUrl);
            router.refresh();
        }
    };

    return (
        <div className="py-20 bg-background min-h-screen flex items-center justify-center">
            <Container>
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h1 className="text-3xl font-bold font-caveat mb-6 text-center">One Last Thing!</h1>
                    <p className="text-muted-foreground text-center mb-6">
                        Please update your phone number to complete your profile.
                    </p>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition active:scale-[0.98] font-caveat text-xl tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : 'Complete Profile'}
                        </button>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default function CompleteProfilePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CompleteProfileContent />
        </Suspense>
    );
}
