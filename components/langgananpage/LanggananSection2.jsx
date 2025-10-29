  "use client";

  import { useEffect, useState } from "react";
  import Script from "next/script";
  import { Star, Home, Users, CheckCircle } from "lucide-react";

  export default function LanggananPage() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [confirmPlan, setConfirmPlan] = useState(null);
    const [isPaying, setIsPaying] = useState(false);

    // 🔹 Load pilihan dari homepage (localStorage)
    useEffect(() => {
      const stored = localStorage.getItem("selectedPlan");
      if (stored) setSelectedPlan(JSON.parse(stored));
    }, []);

    // 🔹 Daftar paket langganan
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

    // 🔹 Ketika user klik tombol “Pilih Paket”
    const handleSelectPlan = (plan) => {
      setConfirmPlan(plan);
    };

    // 🔹 Proses pembayaran Midtrans
    const handlePayment = async () => {
      setIsPaying(true);
      try {
        const res = await fetch("/api/midtrans/create-transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      order_id: `ORDER-${Date.now()}`,
      gross_amount: confirmPlan.price.includes("RP")
        ? Number(confirmPlan.price.replace(/\D/g, ""))
        : 0,
      customer_name: "User Example",
      email: "user@example.com",
    }),
  });


        const data = await res.json();
        if (data.token) {
          window.snap.pay(data.token, {
            onSuccess: () => alert("✅ Pembayaran sukses!"),
            onPending: () => alert("🕓 Menunggu pembayaran..."),
            onError: () => alert("❌ Pembayaran gagal!"),
            onClose: () => alert("Kamu menutup popup pembayaran."),
          });
        } else {
          alert("Gagal membuat transaksi.");
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat memproses pembayaran.");
      } finally {
        setIsPaying(false);
        setConfirmPlan(null);
      }
    };

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
      <>
        {/* 🔹 Load script Midtrans Snap */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        />

        <section className="relative py-16 bg-gray-50 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            {/* Judul */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2">
                Paket Langganan
              </h2>
              <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
                Pilih paket sesuai kebutuhan kamu.
              </p>
            </div>

            {/* Kartu Paket */}
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6">
              {plans.map((plan, index) => {
                const isActive = selectedPlan?.title === plan.title;
                return (
                  <div
                    key={index}
                    className={`${plan.isPopular ? popularCardStyle : baseCardStyle} ${
                      isActive ? "ring-4 ring-green-400" : ""
                    }`}
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
                          />{" "}
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 🔹 Popup konfirmasi */}
        {confirmPlan && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] md:w-[400px] text-center animate-fadeIn">
              <h3 className="text-lg font-bold mb-3">Konfirmasi Pembayaran</h3>
              <p className="text-sm text-gray-600 mb-6">
                Apakah kamu yakin ingin berlangganan{" "}
                <span className="font-semibold text-green-700">
                  {confirmPlan.title}
                </span>{" "}
                seharga{" "}
                <span className="font-semibold text-green-700">
                  {confirmPlan.price}
                </span>{" "}
                {confirmPlan.per}?
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setConfirmPlan(null)}
                  className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isPaying}
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    isPaying
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isPaying ? "Memproses..." : "Ya, Bayar Sekarang"}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
