'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ArrowRight, Sparkles, Send } from 'lucide-react'

export default function ConsultationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Estate',
    budget: '$250k - $500k',
    location: '',
    message: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 4000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0D0D11] border border-[#D4AF37]/30 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
        >
          {/* Background Ambient Gold Light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white flex items-center justify-center transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#F7F5F0]">
                Commission Request Received
              </h3>
              <p className="text-sm text-[#9A9A9E] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#D4AF37]">{formData.name}</span>. Our Senior Design Partner will personally review your project specifications and contact you within 24 hours.
              </p>
            </div>
          ) : (
            <div>
              <div className="space-y-3 mb-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs text-[#D4AF37] tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Private Consultation</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-[#F7F5F0]">
                  Inquire Private <span className="text-gold-gradient italic font-normal">Commission</span>
                </h3>
                <p className="text-xs md:text-sm text-[#9A9A9E]">
                  Share your architectural vision to schedule an exclusive consultation with our lead interior studio.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#D4AF37] mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lord Sterling"
                      className="w-full bg-[#14141A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#D4AF37] mb-2 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="concierge@estate.com"
                      className="w-full bg-[#14141A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#D4AF37] mb-2 font-medium">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#14141A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="Residential Estate">Residential Estate / Villa</option>
                      <option value="Sky Penthouse">Sky Penthouse</option>
                      <option value="Commercial Atelier">Commercial / Brand Atelier</option>
                      <option value="Hospitality Resort">Hospitality & Boutique Resort</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#D4AF37] mb-2 font-medium">
                      Target Investment Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#14141A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="$100k - $250k">$100,000 - $250,000</option>
                      <option value="$250k - $500k">$250,000 - $500,000</option>
                      <option value="$500k - $1M">$500,000 - $1,000,000</option>
                      <option value="$1M+">$1,000,000+ Bespoke</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#D4AF37] mb-2 font-medium">
                    Property Location & Scope Details
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the property square footage, architectural style preferences, and desired completion timeline..."
                    className="w-full bg-[#14141A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gold-gradient text-black font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all"
                >
                  <span>Submit Atelier Commission Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
