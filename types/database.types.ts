export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            categories: {
                Row: {
                    id: number
                    name: string
                    slug: string
                    image_url: string | null
                    created_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    slug: string
                    image_url?: string | null
                    created_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    slug?: string
                    image_url?: string | null
                    created_at?: string
                }
            }
            products: {
                Row: {
                    id: number
                    name: string
                    slug: string
                    description: string | null
                    price: number
                    category_id: number | null
                    image_url: string | null
                    is_featured: boolean
                    is_sale: boolean
                    created_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    slug: string
                    description?: string | null
                    price: number
                    category_id?: number | null
                    image_url?: string | null
                    is_featured?: boolean
                    is_sale?: boolean
                    created_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    slug?: string
                    description?: string | null
                    price?: number
                    category_id?: number | null
                    image_url?: string | null
                    is_featured?: boolean
                    is_sale?: boolean
                    created_at?: string
                }
            }
            posts: {
                Row: {
                    id: number
                    title: string
                    slug: string
                    excerpt: string | null
                    content: string | null
                    image_url: string | null
                    published_at: string | null
                    created_at: string
                }
                Insert: {
                    id?: number
                    title: string
                    slug: string
                    excerpt?: string | null
                    content?: string | null
                    image_url?: string | null
                    published_at?: string | null
                    created_at?: string
                }
                Update: {
                    id?: number
                    title?: string
                    slug?: string
                    excerpt?: string | null
                    content?: string | null
                    image_url?: string | null
                    published_at?: string | null
                    created_at?: string
                }
            }
            cart_items: {
                Row: {
                    id: number
                    user_id: string
                    product_id: number
                    quantity: number
                    created_at: string
                }
                Insert: {
                    id?: number
                    user_id: string
                    product_id: number
                    quantity?: number
                    created_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string
                    product_id?: number
                    quantity?: number
                    created_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    avatar_url: string | null
                    phone: string | null
                    address_line1: string | null
                    address_line2: string | null
                    city: string | null
                    state: string | null
                    pincode: string | null
                    updated_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    address_line1?: string | null
                    address_line2?: string | null
                    city?: string | null
                    state?: string | null
                    pincode?: string | null
                    updated_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    address_line1?: string | null
                    address_line2?: string | null
                    city?: string | null
                    state?: string | null
                    pincode?: string | null
                    updated_at?: string
                }
            }
            orders: {
                Row: {
                    id: number
                    user_id: string
                    total_amount: number
                    status: string
                    created_at: string
                }
                Insert: {
                    id?: number
                    user_id: string
                    total_amount: number
                    status?: string
                    created_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string
                    total_amount?: number
                    status?: string
                    created_at?: string
                }
            }
            order_items: {
                Row: {
                    id: number
                    order_id: number
                    product_id: number | null
                    quantity: number
                    price_at_time: number
                    created_at: string
                }
                Insert: {
                    id?: number
                    order_id: number
                    product_id?: number | null
                    quantity: number
                    price_at_time: number
                    created_at?: string
                }
                Update: {
                    id?: number
                    order_id?: number
                    product_id?: number | null
                    quantity?: number
                    price_at_time?: number
                    created_at?: string
                }
            }
        }
    }
}
