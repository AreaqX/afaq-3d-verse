import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Briefcase, Layers } from 'lucide-react';
import { Card } from '@/components/ui/card';


interface StatCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const StatCounter = ({ value, duration = 2, suffix = '', prefix = '' }: StatCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

const stats = [
  {
    icon: Briefcase,
    label: "Years Experience",
    value: 3,
    suffix: "+",
  },
  {
    icon: Layers,
    label: "Projects Completed",
    value: 25,
    suffix: "+",
  }
];


export const StatsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="glass-effect hover:border-accent/50 transition-all duration-300 p-8 text-center h-full card-shadow">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-xl bg-surface border border-border p-4 group-hover:border-accent/50 transition-colors duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-full h-full text-accent" />
                </motion.div>


                {/* Counter */}
                <div className="mb-2">
                  <motion.h3 
                    className="text-5xl font-bold gradient-text"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <StatCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </motion.h3>
                </div>

                {/* Label */}
                <p className="text-muted-foreground font-medium group-hover:text-accent transition-colors">
                  {stat.label}
                </p>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
