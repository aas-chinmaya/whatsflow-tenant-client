// import Image from "next/image";

// import AuthFormContainer from "@/components/containers/AuthFormContainer";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

//         {/* Auth Component (Handles Login & Reset Password) */}
//         <AuthFormContainer />

//       </main>

//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

//         <a className="flex items-center gap-2 hover:underline" href="https://nextjs.org">
//           <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
//           Go to MetaFlow.Com →
//         </a>
//       </footer>
//     </div>
//   );



// components/SaasLandingPage.js
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MessageSquare,
  Send,
  Mail,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import AuthFormContainer from "@/components/containers/AuthFormContainer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SaasLandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //start
  const router = useRouter();

  //end
  const heroRef = useRef(null);
  const partnersRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll(".animate-hero");
      gsap.fromTo(
        heroElements,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" }
      );
    }

    // Partners section animations
    // if (partnersRef.current) {
    //   gsap.fromTo(
    //     partnersRef.current.querySelectorAll(".partner-logo"),
    //     { opacity: 0, scale: 0.8 },
    //     {
    //       opacity: 1,
    //       scale: 1,
    //       stagger: 0.1,
    //       duration: 0.6,
    //       scrollTrigger: {
    //         trigger: partnersRef.current,
    //         start: "top 80%",
    //       },
    //     }
    //   );
    // }

    if (partnersRef.current) {
      gsap.to(partnersRef.current, {
        x: "-50%", // Move it to left by 50% of its width
        duration: 10, // Adjust speed
        ease: "linear",
        repeat: -1, // Infinite loop
        modifiers: {
          x: (x) => `${parseFloat(x) % 100}%`, // Ensures a seamless loop
        },
      });
    }

    // Services section animations
    if (servicesRef.current) {
      const cards = servicesRef.current.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 70%",
          },
        }
      );
    }

    // CTA section animations
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "100% 50%",
          duration: 8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, []);

  // Sample partner logos - in production, import actual images
  const partners = [
    { name: "Company 1", logo: "/partners/zomato.webp" },
    { name: "Company 2", logo: "/partners/tira.jpg" },
    { name: "Company 3", logo: "/partners/meesho.jpg" },
    { name: "Company 4", logo: "/partners/skentino.png" },
    { name: "Company 5", logo: "/partners/puma.jpg" },
    { name: "Company 6", logo: "/partners/adidas.png" },
  ];

  const services = [
    {
      title: "WhatsApp Automation",
      description:
        "Automate customer engagement and support through WhatsApp with our intelligent chatbot solutions.",
      icon: <MessageSquare className="h-12 w-12 text-[#27e0b3]" />,
    },
    {
      title: "Instagram Marketing",
      description:
        "Grow your Instagram presence with automated posting, engagement analytics, and targeted campaigns.",
      icon: <Instagram className="h-12 w-12 text-[#27e0b3]" />,
    },
    {
      title: "Email Campaigns",
      description:
        "Create and schedule personalized email campaigns to nurture leads and boost conversions.",
      icon: <Mail className="h-12 w-12 text-[#27e0b3]" />,
    },
    {
      title: "Social Media Management",
      description:
        "Manage all your social media accounts from one dashboard with scheduling and analytics.",
      icon: <Send className="h-12 w-12 text-[#27e0b3]" />,
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "$49",
      billing: "/month",
      features: [
        "WhatsApp automation (500 messages)",
        "Basic Instagram tools",
        "Email campaigns (1,000 emails)",
        "5 social accounts",
        "Basic analytics",
      ],
    },
    {
      name: "Professional",
      price: "$99",
      billing: "/month",
      popular: true,
      features: [
        "WhatsApp automation (2,000 messages)",
        "Advanced Instagram marketing",
        "Email campaigns (5,000 emails)",
        "15 social accounts",
        "Advanced analytics and reporting",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "$249",
      billing: "/month",
      features: [
        "Unlimited WhatsApp automation",
        "Complete Instagram marketing suite",
        "Unlimited email campaigns",
        "Unlimited social accounts",
        "Custom integrations",
        "Dedicated account manager",
        "White-label solutions",
      ],
    },
  ];

  const faqs = [
    {
      question: "How does the WhatsApp automation work?",
      answer:
        "Our WhatsApp automation uses AI to understand customer queries and provide instant responses. It can handle multiple conversations simultaneously, route complex queries to human agents, and provide 24/7 support for your customers.",
    },
    {
      question: "Can I integrate with my existing CRM?",
      answer:
        "Yes, our platform seamlessly integrates with popular CRM solutions including Salesforce, HubSpot, and Zoho. We also offer custom API integrations for enterprise clients.",
    },
    {
      question: "How do you ensure compliance with messaging regulations?",
      answer:
        "We built our platform with compliance in mind. We adhere to WhatsApp Business API policies, GDPR, CCPA, and other regional regulations. Our system includes opt-in/opt-out management, data retention controls, and privacy-focused design.",
    },
    {
      question: "What kind of analytics do you provide?",
      answer:
        "Our analytics suite includes conversation metrics, response times, customer satisfaction scores, conversion tracking, campaign performance, and custom reporting options tailored to your business goals.",
    },
    {
      question: "Do you offer onboarding and training?",
      answer:
        "Yes, all plans include onboarding support. Professional and Enterprise plans include personalized training sessions, implementation assistance, and strategy consulting to ensure you get the most value from our platform.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar - Simplified with company name and buttons only */}
      <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span onClick={() => router.push("/")}  className="cursor-pointer text-2xl font-bold bg-[#27e0b3] text-transparent bg-clip-text">
                MetaFlow
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#contact"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact US
              </a>
              <butt
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 cursor-pointer rounded-full text-sm font-medium text-black bg-[#27e0b3] hover:bg-[#27e0b3] transition-all transform hover:scale-105"
              >
                Get Started
              </butt>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <a
              href="#contact"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </a>
            <a
              href="#demo"
              className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-black bg-[#27e0b3] hover:bg-blue-500"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      </nav>
      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm z-50">
          {/* Modal Container (Size depends on child component) */}
          <div className="relative">
            {/* Close Button (Absolute in top-right corner) */}
            <button
              className="absolute top-6 right-6 text-white p-2  h-10 w-10  rounded-full shadow-md  text-xl cursor-pointer transition-all duration-300  hover:rotate-90"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            {/* Your Component Inside Modal */}
            <AuthFormContainer isModalOpen={isModalOpen} setIsModalOpen ={setIsModalOpen }/>
          </div>
        </div>
      )}
      {/* Hero Section with gradient background */}
      <div
        ref={heroRef}
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-black to-gray-900"
      >
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full bg-blue-900/20 blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 rounded-full bg-indigo-900/20 blur-3xl top-40 right-0"></div>
          <div className="absolute w-96 h-96 rounded-full bg-purple-900/20 blur-3xl bottom-0 left-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="animate-hero text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-[#27e0b3] from-[#27e0b3] via-blue-300 to-indigo-400 text-transparent bg-clip-text">
              Supercharge Your Social Media Marketing
            </h1>
            <p className="animate-hero text-xl md:text-2xl mb-8 text-blue-100/80">
              All-in-one platform for WhatsApp automation, Instagram marketing,
              and social media management.
            </p>
            <div className="animate-hero flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#demo"
                className="group px-8 py-3 text-black bg-[#27e0b3] rounded-full font-bold hover:bg-[#27e0b3] transition-all flex items-center justify-center space-x-2 transform hover:translate-y-1"
              >
                <span>Get Free Demo</span>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="px-8 py-3 bg-transparent border-2 border-[#27e0b3] rounded-full font-bold hover:bg-[#27e0b3] transition-all"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Partners Section with Auto-scroll */}
      {/* <div ref={partnersRef} className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-[#27e0b3] font-semibold tracking-wide uppercase">
              Our Trusted Partners
            </h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-marquee items-center justify-around">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="partner-logo flex items-center justify-center mx-12 opacity-60 hover:opacity-100 transition-all"
                >
                  <img
                    src={partner.logo} // Use the actual logo path
                    alt={partner.name}
                    className="h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <div  className="py-16 bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-base text-[#27e0b3] font-semibold tracking-wide uppercase">
        Our Trusted Partners
      </h2>
    </div>

    <div  className="relative overflow-hidden">
      <div ref={partnersRef} className="flex animate-marquee items-center justify-around space-x-8">
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={index}
            className="partner-logo flex items-center justify-center opacity-60 hover:opacity-100 transition-all"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-16   w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      {/* Services Section with gradient background */}
      <div
        ref={servicesRef}
        id="services"
        className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Light beams */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 top-0 left-1/4 bg-blue-500/20 rotate-45 blur-3xl transform -translate-x-1/2"></div>
          <div className="absolute w-96 h-96 bottom-0 right-1/4 bg-indigo-500/20 rotate-45 blur-3xl transform translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-base text-[#27e0b3] font-semibold tracking-wide uppercase">
              Our Services
            </h2>
            {/* <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Social Media Automation Solutions
            </p> */}
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Streamline your social media presence with our powerful automation
              tools.
            </p>
          </div>

          <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all flex flex-col items-center text-center transform hover:-translate-y-2"
              >
                <div className="mb-6 bg-blue-900/30 p-4 rounded-xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing/Subscription Section */}
      <div id="pricing" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-[#27e0b3] font-semibold tracking-wide uppercase">
              Pricing
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Choose the Right Plan
            </p>
            {/* <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Flexible pricing options tailored to businesses of all sizes.
            </p> */}
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-all ${
                  plan.popular
                    ? "relative z-10 transform md:scale-105 shadow-xl shadow-blue-500/20"
                    : ""
                }`}
              >
                <div className="p-8 relative">
                  {plan.popular && (
                    <div className="  absolute right-2 bg-[#27e0b3] text-white text-xs px-2 font-bold uppercase tracking-wider text-center py-1 mb-6 rounded-full">
                      Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-xl font-semibold text-gray-400">
                      {plan.billing}
                    </span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#27e0b3] shrink-0 mr-2" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <a
                      href="#demo"
                      className={`w-full flex items-center justify-center px-5 py-3 rounded-full text-base font-medium transition-all transform hover:translate-y-1 ${
                        plan.popular
                          ? "bg-[#27e0b3] text-white hover:bg-[#27e0b3]"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      {plan.popular ? "Get started" : "Start free trial"}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-[#27e0b3] font-semibold tracking-wide uppercase">
              FAQ
            </h2>

            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Find answers to common questions about our platform.
            </p>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gray-800"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
                >
                  <span className="text-lg font-medium text-white group-hover:text-[#27e0b3] transition-colors">
                    {faq.question}
                  </span>
                  {activeFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-[#27e0b3] cursor-pointer" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#27e0b3] cursor-pointer" />
                  )}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeFaq === index ? "auto" : 0,
                    opacity: activeFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-gray-400">{faq.answer}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="text-2xl font-bold text-[#27e0b3]">Metaflow</div>
              <p className="mt-2 text-gray-400">
                All-in-one social media automation platform for modern
                businesses.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} SocialMeta. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white mr-4"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white mr-4"
              >
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Add Tailwind classes for animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SaasLandingPage;
