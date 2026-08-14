import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const experiences = [
  {
    id: 1,
    position: "Full Stack Developer",
    company: "Patronecs Software Company",
    location: "Sialkot, Pakistan",
    period: "June 2023 - Present",
    type: "Full-time",
    description: "Leading development initiatives in automation and low-code solutions",
    achievements: [
      "Automated Real Estate Industry with Podio Automation",
      "Researched and implemented various development tools (tape, softr.io, Serp Api, airtable, Retool)",
      "Integrated third-party APIs in Flutterflow and Retool",
      "Enhanced user experience with responsive front-end interfaces",
      "Managed development milestones from conception to delivery",
      "Built native apps using Flutterflow for Web, Mobile (Android, iOS), and Admin Portals",
      "Developed internal apps using Retool"
    ],
    technologies: ["Podio", "Retool", "FlutterFlow", "APIs", "Firebase", "PostgreSQL"]
  },
  {
    id: 2,
    position: "Software Development Intern",
    company: "Patronecs Software Company", 
    location: "Sialkot, Pakistan",
    period: "March 2023 - June 2023",
    type: "Internship",
    description: "Gained hands-on experience in automation systems and CRM development",
    achievements: [
      "Built Podio Automation System for Real Estate",
      "Integrated 3rd party tools with Podio for lead management",
      "Managed seller and buyer information from multiple sources (SMS, Email, Cold Calling, Website)",
      "Implemented contract automation between parties"
    ],
    technologies: ["Podio", "CRM Integration", "API Development", "Lead Management"]
  }
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-28 md:py-32 relative">
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
            Experience
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8 rounded-full" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey in developing innovative automation solutions
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-0.5" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background transform md:-translate-x-2 z-10 animate-glow-pulse" />

                {/* Content */}
                <div className={`w-full md:w-1/2 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <Card className="glass-effect hover:border-accent/40 transition-all duration-300 p-6 card-shadow hover-lift">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-5 h-5 text-accent" />
                          <Badge className="bg-accent/20 text-accent border-accent/30">
                            {exp.type}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                          {exp.position}
                        </h3>
                        
                        <h4 className="text-lg font-semibold text-primary mb-2">
                          {exp.company}
                        </h4>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-foreground mb-2">Key Achievements:</h5>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <Badge 
                            key={i}
                            variant="outline"
                            className="text-xs border-primary/30 text-primary hover:border-primary hover:bg-primary/10"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};