const customerCare = {
    sectionTitle: "Customer Care",
    links: ["Help Center", "How to Buy", "Shipping & Delivery", "International Product Policy", "How to Return", "Question?", "Contact Us"]
};

const aboutUs = {
    sectionTitle: "About",
    links: ["About PinoyCart", "Afﬁliate Program", "Careers", "Terms & Conditions", "Privacy Policy", "Press & Media", "Intellectual Property Protection"]
};

const payments = {
    sectionTitle: "Payments",
    links: ["VISA", "GCash", "Coins.ph", "Binance", "Paymaya", "PayPal"]
};

const Footer = () => {
    return (
        <footer className="bg-secondary">
            <div className="container">
                <div className="container px-5 py-8 gap-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

                    <div className="flex basis-1/4 flex-col flex-wrap text-left">
                        <h2 className="title-font font-medium text-primary text-xl mb-3">PinoyCart</h2>
                        <span className="text-secondary-foreground/50">
                            PinoyCart is more than just a marketplace; it's a celebration of Filipino talent and a way to connect with your roots.
                        </span>
                    </div>

                    <div className="flex basis-1/4 flex-col flex-wrap text-left">
                        <h2 className="title-font font-medium text-primary text-lg mb-3">{customerCare.sectionTitle}</h2>
                        <nav className="list-none">
                            {
                                customerCare.links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-secondary-foreground/50 hover:text-primary">{link}</a>
                                    </li>
                                ))
                            }
                        </nav>
                    </div>

                    <div className="flex basis-1/4 flex-col flex-wrap text-left">
                        <h2 className="title-font font-medium text-primary text-lg mb-3">{aboutUs.sectionTitle}</h2>
                        <nav className="list-none">
                            {
                                aboutUs.links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-secondary-foreground/50 hover:text-primary">{link}</a>
                                    </li>
                                ))
                            }
                        </nav>
                    </div>

                    <div className="flex basis-1/4 flex-col flex-wrap text-left">
                        <h2 className="title-font font-medium text-primary text-lg mb-3">{payments.sectionTitle}</h2>
                        <nav className="list-none">
                            {
                                payments.links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-secondary-foreground/50 hover:text-primary">{link}</a>
                                    </li>
                                ))
                            }
                        </nav>
                    </div>
                </div>

                <div className="bg-secondary">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 Sharks Solutions —
                            <a href="https://instagram.com/kukisnotqt" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@kukisnotqt</a>
                        </p>
                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                            <a className="text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
