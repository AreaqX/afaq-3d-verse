import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Smartphone,
  Database,
  ShieldCheck,
  CreditCard,
  Bot,
  Layers,
} from 'lucide-react';

const strengths = [
  {
    icon: Smartphone,
    title: 'Cross-platform Apps',
    description: 'FlutterFlow apps shipped to App Store and Play Store, plus React web clients.',
  },
  {
    icon: Database,
    title: 'Backend & Data',
    description: 'Firebase, Supabase and PostgreSQL schemas designed for multi-tenant SaaS.',
  },
  {
    icon: ShieldCheck,
    title: 'Security Rules & RLS',
    description: 'Firestore security rules, Supabase row-level security, and RBAC models.',
  },
  {
    icon: CreditCard,
    title: 'Payments & Identity',
    description: 'Stripe subscriptions, Connect payouts, and Stripe Identity verification.',
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    description: 'LLM-assisted workflows, webhook services, and integration pipelines.',
  },
  {
    icon: Layers,
    title: 'Low-code Delivery',
    description: 'Podio, Retool and GoHighLevel internal tools built at production speed.',
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-28 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="tech-tag text-accent uppercase tracking-[0.2em] mb-3">01 — About</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Building secure products, end to end
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a full stack developer with{' '}
              <span className="text-accent font-medium">3+ years of production SaaS experience</span>,
              focused on cross-platform mobile delivery with FlutterFlow and modern web
              frontends in React.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A large part of my work is backend correctness and security: writing Firebase
              security rules, designing Supabase row-level security policies, and modelling
              role-based access control so multi-tenant data stays isolated by default.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Alongside that, I integrate the pieces real products need — Stripe payments and
              identity verification, e-signature flows, and automation across Podio, Retool
              and GoHighLevel.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                <Card className="glass-effect p-5 h-full card-shadow hover-lift hover:border-accent/40 transition-colors">
                  <item.icon className="w-5 h-5 text-accent mb-3" strokeWidth={1.5} />
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
