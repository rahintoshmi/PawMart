import React, { useState } from "react";
import img1 from '../assets/pets.png';
import img2 from '../assets/adoption.png';
import img3 from '../assets/happyowner.png';

const slides = [
    { img: img1, text: "Find Your Furry Friend Today!" },
    { img: img2, text: "Adopt, Don’t Shop — Give a Pet a Home." },
    { img: img3, text: "Because Every Pet Deserves Love and Care." },
];

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);
    const nextSlide = () => setCurrent((current + 1) % slides.length);

    return (
        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"}`}
                >
                    <img
                        src={slide.img}
                        alt={slide.text}
                        className="w-full h-full object-cover bg-cover object-fit center"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
                        <h2 className="text-white font-bold text-md md:text-2xl lg:text-3xl text-center leading-snug md:leading-normal">
                            {slide.text}
                        </h2>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 btn btn-circle bg-primary text-white outline-none"
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 btn btn-circle bg-primary text-white outline-none"
            >
                ❯
            </button>
        </div>
    );
};

export default Carousel;
