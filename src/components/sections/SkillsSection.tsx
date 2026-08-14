import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Database, 
  Smartphone, 
  Globe, 
  Zap, 
  MessageSquare,
  Mail,
  Phone,
  Bot,
  CreditCard
} from 'lucide-react';

const skillCategories = [
  {
    title: "Platforms & Frameworks",
    icon: Code2,
    skills: ["Podio", "Retool", "FlutterFlow", "GoHighLevel", "React.js", "ASP.Net MVC"],
    color: "from-primary to-secondary"
  },
  {
    title: "Programming Languages",
    icon: Globe,
    skills: ["JavaScript", "PHP", "React.js", "Node.js", "HTML5", "CSS3", "XML", "Java", "SQL"],
    color: "from-secondary to-accent"
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["Firebase", "PostgreSQL", "MySQL", "MongoDB", "SQLite"],
    color: "from-accent to-primary"
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["FlutterFlow", "React Native", "Cross-platform", "iOS", "Android"],
    color: "from-primary to-accent"
  }
];

const integrations = [
  {
    category: "Automation Tools",
    icon: Zap,
    tools: ["Zapier", "Make.com", "ProcFu", "Workflow Builder"]
  },
  {
    category: "Communication",
    icon: MessageSquare,
    tools: ["Twilio", "Slack", "SmrtPhone", "DialPad", "CallTools"]
  },
  {
    category: "Email & SMS",
    icon: Mail,
    tools: ["SMTP", "Globimail", "Launch Control", "Batch Leads", "REIReply"]
  },
  {
    category: "AI Services",
    icon: Bot,
    tools: ["Vapi AI", "ChatGPT", "OpenAI API", "Machine Learning"]
  },
  {
    category: "Financial",
    icon: CreditCard,
    tools: ["Stripe", "Revenue Cat", "Payment Processing", "Subscription Management"]
  },
  {
    category: "Document Integration",
    icon: Mail,
    tools: ["DocuSeal", "DocuSign", "RightSignature", "Contract Automation"]
  }
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-28 md:py-32 relative">
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
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8 rounded-full" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technical proficiencies and integration capabilities across modern development platforms
          </p>
        </motion.div>

        {/* Core Skills */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground mb-8 text-center"
          >
            Core Technologies
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="group"
              >
                <Card className="glass-effect hover:border-accent/40 transition-all duration-300 p-6 h-full card-shadow hover-lift">
                  {/* Category Header */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-surface border border-border p-3 mb-3 group-hover:border-accent/40 transition-colors duration-300">
                      <category.icon className="w-6 h-6 text-accent" />
                    </div>

                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {category.title}
                    </h4>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    {category.skills.map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (index * 0.1) + (i * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <Badge 
                          variant="outline"
                          className="w-full justify-start text-xs bg-surface border-border text-foreground hover:border-accent transition-colors"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Integration Expertise */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground mb-8 text-center"
          >
            Integration Expertise
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="group"
              >
                <Card className="glass-effect hover:border-accent/40 transition-all duration-300 p-6 h-full card-shadow hover-lift">
                  {/* Integration Header */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-surface border border-border p-3 mb-3 group-hover:border-accent/40 transition-colors duration-300">
                      <integration.icon className="w-6 h-6 text-accent" />
                    </div>

                    <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {integration.category}
                    </h4>
                  </div>

                  {/* Tools */}
                  <div className="space-y-1">
                    {integration.tools.map((tool, i) => (
                      <div
                        key={tool}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                        {tool}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">Languages</h3>
          <div className="flex justify-center gap-4">
            {["English", "Urdu", "Punjabi"].map((language, i) => (
              <Badge 
                key={language}
                className="bg-surface text-foreground border border-border hover:border-accent transition-colors px-4 py-2"
              >
                {language}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};