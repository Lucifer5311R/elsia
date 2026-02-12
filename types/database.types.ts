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
        }
    }
}
