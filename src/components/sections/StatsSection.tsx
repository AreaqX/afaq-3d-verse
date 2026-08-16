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
    <section className="py-28 md:py-32 relative">
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
              whileHover={{ y: -3 }}
              className="group"
            >
              <Card className="glass-effect hover:border-accent/40 transition-colors duration-300 p-8 text-center h-full card-shadow hover-lift">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-surface border border-border p-3 group-hover:border-accent/40 transition-colors duration-300">
                  <stat.icon className="w-full h-full text-accent" strokeWidth={1.5} />
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  <StatCounter value={stat.value} suffix={stat.suffix} duration={2} />
                </h3>

                <p className="tech-tag text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {stat.label}
                </p>
              </Card>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
