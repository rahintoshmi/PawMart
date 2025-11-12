import React, { useState } from "react";
import img1 from '../assets/pets.png';
import img2 from '../assets/adoption.png';
import img3 from '../assets/happyowner.png';

const slides = [
    {
        img: img1,
        text: "Find Your Furry Friend Today!",
    },
    {
        img: img2,
        text: "Adopt, Don’t Shop — Give a Pet a Home.",
    },
    {
        img: img3,
        text: "Because Every Pet Deserves Love and Care.",
    },
];

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((current - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrent((current + 1) % slides.length);
    };

    return (
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={slide.img}
                        alt={slide.text}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h2 className="text-white text-2xl md:text-4xl font-bold text-center px-4 animate-fadeIn">
                            {slide.text}
                        </h2>
                    </div>
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="absolute left-5 top-1/2 -translate-y-1/2 btn btn-circle bg-primary text-white outline-none"
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 -translate-y-1/2 btn btn-circle bg-primary text-white outline-none"
            >
                ❯
            </button>
        </div>
    );
};

export default Carousel;
