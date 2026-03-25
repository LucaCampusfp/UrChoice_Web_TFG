import { Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";
import heroCards from "@/assets/hero-cards.webp";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Floating cards illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img
          src={heroCards}
          alt="UrChoice cartas coleccionables"
          width={700}
          height={100}
          className="opacity-30 animate-float"
        />
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-4"
        >
          Ur<span className="text-gradient">Choice</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-xl md:text-2xl text-muted-foreground mb-8"
        >
          Which will be your choice?
        </motion.p>

        <motion.a
          href="https://urchoice.es"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-display font-semibold text-lg text-primary-foreground transition-all duration-300 hover:scale-105 glow-cyan"
          style={{ background: "var(--gradient-cta)" }}
        >
          <Gamepad2 size={22} className="text-black"/>
          <span className="text-black">Play now</span>
        </motion.a>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
