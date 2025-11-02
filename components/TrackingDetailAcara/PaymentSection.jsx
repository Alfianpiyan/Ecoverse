"use client";
import { motion } from "framer-motion";

export default function PaymentSection({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-green-100 shadow"
    >
      <h3 className="text-lg font-semibold text-green-900 mb-4">
        Riwayat Pembayaran
      </h3>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        <div>
          <p className="text-gray-500 text-xs">Tanggal Pembayaran</p>
          <p>{data.tanggal}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Metode</p>
          <p>{data.metode}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Jumlah Bibit</p>
          <p>{data.jumlahBibit}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Total Harga</p>
          <p>Rp {data.harga}</p>
        </div>
      </div>
    </motion.div>
  );
}
