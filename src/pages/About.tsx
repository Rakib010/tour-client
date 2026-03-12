import { FaMapMarkerAlt, FaUsers, FaStar, FaCheckCircle } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import about1 from "../assets/images/about2.avif";
import about2 from "../assets/images/about.avif";
import t1 from "../assets/images/t11.avif";
import t2 from "../assets/images/t1.avif";
import t3 from "../assets/images/t3.avif";
import SectionHeader from "@/components/modules/Home/SectionHeader";

const values = [
  {
    icon: FaMapMarkerAlt,
    title: "Authentic Experiences",
    desc: "We go beyond tourist spots to show you the real heart of each destination.",
  },
  {
    icon: FaUsers,
    title: "Personalized Service",
    desc: "Your trip is tailored to your interests with our expert guidance.",
  },
  {
    icon: FaStar,
    title: "Quality Assurance",
    desc: "We maintain the highest standards in accommodations and transportation.",
  },
  {
    icon: GiEarthAmerica,
    title: "Sustainable Travel",
    desc: "We're committed to eco-friendly practices that protect destinations.",
  },
];

const team = [
  {
    name: "Sagor Ali",
    role: "Founder & CEO",
    bio: "With 5+ years in the travel industry, Sagor ensures every trip meets our high standards.",
    img: t1,
  },
  {
    name: "Rocky Haque",
    role: "Tour Operations",
    bio: "Rocky's logistical expertise guarantees smooth experiences for all our travelers.",
    img: t2,
  },
  {
    name: "Waliullah Siam",
    role: "Customer Experience",
    bio: "Siam makes sure every detail is perfect from booking to return.",
    img: t3,
  },
];

const whyChooseUs = [
  "Local expert guides in every destination",
  "Small group sizes for personalized attention",
  "Handpicked accommodations for comfort",
  "24/7 support during your travels",
  "Flexible booking and cancellation policies",
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[420px] sm:h-[500px] overflow-hidden">
        <img
          src={about1}
          alt="Travel landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-emerald-300 text-sm font-medium uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
            Discovering the world, creating unforgettable experiences
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mb-6">
            We believe every journey should be meaningful, comfortable, and memorable.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/tour">Explore Tours</Link>
          </Button>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-emerald-600 text-white py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold">10,000+</p>
              <p className="text-emerald-100 text-sm mt-1">Happy Travelers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold">50+</p>
              <p className="text-emerald-100 text-sm mt-1">Destinations</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold">5+</p>
              <p className="text-emerald-100 text-sm mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold">4.9</p>
              <p className="text-emerald-100 text-sm mt-1">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Why We Exist"
            title="Our Mission & Vision"
            description="Dedicated to making travel accessible and memorable for everyone"
          />
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To inspire and enable people to experience the world's most breathtaking
                  destinations through carefully crafted tours that combine adventure,
                  culture, and comfort.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the most trusted name in travel by delivering exceptional
                  experiences that create lifelong memories while promoting sustainable
                  tourism practices.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
              <img
                src={about2}
                alt="Team & travel"
                className="w-full h-[320px] sm:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="What Drives Us"
            title="Our Core Values"
            description="The principles that guide every tour we create"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="The People Behind"
            title="Meet Our Team"
            description="Passionate travel experts dedicated to creating your perfect journey"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background ">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Why Travel With Us"
            title="The Wanderlust Difference"
            description="What makes our tours stand out"
          />
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            <ul className="space-y-4">
              {whyChooseUs.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="text-primary shrink-0 mt-1" size={20} />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <MdOutlineFamilyRestroom className="text-3xl text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold">Our Travelers Say</h3>
              </div>
              <blockquote className="text-foreground italic text-lg leading-relaxed mb-6">
                "The attention to detail and local knowledge made this trip unforgettable.
                We experienced places we never would have found on our own."
              </blockquote>
              <p className="font-semibold text-foreground">— The Rahman Family</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Explore our curated tours and create memories that last a lifetime.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/tour">Browse Tours</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/categories">View Categories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
