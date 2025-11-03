"use client";
import { motion } from "framer-motion";
import { Clock4, Sprout, CheckCircle2 } from "lucide-react";

export default function StatusSection({ data }) {
  const steps = [
    { key: "menunggu", icon: <Clock4 />, label: "Menunggu Acara" },
    { key: "ditanam", icon: <Sprout />, label: "Sedang Ditanam" },
    { key: "selesai", icon: <CheckCircle2 />, label: "Sudah Ditanam" },
  ];

  const activeIndex = steps.findIndex((s) => s.key === data.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-green-100 shadow"
    >
      <h3 className="text-lg font-semibold text-green-900 mb-4">Status Bibit Kamu</h3>
      <div className="relative mb-6">
        <div className="h-2 bg-gray-200 rounded-full" />
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-green-500 to-green-700 rounded-full"
        />
      </div>
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <div key={s.key} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                i <= activeIndex
                  ? "bg-green-600 text-white shadow"
                  : "bg-white border border-gray-300 text-gray-400"
              }`}
            >
              {s.icon}
            </div>
            <p
              className={`mt-2 text-xs ${
                i <= activeIndex ? "text-green-700" : "text-gray-400"
              }`}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
