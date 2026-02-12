const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load env
const envPath = path.resolve(__dirname, '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
    console.log("Checking database tables...");

    // Check products (should be public)
    const { data: products, error: productsError } = await supabase.from('products').select('count', { count: 'exact', head: true });
    if (productsError) console.error("Error connecting to products:", productsError.message);
    else console.log("✅ Products table exists.");

    // Check cart_items (RLS enabled, but check for existence)
    const { error: cartError } = await supabase.from('cart_items').select('count', { count: 'exact', head: true });

    if (cartError) {
        if (cartError.code === '42P01') {
            console.error("❌ 'cart_items' table DOES NOT EXIST. Please run the SQL migration.");
        } else {
            console.log("✅ 'cart_items' table exists (Access restricted as expected: " + cartError.message + ")");
        }
    } else {
        console.log("✅ 'cart_items' table exists and is readable (Unexpected if RLS is on for anon, but table exists).");
    }

    // Check categories
    const { error: catError } = await supabase.from('categories').select('count', { count: 'exact', head: true });
    if (catError) console.error("Error categories:", catError.message);
    else console.log("✅ Categories table exists.");
}

checkTables();
