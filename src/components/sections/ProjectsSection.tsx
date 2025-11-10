import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Smartphone, 
  Database, 
  Workflow, 
  Building2,
  Filter
} from 'lucide-react';

const projectCategories = [
  { id: 'all', name: 'All Projects', icon: Filter },
  { id: 'flutterflow', name: 'FlutterFlow', icon: Smartphone },
  { id: 'retool', name: 'Retool', icon: Database },
  { id: 'podio', name: 'Podio', icon: Workflow },
  { id: 'ghl', name: 'GoHighLevel', icon: Building2 }
];

const projects = [
  {
    id: 1,
    title: "E-Scrow",
    category: "flutterflow",
    description: "Contract creation platform with integrated chat functionality and subscription payment system",
    technologies: ["FlutterFlow", "Firebase", "Stripe", "Chat API"],
    features: ["Contract Management", "Real-time Chat", "Payment Processing", "Document Signing"],
    gradient: "from-primary to-secondary"
  },
  {
    id: 2,
    title: "Starline Stepper",
    category: "flutterflow", 
    description: "Comprehensive job listing and assessment platform connecting employers with candidates",
    technologies: ["FlutterFlow", "Firebase", "Assessment API", "Notifications"],
    features: ["Job Listings", "Skill Assessments", "Candidate Matching", "Application Tracking"],
    gradient: "from-secondary to-accent"
  },
  {
    id: 3,
    title: "Local Bestie",
    category: "flutterflow",
    description: "Location-based events and housing platform with intelligent alert system",
    technologies: ["FlutterFlow", "Google Maps", "Firebase", "Push Notifications"],
    features: ["Event Discovery", "Housing Listings", "Location Alerts", "Social Features"],
    gradient: "from-accent to-primary"
  },
  {
    id: 4,
    title: "Heroz School System",
    category: "flutterflow",
    description: "Complete school management system for activity tracking and payment processing",
    technologies: ["FlutterFlow", "Firebase", "Payment Gateway", "Analytics"],
    features: ["Activity Tracking", "Payment Management", "Student Portal", "Admin Dashboard"],
    gradient: "from-primary to-accent"
  },
  {
    id: 5,
    title: "Forecash",
    category: "flutterflow",
    description: "Financial Forecasting platform for transaction management and future balance prediction",
    technologies: ["FlutterFlow", "Firebase", "Financial APIs", "Analytics"],
    features: ["Transaction Tracking", "Future Forecasting", "Balance Prediction", "Financial Planning"],
    gradient: "from-secondary to-primary"
  },
  {
    id: 6,
    title: "MyoutdoorShare",
    category: "flutterflow",
    description: "Vehicle rental platform with identity verification, payments, and contract management",
    technologies: ["FlutterFlow", "Stripe", "DocuSeal", "AI Chat", "Firebase"],
    features: ["Vehicle Listings", "Identity Verification", "Payment Integration", "Contract Management", "AI Chat", "In-app Messaging"],
    gradient: "from-accent to-secondary"
  },
  {
    id: 7,
    title: "Cargo Management System",
    category: "retool",
    description: "Comprehensive logistics platform for tracking and managing cargo shipments",
    technologies: ["Retool", "PostgreSQL", "REST APIs", "Dashboard"],
    features: ["Shipment Tracking", "Inventory Management", "Route Optimization", "Analytics"],
    gradient: "from-secondary to-primary"
  },
  {
    id: 8,
    title: "Customer Support Portal",
    category: "retool",
    description: "Streamlined customer service platform with ticket management and analytics",
    technologies: ["Retool", "Database", "Email Integration", "Reporting"],
    features: ["Ticket Management", "Customer Database", "Response Analytics", "Team Collaboration"],
    gradient: "from-accent to-secondary"
  },
  {
    id: 9,
    title: "HR Management Portal",
    category: "retool",
    description: "Complete HR solution with accounts financing and employee management",
    technologies: ["Retool", "PostgreSQL", "Financial APIs", "Reporting"],
    features: ["Employee Management", "Payroll Processing", "Performance Tracking", "Financial Reports"],
    gradient: "from-primary to-secondary"
  },
  {
    id: 10,
    title: "Real Estate Automation",
    category: "podio",
    description: "Business automation system for real estate industry workflow management",
    technologies: ["Podio", "Automation", "CRM Integration", "DocuSign"],
    features: ["Lead Management", "Contract Automation", "Pipeline Tracking", "Document Processing"],
    gradient: "from-secondary to-accent"
  },
  {
    id: 11,
    title: "Custom Business Builder",
    category: "podio",
    description: "Flexible business process automation with custom workflows",
    technologies: ["Podio", "Workflow Builder", "API Integration", "Custom Fields"],
    features: ["Custom Workflows", "Process Automation", "Data Management", "Integration Hub"],
    gradient: "from-accent to-primary"
  },
  {
    id: 12,
    title: "Lead Management System",
    category: "ghl",
    description: "Multi-source lead management with automated pipeline workflows",
    technologies: ["GoHighLevel", "CRM", "Automation", "Multi-channel"],
    features: ["Lead Capture", "Pipeline Automation", "Follow-up Sequences", "Conversion Tracking"],
    gradient: "from-primary to-accent"
  }
];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative">
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
            Projects
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8 rounded-full" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative solutions across different platforms and technologies
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {projectCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-primary text-primary-foreground primary-glow' 
                  : 'border-border hover:border-primary hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="glass-effect hover:border-accent/50 transition-all duration-300 overflow-hidden h-full card-shadow">
                {/* Project Header with Gradient */}
                <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4">
                    <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {project.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <Badge 
                        key={i}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary hover:border-primary hover:bg-primary/10"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Show more button if filtered */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};