import { FaMapMarkerAlt, FaUsers, FaStar, FaCheckCircle } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { MdOutlineFamilyRestroom } from "react-icons/md";

import about1 from "../assets/images/about2.avif";
import about2 from "../assets/images/about.avif";

import t1 from "../assets/images/t11.avif";
import t2 from "../assets/images/t1.avif";
import t3 from "../assets/images/t3.avif";

// Values Section
const data = [
  {
    icon: <FaMapMarkerAlt className="text-4xl mb-4 text-emerald-600" />,
    title: "Authentic Experiences",
    desc: "We go beyond tourist spots to show you the real heart of each destination.",
  },
  {
    icon: <FaUsers className="text-4xl mb-4 text-emerald-600" />,
    title: "Personalized Service",
    desc: "Your trip is tailored to your interests with our expert guidance.",
  },
  {
    icon: <FaStar className="text-4xl mb-4 text-emerald-600" />,
    title: "Quality Assurance",
    desc: "We maintain the highest standards in accommodations and transportation.",
  },
  {
    icon: <GiEarthAmerica className="text-4xl mb-4 text-emerald-600" />,
    title: "Sustainable Travel",
    desc: "We're committed to eco-friendly practices that protect destinations.",
  },
];
// team member
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
    bio: "Rocky logistical expertise guarantees smooth experiences for all our travelers.",
    img: t2,
  },
  {
    name: "waliullah siam ",
    role: "Customer Experience",
    bio: "siam  makes sure every detail is perfect from booking to return.",
    img: t3,
  },
];
// why choose us
const text = [
  "Local expert guides in every destination",
  "Small group sizes for personalized attention",
  "Handpicked accommodations for comfort",
  "24/7 support during your travels",
  "Flexible booking and cancellation policies",
];

export default function About() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/60 to-blue-600/60 z-10 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl md:text-2xl">
              Discovering the world, creating unforgettable experiences
            </p>
          </div>
        </div>
        <img
          src={about1}
          alt="Travel landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mission Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why We Exist
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-6">
              To inspire and enable people to experience the world's most
              breathtaking destinations through carefully crafted tours that
              combine adventure, culture, and comfort.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To become the most trusted name in travel by delivering
              exceptional experiences that create lifelong memories while
              promoting sustainable tourism practices.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={about2}
              alt="Team photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Passionate travel experts dedicated to creating your perfect journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-emerald-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Travel With Us</h2>
            <div className="w-24 h-1 bg-emerald-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-6">
                {text.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <MdOutlineFamilyRestroom className="text-4xl text-emerald-600 mr-4" />
                <h3 className="text-xl font-semibold">Our Travelers Say</h3>
              </div>
              <blockquote className="text-gray-600 italic mb-4">
                "The attention to detail and local knowledge made this trip
                unforgettable. We experienced places we never would have found
                on our own."
              </blockquote>
              <p className="font-medium">- The Rahman Family</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
