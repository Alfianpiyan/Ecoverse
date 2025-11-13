'use client'
import { useState, useEffect } from 'react'

export default function Setting() {
  const [settings, setSettings] = useState({
    emailUpdates: false,
  })
  const [originalSettings, setOriginalSettings] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [showModal, setShowModal] = useState({
    privacy: false,
    terms: false,
    help: false,
    contact: false,
    about: false,
  })

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)
      setOriginalSettings(parsed)
    } else {
      setOriginalSettings({ ...settings })
    }
  }, [])

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings)

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = async () => {
    if (!hasChanges) return
    setIsLoading(true)
    setSaveStatus('menyimpan...')

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      localStorage.setItem('appSettings', JSON.stringify(settings))
      setOriginalSettings(settings)
      setSaveStatus('berhasil disimpan!')
    } catch {
      setSaveStatus('gagal menyimpan')
    } finally {
      setIsLoading(false)
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  const resetToDefault = () => {
    const defaultSettings = { emailUpdates: false }
    setSettings(defaultSettings)
    setSaveStatus('direset ke default')
    setTimeout(() => setSaveStatus(''), 3000)
  }

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full overflow-hidden animate-fadeIn">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition-colors text-xl"
            >
              ✕
            </button>
          </div>
          <div className="p-5 text-gray-600 space-y-3">{children}</div>
          <div className="flex justify-end p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-10 min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-green-700 mb-2">🌿 Pengaturan</h1>
          <p className="text-gray-600">Atur preferensi aplikasi web Anda</p>

          {saveStatus && (
            <div
              className={`mt-4 inline-block px-4 py-2 text-sm rounded-lg shadow-sm transition-all ${
                saveStatus.includes('gagal')
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}
            >
              {saveStatus}
            </div>
          )}
        </div>

        {/* email */}
        <SectionCard title="📧 Notifikasi Email">
          <ToggleItem
            label="Pembaruan Email"
            desc={
              settings.emailUpdates
                ? 'Email aktif — Anda akan menerima laporan perkembangan'
                : 'Email nonaktif — Tidak ada email yang dikirim'
            }
            active={settings.emailUpdates}
            onToggle={() => handleSettingChange('emailUpdates', !settings.emailUpdates)}
            isLoading={isLoading}
          />
        </SectionCard>

        {/* privasi */}
        <div className="space-y-6 mt-6">
          <SectionCard title="🔒 Privasi & Keamanan">
            <InfoButton
              label="Kebijakan Privasi"
              desc="Baca bagaimana kami melindungi data Anda"
              onClick={() => setShowModal({ ...showModal, privacy: true })}
            />
            <InfoButton
              label="Ketentuan Layanan"
              desc="Pelajari syarat dan ketentuan penggunaan aplikasi"
              onClick={() => setShowModal({ ...showModal, terms: true })}
            />
          </SectionCard>

          <SectionCard title="💬 Bantuan & Dukungan">
            <InfoButton
              label="Pusat Bantuan"
              desc="Temukan jawaban atas pertanyaan umum"
              onClick={() => setShowModal({ ...showModal, help: true })}
            />
            <InfoButton
              label="Hubungi Kami"
              desc="Butuh bantuan? Hubungi tim support"
              onClick={() => setShowModal({ ...showModal, contact: true })}
            />
            <InfoButton
              label="Tentang Aplikasi"
              desc="Informasi versi dan pengembang"
              onClick={() => setShowModal({ ...showModal, about: true })}
            />
          </SectionCard>
        </div>

        <div className="flex justify-between mt-10 bg-white p-5 rounded-xl shadow-md">
          <button
            onClick={resetToDefault}
            disabled={isLoading || !hasChanges}
            className={`px-5 py-3 rounded-lg font-medium transition-all ${
              hasChanges
                ? 'text-gray-700 border border-gray-300 hover:border-red-400 hover:bg-red-50'
                : 'text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
          >
            Reset ke Default
          </button>
          <button
            onClick={saveSettings}
            disabled={isLoading || !hasChanges}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all ${
              hasChanges
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>Simpan Perubahan</span>
            )}
          </button>
        </div>
      </div>

      {/* modals */}
      <Modal
        isOpen={showModal.privacy}
        onClose={() => setShowModal({ ...showModal, privacy: false })}
        title="Kebijakan Privasi"
      >
        <p>Kami berkomitmen menjaga kerahasiaan dan keamanan data Anda.</p>
      </Modal>

      <Modal
        isOpen={showModal.terms}
        onClose={() => setShowModal({ ...showModal, terms: false })}
        title="Ketentuan Layanan"
      >
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Gunakan aplikasi dengan itikad baik</li>
          <li>Hormati data dan privasi pengguna lain</li>
          <li>Tidak menyalahgunakan fitur untuk tujuan ilegal</li>
        </ul>
      </Modal>

      <Modal
        isOpen={showModal.help}
        onClose={() => setShowModal({ ...showModal, help: false })}
        title="Pusat Bantuan"
      >
        <p>Butuh bantuan? Cek panduan penggunaan atau hubungi tim kami.</p>
      </Modal>

      <Modal
        isOpen={showModal.contact}
        onClose={() => setShowModal({ ...showModal, contact: false })}
        title="Hubungi Kami"
      >
        <p className="text-center">📧 support@penanamanpohon.id</p>
      </Modal>

      <Modal
        isOpen={showModal.about}
        onClose={() => setShowModal({ ...showModal, about: false })}
        title="Tentang Aplikasi Web"
      >
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto text-2xl text-white">
            🌱
          </div>
          <h3 className="font-semibold text-gray-800">Aplikasi Penanaman Pohon</h3>
          <p className="text-sm text-gray-500">Versi 1.0.0</p>
        </div>
      </Modal>
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function ToggleItem({ label, desc, active, onToggle, isLoading }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-700 font-medium">{label}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <button
        onClick={onToggle}
        disabled={isLoading}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
          active ? 'bg-green-500' : 'bg-gray-300'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${
            active ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}

function InfoButton({ label, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all"
    >
      <p className="text-gray-700 font-medium">{label}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </button>
  )
}
