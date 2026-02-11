import Container from "../Container";

export default function Hero() {
    return (
        <section className="bg-background py-20">
            <Container>
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                        Handmade gifts for moments that matter 🤍
                    </h1>

                    <p className="mt-4 text-muted">
                        Scrunchies, polaroids & custom hampers made with love.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <a
                            href="https://wa.me/91XXXXXXXXXX"
                            target="_blank"
                            className="rounded-full bg-primary text-white px-6 py-3 text-sm"
                        >
                            Order on WhatsApp
                        </a>

                        <a
                            href="/collections"
                            className="rounded-full border px-6 py-3 text-sm"
                        >
                            View Collections
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}
