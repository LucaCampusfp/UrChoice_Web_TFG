import { motion } from "framer-motion";
import featureMultiplayer from "@/assets/feature-multiplayer.jpg";
import featureDecks from "@/assets/feature-decks.jpg";
import featureCollection from "@/assets/feature-collection.jpg";

const features = [
  {
    title: "Multiplayer",
    image: featureMultiplayer,
    description:
      "Disfruta de una experiencia multijugador única donde puedes jugar con amigos o jugadores de todo el mundo votando por tus cartas favoritas. Cada partida es una oportunidad para descubrir cuáles cartas se destacan en la comunidad y ver cómo evolucionan las clasificaciones en tiempo real.",
  },
  {
    title: "Custom Decks",
    image: featureDecks,
    description:
      "Crea mazos personalizados y únicos eligiendo entre una amplia selección de cartas. Personaliza cada detalle de tu mazo, desde el nombre hasta los colores y los iconos, para que refleje tu estilo y estrategia personal.",
  },
  {
    title: "Card Collection",
    image: featureCollection,
    description:
      "Explora una vasta colección de cartas, incluyendo rarezas, temas especiales y ediciones limitadas. Construye tu colección definitiva desbloqueando nuevas cartas a través de logros, eventos especiales y recompensas diarias.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Game <span className="text-gradient">Features</span>
        </motion.h2>

        <div className="space-y-24">
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden border border-border glow-cyan">
                  <img
                    src={feature.image}
                    alt={`${feature.title} - UrChoice feature`}
                    width={768}
                    height={512}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;