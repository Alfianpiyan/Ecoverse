"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { id } from "date-fns/locale";
import { format, isSameDay, parseISO } from "date-fns";
import { supabase } from "../../../../lib/supabaseClient";
import "./calendarCustom.css";

export default function DaftarAcara() {
  const router = useRouter();
  const [tab, setTab] = useState("berlangsung");
  const [date, setDate] = useState(new Date());
  const [acaraList, setAcaraList] = useState([]);

  // 🔹 Ambil data acara dari Supabase (sama kayak landing page)
  useEffect(() => {
    const fetchAcara = async () => {
      try {
        const { data, error } = await supabase
          .from("acara_penanaman")
          .select("*")
          .order("tanggal", { ascending: true });

        if (error) throw error;

        // 🔹 Format tanggal jadi object Date
        const formatted = data.map((a) => ({
          ...a,
          tanggal: typeof a.tanggal === "string" ? parseISO(a.tanggal) : a.tanggal,
        }));

        setAcaraList(formatted);
      } catch (err) {
        console.error("Gagal mengambil data acara:", err.message);
      }
    };

    fetchAcara();
  }, []);

  // 🔹 Tentuin tanggal mana aja yang ada acara berlangsung / akan datang
  const tanggalBerlangsung = acaraList
    .filter((a) => a.status?.toLowerCase() === "sedang berlangsung")
    .map((a) => a.tanggal);

  const tanggalAkan = acaraList
    .filter((a) => a.status?.toLowerCase() === "akan datang")
    .map((a) => a.tanggal);

  // 🔹 Filter sesuai tab aktif
  const filteredAcara = useMemo(
    () =>
      acaraList.filter((a) =>
        tab === "berlangsung"
          ? a.status?.toLowerCase() === "sedang berlangsung"
          : a.status?.toLowerCase() === "akan datang"
      ),
    [tab, acaraList]
  );

  const handleClickAcara = (id) => {
    router.push(`/user/acara/${id}`);
  };

  return (
    <section className="bg-white rounded-2xl shadow-md p-8 max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-8">
      {/* kiri */}
      <div className="flex-1">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTab("berlangsung")}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              tab === "berlangsung"
                ? "bg-[#059669] text-white border-[#059669]"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Berlangsung
          </button>

          <button
            onClick={() => setTab("akan")}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              tab === "akan"
                ? "bg-gray-300 text-gray-800 border-gray-400"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Akan Datang
          </button>
        </div>

        {/* daftar acara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredAcara.map((a) => (
  <div
    key={a.id}
    onClick={() => handleClickAcara(a.id)}
    className={`rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition p-4 ${
      a.status?.toLowerCase() === "sedang berlangsung"
        ? "bg-[#E7F8EE] border-[#059669]"
        : "bg-gray-100 border-gray-300"
    }`}
  >
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-base text-gray-800">{a.title}</h3>
      <span
        className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
          a.status?.toLowerCase() === "sedang berlangsung"
            ? "bg-[#059669] text-white"
            : "bg-gray-400 text-white"
        }`}
      >
        {a.status}
      </span>
    </div>

    <p className="text-sm text-gray-600 mb-1">
      🗓️ {format(a.tanggal, "EEEE, d MMM yyyy", { locale: id })}
    </p>

    {a.time && (
      <p className="text-sm text-gray-600 mb-1">🕒 {a.time}</p>
    )}

    {a.lokasi && (
      <p className="text-sm text-gray-600 mb-1">📍 {a.lokasi}</p>
    )}

    {a.deskripsi && (
      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{a.deskripsi}</p>
    )}
  </div>
))}

        </div>
      </div>

      {/* kanan: kalender */}
      <div className="w-full md:w-[320px] flex justify-center items-center">
        <div className="bg-gray-100 rounded-2xl shadow-md p-5 w-full">
          <h2 className="text-center font-semibold mb-4 text-lg text-gray-800">Kalender</h2>
          <div className="rounded-xl overflow-hidden shadow-inner bg-white p-3">
            <Calendar
              onChange={setDate}
              value={date}
              locale="id-ID"
              formatShortWeekday={(locale, date) =>
                format(date, "EEEEE", { locale: id }).toUpperCase()
              }
              next2Label={null}
              prev2Label={null}
              className="custom-calendar w-full"
              tileContent={({ date, view }) => {
                if (view === "month") {
                  if (tanggalBerlangsung.some((d) => isSameDay(d, date))) {
                    return <div className="dot-dot bg-[#059669]"></div>;
                  }
                  if (tanggalAkan.some((d) => isSameDay(d, date))) {
                    return <div className="dot-dot bg-gray-400"></div>;
                  }
                }
                return null;
              }}
            />
          </div>

          <div className="flex justify-center gap-4 text-xs mt-3 text-gray-600">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#059669] rounded-full"></span> Berlangsung
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span> Akan Datang
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
