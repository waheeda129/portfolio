import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Figma, 
  Code2, 
  Layout, 
  Send,
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  color: string;
}

// --- Constants ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "YouTube SEO Tool v2",
    description: "A keyword-focused optimization tool for creators that improves titles, tags, and descriptions using score-based suggestions and practical SEO checks.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "SEO", "Analytics"],
    github: "https://github.com/waheeda129/youtube-seo-tool-v2",
    demo: "https://github.com/waheeda129/youtube-seo-tool-v2",
    color: "from-emerald-100/50 to-teal-100/50"
  },
  {
    id: 2,
    title: "Cinema Management System",
    description: "A cinema operations dashboard to manage movie schedules, seat availability, ticket bookings, and daily revenue tracking in one place.",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=80",
    tags: ["Dashboard", "Booking", "UI/UX"],
    github: "https://github.com/waheeda129?tab=repositories",
    demo: "mailto:waheedagillani728@gmail.com?subject=Demo%20Request%20-%20Cinema%20Management%20System",
    color: "from-rose-100/50 to-orange-100/50"
  },
  {
    id: 3,
    title: "Customer Relationship Management System",
    description: "A CRM platform focused on lead tracking, follow-ups, and client history so teams can maintain healthy pipelines and improve conversion consistency.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    tags: ["CRM", "TypeScript", "Productivity"],
    github: "https://github.com/waheeda129?tab=repositories",
    demo: "mailto:waheedagillani728@gmail.com?subject=Demo%20Request%20-%20Customer%20Relationship%20Management%20System",
    color: "from-blue-100/50 to-indigo-100/50"
  }
];

const SKILLS = {
  frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
  tools: ["Figma", "VS Code", "GitHub", "Adobe XD", "Responsive Design"]
};

