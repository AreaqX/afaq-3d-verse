import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Database, 
  Zap, 
  Users, 
  Smartphone,
  Globe
} from 'lucide-react';

const strengths = [
  {
    icon: Code,
    title: "Low-code/No-code Development",
    description: "Expert in Podio, Retool, and FlutterFlow platforms"
  },
  {
    icon: Database,
    title: "Database Management", 
    description: "Proficient in Firebase, PostgreSQL, and MySQL"
  },
  {
    icon: Zap,
    title: "API Integrations",
    description: "Seamless third-party service integrations"
  },
  {
    icon: Globe,
    title: "Automation Solutions",
    description: "Streamlining business processes with smart automation"
  },
  {
    icon: Users,
    title: "Cross-functional Collaboration",
    description: "Effective teamwork and project management"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native apps for Web, Android, and iOS platforms"
  }
];

const skills = [
  "Podio", "Retool", "FlutterFlow", "GoHighLevel", "React.js", "JavaScript", 
  "PHP", "ASP.Net MVC", "Firebase", "PostgreSQL", "MongoDB", "HTML5", "CSS3"
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Full Stack Developer with <span className="text-accent font-semibold">2.5 years of experience</span> specializing in crafting robust and user-centric applications using cutting-edge low-code and traditional development platforms.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Proficient in <span className="text-primary font-semibold">PHP</span>, <span className="text-primary font-semibold">JavaScript</span>, <span className="text-primary font-semibold">React</span> with additional expertise in <span className="text-secondary font-semibold">Firebase</span>, <span className="text-secondary font-semibold">PostgreSQL</span> for database management.
            </p>

            {/* Skills Tags */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-surface text-foreground border border-border/50 hover:border-accent transition-colors px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Strengths Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {strengths.map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="glass-effect hover:border-accent/50 transition-all duration-300 p-6 card-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <strength.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {strength.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {strength.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};