import { motion } from "framer-motion";
import categoryFootball from "@/assets/category-football.jpg";
import categoryFate from "@/assets/category-fate.jpg";
import categoryAnime from "@/assets/category-anime.jpg";

const categories = [
  { name: "Football", desc: "Elige tu equipo de fútbol favorito", image: categoryFootball },
  { name: "Fate", desc: "Elige el mejor servant", image: categoryFate },
  { name: "Anime", desc: "Elige el mejor anime de 2025", image: categoryAnime },
];

const CategoriesSection = () => {
  return (
    <section id="tools" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.article
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={`Categoría ${cat.name} en UrChoice`}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-lg font-bold text-foreground">{cat.name}</h3>
                <p className="font-body text-muted-foreground text-sm mt-1">{cat.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;