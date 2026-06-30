import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact" className="pt-[100px] pb-[50px] border-t border-[#222] text-center w-full box-border">
            <div className="max-w-[1400px] mx-auto px-[5vw] grid grid-cols-1 md:grid-cols-3 gap-[50px] mb-[100px] text-center md:text-left">
                <div className="flex flex-col gap-2">
                    <h4 className="text-gold font-display text-[1.2rem] mb-[20px]">Visit Us</h4>
                    <p className="text-grey mb-[10px]">Near AM Honda, Bypass Road</p>
                    <p className="text-grey mb-[10px]">Thurakkkal, Manjeri 676121</p>
                    <br />
                    <a
                        href="https://maps.app.goo.gl/eDcA2jaNaWMSP3Dy6"
                        className="text-gold hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Get Directions →
                    </a>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text-gold font-display text-[1.2rem] mb-[20px]">
                        Opening Hours
                    </h4>
                    <p className="text-grey mb-[10px]">Sat - Thu</p>
                    <p className="text-grey mb-[10px]">10:30 AM - 10:30 PM</p>
                    <p className="text-grey mb-[10px]">Fri - 01:30 PM - 10:30 PM</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="text-gold font-display text-[1.2rem] mb-[20px]">Contact</h4>
                    <p className="text-grey mb-[10px]">+91 91882 22233</p>
                    <p className="text-grey mb-[10px]">brownbeans@cafe.com</p>
                    <div className="mt-[20px]">
                        <a
                            href="tel:9188222233"
                            className="inline-block px-[20px] py-[10px] text-[0.8rem] border border-grey text-white rounded-[50px] relative overflow-hidden transition-all duration-300 hover:text-black hover:border-gold z-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0 after:bg-gold after:-z-10 after:transition-all after:duration-300 hover:after:h-full"
                        >
                            Call Now
                        </a>
                    </div>
                </div>
            </div>

            <div className="font-display text-[18vw] md:text-[10vw] text-[#222] -mb-[30px] select-none leading-none">
                BROWN BEANS
            </div>
        </footer>
    );
}
