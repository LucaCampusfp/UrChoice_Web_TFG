import React from "react";
import { Helmet } from "react-helmet-async";
import FeaturesSection from "../../Components/FeaturesSection";
import Navbar from "../../Components/Navbar";
import HeroSection from "../../Components/HeroSection";
import DescriptionSection from "../../Components/DescriptionSection";
import CategoriesSection from "../../Components/CategoriesSection";
import CTASection from "../../Components/CTASection";
import Footer from "../../Components/Footer";


function LandingPage() {
    return (
        <>
            <Helmet>
                <title>UrChoice - Juego de cartas multijugador online</title>
                <meta
                    name="description"
                    content="UrChoice: juego de cartas multijugador online. Crea tu mazo, juega con amigos y descubre cartas populares."
                />
            </Helmet>

            <Navbar />
            <HeroSection />
            <DescriptionSection />
            <CategoriesSection />
            <FeaturesSection />
            <CTASection />
  
            <Footer />
        </>
    );
}

export default LandingPage;