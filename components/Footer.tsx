import Container from "./Container";

export default function Footer() {
    return (
        <footer className="border-t mt-16">
            <Container>
                <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>Handmade gifting with love 🤍</p>

                    <div className="flex gap-4">
                        <a href="#" target="_blank">Instagram</a>
                        <a href="https://wa.me/91XXXXXXXXXX" target="_blank">
                            WhatsApp
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
