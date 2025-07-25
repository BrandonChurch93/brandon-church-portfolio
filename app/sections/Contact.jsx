"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, Check, Send, Copy, CheckCircle } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { cn } from "../utils/cn";
import { AnimatedTitle } from "../components/AnimatedText";
import {
  useIsMobile,
  useSectionAnimation,
  scrollAnimationVariants,
  ScrollTriggeredUnderline,
} from "../components/ScrollAnimations";
import { MobileMotionWrapper } from "../components/MobileMotionWrapper";

const Contact = () => {
  const { sectionRef, isInView, isMobile, containerVariants, getVariant } =
    useSectionAnimation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  // Email address
  const email = "brandonleochurch@gmail.com";

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for FormSubmit
  const handleSubmit = (e) => {
    // Don't prevent default - let FormSubmit handle the submission
    setIsSubmitting(true);

    // FormSubmit will redirect to _next URL after submission
    // The form will be submitted normally via POST
  };

  // Copy email to clipboard
  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative">
      {/* Background - subtle gradient only */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f2e]/50 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <MobileMotionWrapper
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <MobileMotionWrapper
            variants={getVariant(scrollAnimationVariants.title)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              <AnimatedTitle>Let's Connect</AnimatedTitle>
            </h2>
            <MobileMotionWrapper
              variants={getVariant(scrollAnimationVariants.slogan)}
              as="p"
              className="text-base sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto"
            >
              <ScrollTriggeredUnderline>
                Have a project in mind? Let's make it happen
              </ScrollTriggeredUnderline>
            </MobileMotionWrapper>
          </MobileMotionWrapper>

          {/* Main Content Grid - matching About section structure */}
          <div className="grid gap-8">
            {/* Top Row - Contact Info Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Availability Status */}
              <MobileMotionWrapper
                variants={getVariant(scrollAnimationVariants.cardLeft)}
              >
                <div
                  className={cn(
                    "glass card-hover rounded-3xl p-8 h-full",
                    "border border-white/10",
                    "hover:border-[#ff3f81]/30",
                    "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                    "hover:-translate-y-2",
                    "group"
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                    <span className="font-semibold text-lg text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                      Currently Available
                    </span>
                  </div>
                  <p className="text-white/80 flex items-center gap-2">
                    <Clock size={18} className="text-white/60" />I typically
                    respond within 24 hours
                  </p>
                </div>
              </MobileMotionWrapper>

              {/* What I'm Looking For */}
              <MobileMotionWrapper
                variants={getVariant(scrollAnimationVariants.cardCenter)}
              >
                <div
                  className={cn(
                    "glass card-hover rounded-3xl p-8 h-full",
                    "border border-white/10",
                    "hover:border-[#ff3f81]/30",
                    "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                    "hover:-translate-y-2",
                    "group"
                  )}
                >
                  <h3 className="font-semibold text-xl mb-4 text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                    I'm Open To
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Full-time opportunities",
                      "Contract projects",
                      "AI/ML consultations",
                      "Technical partnerships",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#ff3f81]/20 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-[#ff3f81]" />
                        </div>
                        <span className="text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MobileMotionWrapper>

              {/* Schedule a Meeting */}
              <MobileMotionWrapper
                variants={getVariant(scrollAnimationVariants.cardRight)}
              >
                <div
                  className={cn(
                    "glass card-hover rounded-3xl p-8 h-full",
                    "border border-white/10",
                    "hover:border-[#ff3f81]/30",
                    "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                    "hover:-translate-y-2",
                    "group"
                  )}
                >
                  <h3 className="font-semibold text-xl mb-4 text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                    Schedule a Meeting
                  </h3>
                  <div>
                    <p className="text-base text-white/90 font-medium mb-4">
                      Free 30-minute consultation
                    </p>
                    <div className="space-y-2 mb-6">
                      {[
                        "Discuss your project needs",
                        "Get a timeline & cost estimate",
                        "No commitment required",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#ff3f81]/20 flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-[#ff3f81]" />
                          </div>
                          <span className="text-white/80 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="secondary"
                      size="md"
                      href="https://calendly.com/modernsoftworks"
                      target="_blank"
                      className={cn(
                        "w-full",
                        "border-white/20 text-white hover:text-[#ff3f81]",
                        "hover:bg-white/10 backdrop-blur-sm",
                        "hover:border-[#ff3f81]/50",
                        "transition-all duration-200"
                      )}
                    >
                      Book Your Slot
                    </Button>
                  </div>
                </div>
              </MobileMotionWrapper>
            </div>

            {/* Bottom - Contact Form */}
            <MobileMotionWrapper
              variants={getVariant(scrollAnimationVariants.cardCenter)}
            >
              <div
                className={cn(
                  "glass card-hover rounded-3xl p-8 md:p-10",
                  "border border-white/10",
                  "hover:border-[#ff3f81]/30",
                  "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                  "hover:-translate-y-2"
                )}
              >
                {submitStatus === "success" ? (
                  // Success State
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                    role="alert"
                    aria-live="polite"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">
                      Message Sent!
                    </h3>
                    <p className="text-white/70 mb-6">
                      Thank you for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => setSubmitStatus(null)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  // Form with FormSubmit integration
                  <form
                    action="https://formsubmit.co/brandonleochurch@gmail.com"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* FormSubmit Configuration Fields - IMPORTANT: Update _next with your domain */}
                    <input
                      type="hidden"
                      name="_subject"
                      value="New Portfolio Contact!"
                    />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input
                      type="hidden"
                      name="_next"
                      value="https://yourdomain.com/#contact"
                    />

                    {/* Honeypot field for spam protection */}
                    <input
                      type="text"
                      name="_honey"
                      style={{ display: "none" }}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2 text-white"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={cn(
                            "w-full px-4 py-3 rounded-xl",
                            "bg-white/5 border border-white/10",
                            "text-white placeholder-white/50",
                            "focus:outline-none focus:ring-2 focus:ring-[#ff3f81] focus:border-transparent",
                            "hover:border-[#ff3f81]/30",
                            "transition-all duration-200"
                          )}
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2 text-white"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={cn(
                            "w-full px-4 py-3 rounded-xl",
                            "bg-white/5 border border-white/10",
                            "text-white placeholder-white/50",
                            "focus:outline-none focus:ring-2 focus:ring-[#ff3f81] focus:border-transparent",
                            "hover:border-[#ff3f81]/30",
                            "transition-all duration-200"
                          )}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-medium mb-2 text-white"
                      >
                        Project Type
                      </label>
                      <div className="relative">
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          required
                          className={cn(
                            "w-full px-4 py-3 rounded-xl appearance-none",
                            "bg-white/5 border border-white/10",
                            "text-white",
                            "focus:outline-none focus:ring-2 focus:ring-[#ff3f81] focus:border-transparent",
                            "hover:border-[#ff3f81]/30",
                            "transition-all duration-200"
                          )}
                        >
                          <option value="" className="bg-[#23153c]">
                            Select a project type
                          </option>
                          <option
                            value="Full-time Role"
                            className="bg-[#23153c]"
                          >
                            Full-time Role
                          </option>
                          <option
                            value="Contract Project"
                            className="bg-[#23153c]"
                          >
                            Contract Project
                          </option>
                          <option
                            value="AI/ML Consultation"
                            className="bg-[#23153c]"
                          >
                            AI/ML Consultation
                          </option>
                          <option value="Other" className="bg-[#23153c]">
                            Other
                          </option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="text-white/60"
                          >
                            <path
                              d="M5 7.5L10 12.5L15 7.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2 text-white"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl resize-none",
                          "bg-white/5 border border-white/10",
                          "text-white placeholder-white/50",
                          "focus:outline-none focus:ring-2 focus:ring-[#ff3f81] focus:border-transparent",
                          "hover:border-[#ff3f81]/30",
                          "transition-all duration-200"
                        )}
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {submitStatus === "error" && (
                      <div
                        className="p-4 bg-red-500/10 text-red-400 rounded-xl text-sm border border-red-500/20"
                        role="alert"
                        aria-live="assertive"
                      >
                        Something went wrong. Please try again or email me
                        directly.
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      icon={<Send size={18} />}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </MobileMotionWrapper>
          </div>
        </MobileMotionWrapper>
      </Container>
    </section>
  );
};

export default Contact;
