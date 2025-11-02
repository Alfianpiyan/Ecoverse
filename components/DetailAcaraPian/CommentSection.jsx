"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function CommentSection({ commentsList, onSave }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        text: comment,
        createdAt: new Date().toLocaleString(),
      };
      const newList = [newComment, ...commentsList];
      onSave(newList);
      setComment("");
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1800);
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-green-100 shadow"
    >
      <h3 className="text-lg font-semibold text-green-900 mb-4">Komentar</h3>
      <textarea
        className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-green-300 outline-none"
        placeholder="Tulis komentar kamu..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white text-sm ${
            loading
              ? "bg-green-400 cursor-wait"
              : "bg-gradient-to-r from-green-600 to-green-700 hover:scale-105"
          } transition`}
        >
          {loading ? "Mengirim..." : "Kirim Komentar"}
        </button>
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 text-green-700 text-sm bg-green-50 px-3 py-1 rounded-full"
            >
              <CheckCircle2 size={16} />
              <span>Terkirim!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 space-y-2">
        {commentsList.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada komentar</p>
        ) : (
          commentsList.map((c) => (
            <div
              key={c.id}
              className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm"
            >
              <p>{c.text}</p>
              <p className="text-xs text-gray-400 mt-1">{c.createdAt}</p>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
