
import { motion } from "framer-motion";

const DescriptionSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="font-body text-xl md:text-2xl text-foreground leading-relaxed italic">
            "In UrChoice, create your own deck of cards with custom categories,
            play with friends, and discover the community's favorite cards."
          </p>
          <cite className="block mt-6 font-body text-primary text-sm tracking-widest uppercase not-italic">
            — Development team
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default DescriptionSection;
