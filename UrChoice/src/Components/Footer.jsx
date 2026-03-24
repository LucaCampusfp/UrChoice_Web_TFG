import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer
      className="py-12 border-t border-border"
      style={{ background: "var(--gradient-footer)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <img src={logo} alt="UrChoice logo" width={56} height={56} />
            <span className="font-body text-muted-foreground text-sm">@urchoice</span>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-12 text-sm font-body">
            <div>
              <h4 className="font-display text-xs font-semibold text-foreground tracking-widest uppercase mb-3">Navegación</h4>
              <ul className="space-y-2">
                <li><a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">Inicio</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Descripción</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Categorías</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xs font-semibold text-foreground tracking-widest uppercase mb-3">Características</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Características</a></li>
                <li><a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors">Jugar</a></li>
                <li><a href="#tools" className="text-muted-foreground hover:text-primary transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xs font-semibold text-foreground tracking-widest uppercase mb-3">Redes</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="font-body text-muted-foreground text-xs">
            © {new Date().getFullYear()} UrChoice. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
