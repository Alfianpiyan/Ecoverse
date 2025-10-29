"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Star, Home, Users, CheckCircle } from "lucide-react";

export default function LanggananSection() {
  const plans = [
    {
      icon: <Star className="w-6 h-6 text-green-500" />,
      title: "Trial",
      desc: "Coba layanan kami selama 3 bulan",
      price: "GRATIS",
      per: "/ 3 BULAN",
      buttonText: "Coba Gratis",
      features: ["Akses terbatas", "Dukungan komunitas", "Contoh proyek"],
      isPopular: false,
    },
    {
      icon: <Home className="w-6 h-6 text-white" />,
      title: "Standard",
      desc: "Ideal untuk penggunaan pribadi",
      price: "RP 150.000",
      per: "/ BULAN",
      buttonText: "Pilih Standard",
      features: [
        "Semua fitur Trial",
        "Akses penuh fitur",
        "Dukungan 24/7",
        "Analitik bulanan",
      ],
      isPopular: true,
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Premium",
      desc: "Paket hemat 3 bulan",
      price: "RP 400.000",
      per: "/ 3 BULAN",
      buttonText: "Pilih Premium",
      features: [
        "Semua fitur Standard",
        "Akses fitur Premium",
        "Konsultasi khusus",
      ],
      isPopular: false,
    },
  ];

  const handleSelectPlan = (plan) => {
    try {
      const planData = {
        title: plan.title,
        desc: plan.desc,
        price: plan.price,
        per: plan.per,
        features: plan.features,
        isPopular: plan.isPopular,
      };
      localStorage.setItem("selectedPlan", JSON.stringify(planData));
      window.location.href = "/user/langganan";
    } catch (error) {
      console.error("Gagal menyimpan paket:", error);
    }
  };

  // === ANIMASI SCROLL TANPA FILE TAMBAHAN ===
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" },
            });
          } else {
            controls.start({
              opacity: 0,
              y: 70,
              transition: { duration: 0.7, ease: "easeOut" },
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  const baseCardStyle =
    "bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full md:w-[280px] transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px]";
  const popularCardStyle =
    "bg-green-700 text-white p-7 rounded-xl shadow-2xl w-full md:w-[300px] transform scale-[1.03] z-10 transition-all duration-300 ease-in-out hover:scale-[1.05]";
  const baseButtonStyle =
    "block w-full text-center px-5 py-2.5 text-sm rounded-lg font-semibold border-2 transition-all duration-300";
  const popularButtonStyle =
    "bg-white text-green-700 border-white hover:bg-gray-100";
  const regularButtonStyle =
    "bg-green-600 text-white border-green-600 hover:bg-green-700";

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 70 }}
      className="relative py-16 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* === Judul === */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2">
            Paket Langganan
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Mulai tingkatkan pengalaman Anda dengan penawaran terbaik kami.
          </p>
        </motion.div>

        {/* === Kartu Paket === */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: index % 2 === 0 ? 50 : -50, // kiri-kanan beda arah
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: false, amount: 0.2 }}
              className={plan.isPopular ? popularCardStyle : baseCardStyle}
            >
              <div className="text-center relative">
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">
                    POPULER
                  </div>
                )}

                <div
                  className={`flex justify-center mb-3 ${
                    plan.isPopular ? "text-white" : "text-green-600"
                  }`}
                >
                  {plan.icon}
                </div>

                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.isPopular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.title}
                </h3>
                <p
                  className={`text-xs mb-5 ${
                    plan.isPopular ? "text-green-200" : "text-gray-500"
                  }`}
                >
                  {plan.desc}
                </p>

                <div className="mb-6 border-t border-b border-opacity-20 border-current py-3">
                  <h4
                    className={`text-3xl font-extrabold ${
                      plan.isPopular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </h4>
                  <p
                    className={`text-sm font-medium ${
                      plan.isPopular ? "text-green-300" : "text-gray-500"
                    }`}
                  >
                    {plan.per}
                  </p>
                </div>
              </div>

              <ul
                className={`text-left mb-6 space-y-2 text-sm ${
                  plan.isPopular ? "text-green-100" : "text-gray-700"
                }`}
              >
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle
                      className={`w-3.5 h-3.5 mt-1 mr-2.5 shrink-0 ${
                        plan.isPopular ? "text-green-300" : "text-green-500"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                className={`${baseButtonStyle} ${
                  plan.isPopular ? popularButtonStyle : regularButtonStyle
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
