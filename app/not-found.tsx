"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Home, HelpCircle, FileText, Briefcase, Info, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  // Quick links for lost users
  const quickLinks = [
    { name: "Services & Solutions", href: "/services", icon: Briefcase },
    { name: "Case Studies", href: "/case-studies", icon: FileText },
    { name: "Insights & News", href: "/insights", icon: Info },
    { name: "Contact Our Experts", href: "/contact", icon: HelpCircle },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative flex-1 min-h-screen bg-[#0B0E13] text-white flex flex-col justify-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-electric/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-theme-teal/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Information and Actions */}
            <div className="lg:col-span-6 text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-theme-teal/20 bg-theme-teal/5 text-theme-teal text-xs font-semibold uppercase tracking-wider mb-6">
                  <span className="w-2 h-2 rounded-full bg-theme-teal animate-pulse" />
                  System Protocol Interrupted
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight mb-4 leading-tight">
                  Oops! Page <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-teal to-brand-electric">Not Found</span>
                </h1>
                
                <p className="text-brand-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
                  The requested resource or page does not exist, has been permanently removed, or the URL might have been typed incorrectly.
                </p>

                {/* Primary Actions */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link href="/">
                    <button className="flex items-center gap-2 bg-theme-orange hover:bg-theme-orange/90 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-theme-orange/20 transition-all duration-300 transform hover:-translate-y-0.5">
                      <Home className="w-4 h-4" />
                      Back to Homepage
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
                      <HelpCircle className="w-4 h-4" />
                      Contact Support
                    </button>
                  </Link>
                </div>

                {/* Directory Quick Links */}
                <div className="border-t border-slate-800/80 pt-8">
                  <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4">
                    Or explore these popular destinations:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <Link 
                          key={link.name} 
                          href={link.href}
                          className="group flex items-center justify-between p-3.5 rounded-lg bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-theme-teal/30 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 text-slate-300 group-hover:text-white transition-colors">
                            <div className="p-2 rounded bg-slate-800 text-slate-400 group-hover:bg-theme-teal/10 group-hover:text-theme-teal transition-colors">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">{link.name}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-theme-teal transform group-hover:translate-x-1 transition-all" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Premium 3D Tech Illustration */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/40 backdrop-blur-sm p-4 flex items-center justify-center shadow-2xl group"
              >
                {/* Cyberpunk borders / corner decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-theme-teal/40 rounded-tl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-theme-teal/40 rounded-tr" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-theme-teal/40 rounded-bl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-theme-teal/40 rounded-br" />

                {/* Animated Scanner Bar */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-theme-teal to-transparent opacity-30 shadow-[0_0_15px_#00E5FF] animate-bounce pointer-events-none z-20" style={{ animationDuration: '4s' }} />

                <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-black/40">
                  <Image 
                    src="/images/tech_error_404.png"
                    alt="ASCIRVO 404 System Protocol Error"
                    fill
                    sizes="(max-width: 480px) 100vw, 480px"
                    priority
                    className="object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  
                  {/* Digital overlay text grid */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-slate-500 bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800 backdrop-blur-md">
                    <span>ERR_CODE: 404_PAGE_NOT_FOUND</span>
                    <span className="text-theme-teal">STATUS: READY_TO_REDIRECT</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
