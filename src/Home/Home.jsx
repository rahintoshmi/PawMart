import React from 'react';
import Carousel from './Carousel';
import CategorySection from './CategorySection';
import RecentListings from './RecentListings';
import WhyAdoptSection from './WhyAdoptSection';
import Heros from './Heros';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <CategorySection></CategorySection>
            <RecentListings></RecentListings>
            <WhyAdoptSection></WhyAdoptSection>
            <Heros></Heros>
        </div>
    );
};

export default Home;