const SOCIAL_LINKS = {
  github: "https://github.com/waheeda129",
  linkedin: "https://www.linkedin.com/in/waheeda-gillani-b8093430b",
  email: "mailto:waheedagillani728@gmail.com?subject=Portfolio%20Contact",
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass rounded-full px-8 py-4 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'shadow-lg' : 'shadow-none border-transparent bg-transparent'}`}>
          <a href="#" className="text-xl font-bold tracking-tighter text-stone-900 flex items-center gap-2 group">
            <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <span className="text-[10px] font-bold tracking-wide">WG</span>
            </div>
            <span>WG.</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="h-5 w-px bg-stone-200" />
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                aria-label="Email"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-stone-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-6 right-6 mt-4 glass rounded-3xl p-8 flex flex-col gap-6 md:hidden z-50"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-stone-600 hover:text-stone-900"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-stone-200/60 flex items-center gap-6">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Github size={22} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Linkedin size={22} />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                aria-label="Email"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Mail size={22} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${light ? 'text-white' : 'text-stone-900'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg max-w-2xl leading-relaxed ${light ? 'text-stone-300' : 'text-stone-500'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-900 selection:bg-rose-100 overflow-x-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-rose-100/50 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-purple-100/40 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-blue-100/30 rounded-full blur-[110px]"
        />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-6 pt-36 md:pt-40">
          <div className="max-w-6xl mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-stone-900 mb-12 leading-[1.06] md:leading-[1.04] text-gradient">
                Designing <br />
                Experiences That <br />
                Feel Effortless
              </h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-serif italic text-stone-800 mb-4">Waheeda Gillani</h2>
                <p className="text-stone-500 text-sm font-bold uppercase tracking-[0.3em]">UI/UX Designer & Frontend Developer</p>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="max-w-xl mx-auto text-stone-500 text-lg md:text-xl leading-relaxed mb-12"
              >
                I craft high-end digital products that combine aesthetic excellence with technical precision.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-6"
              >
                <a 
                  href="#projects" 
                  className="px-10 py-5 bg-stone-900 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 hover:shadow-2xl hover:shadow-stone-200 transition-all duration-300"
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="px-10 py-5 glass rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-300"
                >
                  Contact Me
                </a>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute bottom-[20%] right-[15%] w-16 h-16 glass rounded-full flex items-center justify-center text-blue-300"
            >
              <Code2 size={28} />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-12 md:p-20 rounded-[3rem] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-12 text-stone-100 group-hover:text-stone-200 transition-colors">
                <Layout size={120} />
              </div>
              <div className="relative z-10">
                <SectionHeading 
                  title="About" 
                  subtitle="My philosophy is simple: Design should be invisible. It should guide the user without them ever noticing the hand of the creator."
                />
                <div className="grid md:grid-cols-2 gap-12 text-stone-600 leading-relaxed text-lg">
                  <p>
                    With over half a decade of experience in the digital space, I've learned that the most successful products are those that balance user needs with business goals through elegant, technical solutions.
                  </p>
                  <p>
                    I specialize in building high-performance web applications using React and TypeScript, always keeping accessibility and performance at the forefront of my development process.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              title="Selected Works" 
              subtitle="A curated selection of projects where design meets functionality."
            />
            
            <div className="grid md:grid-cols-3 gap-10">
              {PROJECTS.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -15 }}
                  className="group glass rounded-[2.5rem] overflow-hidden p-4 transition-all duration-500"
                >
                  <div className={`rounded-[2rem] overflow-hidden aspect-[4/3] mb-8 bg-gradient-to-br ${project.color} p-6`}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="px-4 pb-6">
                    <div className="flex gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-stone-400 bg-stone-100 px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-stone-500 text-sm mb-8 leading-relaxed">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <a href={project.demo} className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center hover:scale-110 transition-transform">
                        <ArrowUpRight size={20} />
                      </a>
                      <a href={project.github} className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
                        View Source
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass p-12 md:p-20 rounded-[4rem]">
              <div className="grid md:grid-cols-2 gap-20">
                <div>
                  <SectionHeading title="Skills & Tools" />
                  <div className="space-y-12">
                    <div>
                      <h4 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-8">Frontend Stack</h4>
                      <div className="flex flex-wrap gap-4">
                        {SKILLS.frontend.map(skill => (
                          <motion.span 
                            key={skill} 
                            whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                            className="px-8 py-3 rounded-full glass text-sm font-semibold text-stone-700 cursor-default transition-shadow hover:shadow-xl hover:shadow-stone-100"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-8">Design & Workflow</h4>
                      <div className="flex flex-wrap gap-4">
                        {SKILLS.tools.map(tool => (
                          <motion.span 
                            key={tool} 
                            whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                            className="px-8 py-3 rounded-full glass text-sm font-semibold text-stone-700 cursor-default transition-shadow hover:shadow-xl hover:shadow-stone-100"
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <div className="relative w-full max-w-sm aspect-square">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-dashed border-stone-200 rounded-full"
                    />
                    <div className="absolute inset-10 border border-stone-100 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm">
                      <Code2 size={64} className="text-stone-300" />
                    </div>
                    {/* Orbiting dots */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-rose-200 rounded-full" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-blue-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <SectionHeading title="Get In Touch" subtitle="Let's collaborate on your next big idea." />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-16 rounded-[3rem]"
            >
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-8 py-5 rounded-3xl bg-white/50 border border-transparent focus:border-stone-200 focus:bg-white outline-none transition-all text-stone-800"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-4">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-8 py-5 rounded-3xl bg-white/50 border border-transparent focus:border-stone-200 focus:bg-white outline-none transition-all text-stone-800"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-4">Your Message</label>
                  <textarea 
                    rows={6} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-8 py-5 rounded-3xl bg-white/50 border border-transparent focus:border-stone-200 focus:bg-white outline-none transition-all text-stone-800 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending'}
                  className={`w-full py-6 rounded-3xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all duration-500 ${
                    formStatus === 'success' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-stone-900 text-white hover:bg-stone-800 hover:shadow-2xl hover:shadow-stone-200'
                  }`}
                >
                  {formStatus === 'sending' ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : formStatus === 'success' ? (
                    <>Message Sent <CheckCircle2 size={20} /></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
              <div className="mt-10 pt-8 border-t border-stone-200/60 flex flex-wrap justify-center gap-4">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white/60 hover:bg-white text-stone-700 font-semibold text-sm transition-colors"
                >
                  Connect on LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white/60 hover:bg-white text-stone-700 font-semibold text-sm transition-colors"
                >
                  View GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.email}
                  className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-colors"
                >
                  Email Me
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-stone-100 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="flex gap-10">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-stone-300 hover:text-stone-900 transition-colors transform hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-stone-300 hover:text-stone-900 transition-colors transform hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={SOCIAL_LINKS.email}
              aria-label="Email"
              className="text-stone-300 hover:text-stone-900 transition-colors transform hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>
          <div className="text-stone-400 text-xs font-bold uppercase tracking-[0.3em] text-center">
            © {new Date().getFullYear()} Waheeda Gillani <br />
            <span className="mt-2 block font-normal normal-case tracking-normal">Designed with intention. Built with precision.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
