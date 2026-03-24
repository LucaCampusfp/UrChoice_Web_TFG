import React from "react";

import Features from "../../Components/Features";
import LandingHeader from "../../Components/LandingHeader";
import HeroSection from "../../Components/HeroSection";
import Description from "../../Components/Description";
import CategoryCards from "../../Components/CategoryCards";
import NewPlayButton from "../../Components/NewPlayButton";
import Footer from "../../Components/Footer";
import '../LandingPage/LandingPage.css';

function LandingPage() {
    return (
        <>
            

            <LandingHeader />
            <HeroSection />
            <Description />
            <CategoryCards />
            <Features />
            <NewPlayButton />
            <Footer />
        </>
    );
}

export default LandingPage;