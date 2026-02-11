import Container from "../Container";

const categories = [
    {
        title: "Scrunchies",
        description: "Soft, stylish & handmade",
    },
    {
        title: "Polaroids",
        description: "Memories you can hold",
    },
    {
        title: "Custom Hampers",
        description: "Perfectly curated gifts",
    },
];

export default function Categories() {
    return (
        <section className="py-16">
            <Container>
                <h2 className="text-2xl font-semibold mb-8">
                    Our Collections
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.title}
                            className="rounded-2xl border p-6 hover:shadow-sm transition"
                        >
                            <h3 className="text-lg font-medium">{cat.title}</h3>
                            <p className="text-sm text-muted mt-2">
                                {cat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
