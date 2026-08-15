import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export const EducationSection = () => {
  return (
    <section id="education" className="py-28 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="tech-tag text-accent uppercase tracking-[0.2em] mb-3">05 — Education</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Education</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="glass-effect p-7 card-shadow hover-lift hover:border-accent/40 transition-colors">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <GraduationCap className="w-5 h-5 text-accent mb-3" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-foreground">
                  BS Software Engineering
                </h3>
                <p className="text-accent">University of Sialkot</p>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  2019 — 2023
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                  Sialkot, Pakistan
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
