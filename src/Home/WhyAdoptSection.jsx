import React from "react";
import { FaPaw, FaHeart, FaGlobeAmericas } from "react-icons/fa";

const WhyAdoptSection = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-20 text-center">
            <h2 className="text-4xl font-extrabold mb-8 text-primary">
                Why Adopt from PawMart?
            </h2>
            <p className="max-w-3xl mx-auto text-neutral text-lg leading-relaxed mb-12">
                Every adoption changes two lives — the pet’s and yours. At PawMart, we believe in
                giving rescued and abandoned pets a second chance to find a loving home.
                When you adopt, you help reduce animal homelessness and make space for
                others in need. Choose compassion. Choose adoption.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="p-6 bg-base-100 border border-base-200 rounded-2xl shadow-md hover:shadow-lg transition-all">
                    <div className="flex justify-center mb-4">
                        <FaPaw className="text-primary" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">Save a Life</h3>
                    <p className="text-neutral text-sm">
                        Adopting means giving a pet a second chance at happiness and safety.
                    </p>
                </div>

                <div className="p-6 bg-base-100 border border-base-200 rounded-2xl shadow-md hover:shadow-lg transition-all">
                    <div className="flex justify-center mb-4">
                        <FaHeart className="text-secondary" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">Lifelong Love</h3>
                    <p className="text-neutral text-sm">
                        Rescued pets are grateful companions who form strong emotional bonds.
                    </p>
                </div>

                <div className="p-6 bg-base-100 border border-base-200 rounded-2xl shadow-md hover:shadow-lg transition-all">
                    <div className="flex justify-center mb-4">
                        <FaGlobeAmericas className="text-accent" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">Make a Difference</h3>
                    <p className="text-neutral text-sm">
                        Adoption reduces demand for unethical breeding and promotes kindness.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyAdoptSection;
