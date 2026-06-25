import React from "react";
import { ChevronDown, ShieldCheck, Zap, Award, Flame } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const staggerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  const { isLight } = useTheme();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const statsY = useTransform(scrollY, [100, 500], [120, 0]);
  const statsOpacity = useTransform(scrollY, [100, 500], [0, 1]);

  const handleScrollToEstimator = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector("#estimator");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleScrollToModels = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector("#models");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-jet-950">
      {/* Video Background (static - sin parallax para mejor performance) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={isLight ? "/logo/beyritech-logo-light.png" : "/logo/beyritech-logo.png"}
          className="w-full h-full object-cover"
        >
          <source src="/video/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-jet-950 via-jet-950/80 to-jet-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-jet-950 via-transparent to-jet-950/60" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#333d4715_1px,transparent_1px),linear-gradient(to_bottom,#333d4715_1px,transparent_1px)] bg-[size:4rem_4rem]"
        />
      </div>

      {/* Scan line — barrido dorado futurista */}
      <motion.div
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
        className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #FEC934 50%, transparent 100%)",
          boxShadow: "0 0 20px rgba(254,201,52,0.6), 0 0 60px rgba(254,201,52,0.2)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full flex flex-col justify-between min-h-screen">
        <div />

        {/* Core Message Card */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-3xl mt-12"
        >
          {/* Clip-path reveal en sincronía con la scan line */}
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
          {/* Animated Content (stagger al montar, sin observer) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            <motion.div variants={fadeUpItem}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-300 font-semibold">
                  Sistemas de Ingeniería Volumétrica
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeUpItem}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Módulos Multipropósito de <span className="text-gold-500 relative inline-block">
                  Alto Rendimiento
                  <span className="absolute left-0 bottom-1 w-full h-[3px] bg-gold-500/30" />
                </span>
              </h1>
            </motion.div>

            <motion.div variants={fadeUpItem}>
              <p className="font-sans text-base sm:text-lg lg:text-xl text-jet-200 font-light leading-relaxed mb-10 max-w-2xl">
                Despliegue infraestructuras modulares de calidad superior para minería, corporaciones y sanidad. Reduzca los tiempos un 60% sin comprometer la resistencia estructural ni el aislamiento térmico.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUpItem}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  id="hero-primary-cta"
                  onClick={handleScrollToEstimator}
                  className="px-8 py-4 rounded bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-sm transition-colors duration-300 shadow-xl shadow-gold-500/20"
                >
                  Solicitar Módulo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  id="hero-secondary-cta"
                  onClick={handleScrollToModels}
                  className="px-8 py-4 rounded border border-jet-200/20 hover:border-gold-500 hover:bg-gold-500/5 text-white font-medium uppercase tracking-wider text-sm transition-all duration-300 backdrop-blur-sm"
                >
                  Ver Modelos
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
          </motion.div>

          {/* Core Trust Badges (animación al montar, después del scan) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-jet-800/60">
              {[
                { icon: ShieldCheck, label: "ISO 9001 / C5-M" },
                { icon: Zap, label: "Rápido Montaje" },
                { icon: Award, label: "Soporte Minero" },
                { icon: Flame, label: "Ignífugo Certificado" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2.5"
                >
                  <item.icon className="w-5 h-5 text-gold-500 shrink-0" />
                  <span className="text-xs font-mono text-jet-200">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics - se animan al scrollear */}
        <motion.div
          style={{ y: statsY, opacity: statsOpacity }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 pb-4 border-t border-jet-800/80 mt-12 bg-jet-950/40 backdrop-blur-sm p-6 rounded-lg"
        >
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Área Desplegada</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 font-mono">
              +120,000 <span className="text-gold-500 text-lg">m²</span>
            </h3>
            <p className="text-xs text-jet-300 mt-1">Minería y corporaciones</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Velocidad Operativa</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 font-mono text-gold-500">
              -60% <span className="text-white text-lg">Tiempo</span>
            </h3>
            <p className="text-xs text-jet-300 mt-1">Fabricación en paralelo</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Vida Útil</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 font-mono">
              +50 <span className="text-gold-500 text-lg">Años</span>
            </h3>
            <p className="text-xs text-jet-300 mt-1">Acero galvanizado pesado</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Aislamiento PIR</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 font-mono">
              R-32 <span className="text-gold-500 text-lg">Mínimo</span>
            </h3>
            <p className="text-xs text-jet-300 mt-1">Apto clima de alta montaña</p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-jet-300">
            Descubrir Más
          </span>
          <ChevronDown className="w-4 h-4 text-gold-500 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
