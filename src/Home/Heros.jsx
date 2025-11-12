import React from "react";

const heroes = [
    {
        name: "Ayesha Rahman",
        role: "Adopted 3 rescue dogs",
        image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=500",
        quote:
            "Every rescue deserves a chance — my dogs have taught me unconditional love.",
    },
    {
        name: "Farhan Karim",
        role: "Cat Care Volunteer",
        image: "https://images.unsplash.com/photo-1603415526960-f7e0328b3bbf?w=500",
        quote:
            "Helping abandoned cats find homes has been one of my life’s greatest joys.",
    },
    {
        name: "Nadia Hasan",
        role: "Animal Shelter Manager",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500",
        quote:
            "Each adoption is a victory — a new start for both the pet and the adopter.",
    },
    {
        name: "Rafiul Islam",
        role: "Volunteer & Foster Parent",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
        quote:
            "Fostering has filled my home with joy and given me a purpose beyond myself.",
    },
];

const Heros = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h2 className="text-4xl font-extrabold mb-8 text-primary">
                Meet Our Pet Heroes
            </h2>
            <p className="max-w-3xl mx-auto text-neutral text-lg leading-relaxed mb-12">
                These incredible people have opened their hearts and homes to animals in
                need. They remind us that kindness and compassion can change the world —
                one paw at a time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {heroes.map((hero) => (
                    <div
                        key={hero.name}
                        className="bg-base-100 border border-base-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                    >
                        <img
                            src={hero.image}
                            alt={hero.name}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-primary mb-1">
                                {hero.name}
                            </h3>
                            <p className="text-sm text-secondary mb-2">{hero.role}</p>
                            <p className="text-sm text-neutral italic">“{hero.quote}”</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Heros;
