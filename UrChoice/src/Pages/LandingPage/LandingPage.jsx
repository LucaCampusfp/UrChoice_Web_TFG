import React from "react";
import { Helmet } from "react-helmet-async";
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
            <Helmet>
                <title>UrChoice - Juego de cartas multijugador online</title>
                <meta
                    name="description"
                    content="UrChoice: juego de cartas multijugador online. Crea tu mazo, juega con amigos y descubre cartas populares."
                />
            </Helmet>

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