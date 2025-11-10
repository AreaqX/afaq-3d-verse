import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Scene3D } from '@/components/3d/Scene3D';
import { MapPin, Download, Mail } from 'lucide-react';

const titles = [
  "Full Stack Developer",
  "Podio Automation Specialist", 
  "Retool Developer",
  "FlutterFlow Developer"
];

export const HeroSection = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const title = titles[currentTitle];
    let i = 0;
    
    const typeInterval = setInterval(() => {
      if (i < title.length) {
        setDisplayText(title.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setDisplayText('');
          setCurrentTitle((prev) => (prev + 1) % titles.length);
          setIsTyping(true);
        }, 2000);
        clearInterval(typeInterval);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, [currentTitle]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-background/60 z-10" />
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold hero-text mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Afaq Mehmood
            </motion.h1>
            
            {/* Typing Animation */}
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground">
                <span className="gradient-text">{displayText}</span>
                <span className={`ml-1 ${isTyping ? 'animate-pulse' : ''}`}>|</span>
              </h2>
            </div>
          </div>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            "Engineering scalable, high-performance solutions with 3 years of deep expertise in 
            <span className="text-primary font-semibold"> Podio</span>, 
            <span className="text-secondary font-semibold"> Retool</span>, 
            <span className="text-accent font-semibold"> GHL</span>, and 
            <span className="text-primary font-semibold"> FlutterFlow</span>,
            specializing in cross-platform development and user-centric design."
          </motion.p>

          {/* Location */}
          <motion.div 
            className="flex items-center justify-center gap-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <MapPin className="w-5 h-5 text-accent" />
            <span>Sialkot, Punjab, Pakistan</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl primary-glow transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold rounded-xl neon-glow transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/Afaq_Mehmood_Resume.pdf" download="Afaq_Mehmood_Resume.pdf">
                <Download className="w-5 h-5 mr-2" />
                Resume
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold rounded-xl neon-glow transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
              <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-bounce" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};