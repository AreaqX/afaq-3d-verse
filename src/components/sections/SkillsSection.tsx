import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Smartphone,
  Database,
  ShieldCheck,
  CreditCard,
  Bot,
  Blocks,
} from 'lucide-react';

const clusters = [
  {
    title: 'Mobile & Web',
    icon: Smartphone,
    items: ['FlutterFlow', 'Dart', 'React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind'],
  },
  {
    title: 'Backend & Database',
    icon: Database,
    items: ['Node.js', 'Firebase', 'Supabase', 'PostgreSQL', 'MySQL', 'MongoDB', 'REST APIs', 'Webhooks'],
  },
  {
    title: 'Security',
    icon: ShieldCheck,
    items: ['Firestore Rules', 'Supabase RLS', 'RBAC', 'Auth Flows', 'Multi-tenant Isolation', 'Edge Functions'],
  },
  {
    title: 'Payments',
    icon: CreditCard,
    items: ['Stripe Checkout', 'Stripe Connect', 'Stripe Identity', 'Subscriptions', 'RevenueCat'],
  },
  {
    title: 'AI & Automation',
    icon: Bot,
    items: ['OpenAI API', 'Claude', 'Vapi AI', 'MCP', 'Zapier', 'Make.com', 'Twilio'],
  },
  {
    title: 'Low-code / No-code',
    icon: Blocks,
    items: ['Podio', 'Retool', 'GoHighLevel', 'ProcFu', 'Airtable', 'DocuSeal', 'DocuSign'],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-28 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="tech-tag text-accent uppercase tracking-[0.2em] mb-3">04 — Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Stack & capabilities
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Tools I use day to day across product delivery, from mobile UI to security policies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clusters.map((cluster, index) => (
            <motion.div
              key={cluster.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect p-6 h-full card-shadow hover-lift hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <cluster.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  <h3 className="font-semibold text-foreground">{cluster.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cluster.items.map((item) => (
                    <span
                      key={item}
                      className="tech-tag px-2.5 py-1 rounded-md bg-surface border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <span className="text-sm text-muted-foreground">Languages:</span>
          {['English', 'Urdu', 'Punjabi'].map((language) => (
            <span
              key={language}
              className="tech-tag px-2.5 py-1 rounded-md bg-surface border border-border text-muted-foreground"
            >
              {language}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
