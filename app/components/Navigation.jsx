"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "../utils/cn";
import Container from "./Container";
import Button from "./Button";
import BCLogo from "./BCLogo";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [navAnimationClass, setNavAnimationClass] = useState("");
  const [logoAnimate, setLogoAnimate] = useState(true);

  // Navigation items
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;

      // Add animation class when becoming fixed
      if (scrolled && !isScrolled) {
        setNavAnimationClass("animate-nav-slide-down");
        // Reset animation by toggling it off then on
        setLogoAnimate(false);
        setTimeout(() => setLogoAnimate(true), 50);
        // Remove nav animation class after it completes
        setTimeout(() => setNavAnimationClass(""), 900);
      }

      setIsScrolled(scrolled);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const navHeight = 80; // Height of fixed navbar

      // Only set active section if navigation is fixed
      if (scrolled) {
        let currentSection = "";

        // Check sections in reverse order to find the current one
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const element = document.getElementById(section);

          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollPosition;

            // If we've scrolled to or past this section
            if (scrollPosition + navHeight + 50 >= elementTop) {
              currentSection = section;
              break; // Stop at the first (topmost) section we find
            }
          }
        }

        // Special case: if we're near the bottom, activate contact
        if (
          scrollPosition + windowHeight >=
          document.documentElement.scrollHeight - 100
        ) {
          currentSection = "contact";
        }

        setActiveSection(currentSection);
      } else {
        // Clear active section when at top (hero section)
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Simple body scroll lock - no position changes, just overflow
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Just prevent scrolling, don't change position
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (e, href) => {
    e.preventDefault();

    // Extract the section ID
    const targetId = href.substring(1);

    // Handle hero/top
    if (!targetId || targetId === "hero") {
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Find target element
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // Close mobile menu
    setIsMobileMenuOpen(false);

    // Scroll to element
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - 80;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[100]",
          isScrolled
            ? "bg-[rgba(35,21,60,0.8)] backdrop-blur-md"
            : "bg-transparent",
          navAnimationClass
        )}
        style={{
          transition: "background-color 300ms ease, backdrop-filter 300ms ease",
          borderBottomColor: isScrolled
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent",
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
        }}
      >
        <Container className="relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "#hero")}
              className="relative z-[110] group"
              aria-label="Brandon Church - Go to top"
              id="navigation-logo"
            >
              <BCLogo
                size="large"
                className="transition-transform duration-200 group-hover:scale-110 hidden lg:block"
                animate={logoAnimate}
              />
              <BCLogo
                size="default"
                className="transition-transform duration-200 group-hover:scale-110 lg:hidden"
                animate={logoAnimate}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={cn(
                        "relative px-2 py-1 text-sm font-medium transition-all duration-200",
                        activeSection === item.href.substring(1)
                          ? "text-[#ff3f81]"
                          : "text-white/80 hover:text-[#ff3f81]"
                      )}
                    >
                      {item.label}
                      {activeSection === item.href.substring(1) && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff3f81]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 ml-4">
                <Button
                  variant="secondary"
                  size="sm"
                  href="/downloads/BrandonChurchResume.pdf"
                  download="BrandonChurchResume.pdf"
                  icon={<Download size={16} />}
                  className={cn(
                    "border-white/20 text-white hover:text-[#ff3f81]",
                    "hover:bg-white/10 backdrop-blur-sm",
                    "hover:border-[#ff3f81]/50",
                    "transition-all duration-200"
                  )}
                >
                  Resume
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden relative z-[110] p-2 rounded-lg transition-all duration-200",
                "text-white hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3f81] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              )}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMobileMenuOpen
                      ? "opacity-0 rotate-90"
                      : "opacity-100 rotate-0"
                  )}
                />
                <X
                  size={24}
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMobileMenuOpen
                      ? "opacity-100 rotate-0"
                      : "opacity-0 -rotate-90"
                  )}
                />
              </div>
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-[90] lg:hidden transition-all duration-500",
          isMobileMenuOpen ? "visible" : "invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          id="mobile-menu"
          className={cn(
            "absolute right-0 top-0 h-full w-full",
            "bg-[rgba(35,21,60,0.95)] backdrop-blur-xl",
            "border-l border-white/10",
            "transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-8">
            {/* Mobile Nav Items */}
            <ul className="flex-1 space-y-1">
              {navItems.map((item, index) => (
                <li
                  key={item.label}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 50}ms`
                      : "0ms",
                  }}
                  className={cn(
                    "transition-all duration-500",
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  )}
                >
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={cn(
                      "block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-200",
                      activeSection === item.href.substring(1)
                        ? "text-[#ff3f81] bg-[#ff3f81]/10"
                        : "text-white/80 hover:text-[#ff3f81] hover:bg-white/10",
                      "cursor-pointer"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Actions */}
            <div
              className={cn(
                "space-y-3 pt-8 border-t border-white/10",
                "transition-all duration-500 delay-200",
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
            >
              <Button
                variant="primary"
                size="md"
                href="/downloads/BrandonChurchResume.pdf"
                download
                icon={<Download size={18} />}
                fullWidth
              >
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
