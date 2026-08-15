import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const experiences = [
  {
    id: 1,
    position: 'Senior Software Developer',
    company: 'Patronecs Software Company',
    location: 'Sialkot, Pakistan',
    period: 'Jun 2023 — Present',
    type: 'Full-time',
    description:
      'Leading delivery of production SaaS products across mobile, web and internal tooling.',
    achievements: [
      'Shipped cross-platform FlutterFlow apps to the App Store and Play Store for fintech, rental and marketplace clients',
      'Designed Firebase security rules and Supabase RLS policies enforcing multi-tenant data isolation and RBAC',
      'Integrated Stripe subscriptions, Connect payouts and Stripe Identity verification into live products',
      'Built Retool internal dashboards over PostgreSQL for logistics, HR and support operations',
      'Automated real estate lead pipelines in Podio with SMS, email, cold-call and web intake sources',
      'Owned delivery milestones from scoping to release, working directly with US and EU clients',
    ],
    technologies: ['FlutterFlow', 'React', 'Firebase', 'Supabase', 'Stripe', 'PostgreSQL', 'Retool', 'Podio'],
  },
  {
    id: 2,
    position: 'Software Development Intern',
    company: 'Patronecs Software Company',
    location: 'Sialkot, Pakistan',
    period: 'Mar 2023 — Jun 2023',
    type: 'Internship',
    description: 'Hands-on work in CRM automation and third-party integrations.',
    achievements: [
      'Built a Podio automation system for real estate lead management',
      'Integrated third-party tools with Podio for buyer and seller data capture',
      'Implemented contract automation between transacting parties',
    ],
    technologies: ['Podio', 'CRM Integration', 'API Development'],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-28 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="tech-tag text-accent uppercase tracking-[0.2em] mb-3">02 — Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Where I've been building
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect p-7 card-shadow hover-lift hover:border-accent/40 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-accent" strokeWidth={1.5} />
                      <span className="tech-tag text-muted-foreground uppercase tracking-wider">
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{exp.position}</h3>
                    <p className="text-accent">{exp.company}</p>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" strokeWidth={1.5} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{exp.description}</p>

                <ul className="space-y-2 mb-5">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="tech-tag px-2.5 py-1 rounded-md bg-surface border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
