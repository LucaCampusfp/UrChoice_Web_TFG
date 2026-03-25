import { Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";
import heroCards from "@/assets/hero-cards.webp";

const CTASection = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(0 0% 4%), hsl(180 100% 20% / 0.3), hsl(0 0% 4%))" }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={heroCards} alt="" width={400} height={400} className="opacity-15 animate-float" aria-hidden="true" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-bold text-foreground mb-3"
        >
          Ur<span className="text-gradient">Choice</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-xl text-muted-foreground mb-8"
        >
          Which will be your choice?
        </motion.p>
        <motion.a
          href="https://urchoice.es"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-display font-semibold text-lg text-primary-foreground transition-all duration-300 hover:scale-105 glow-cyan"
          style={{ background: "var(--gradient-cta)" }}
        >
        <Gamepad2 size={22} className="text-black"/>
          <span className="text-black">Play now</span>
        </motion.a>
      </div>
    </section>
  );
};

export default CTASection;