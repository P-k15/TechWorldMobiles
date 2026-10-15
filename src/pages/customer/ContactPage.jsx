import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function ContactPage() {
  const { addToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      addToast('Please provide your name and phone number', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Message sent to TechWorldMobiles store team! (Demo simulation)', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#E85D2A] bg-[#E85D2A]/10 px-2.5 py-1 rounded inline-block mb-2">
          Customer Support & Store Counter
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] font-heading">
          Contact TechWorldMobiles
        </h1>
        <p className="text-xs sm:text-sm text-[#69727C] mt-1 max-w-xl">
          Have an inquiry about stock availability, store pickup, trade-in valuations, or pre-owned warranties? Visit our retail counter or send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-[#17212B] text-white rounded-lg p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E85D2A]">
              Physical Storefront
            </span>
            <h2 className="text-lg font-bold text-white font-heading mt-1">TechWorldMobiles Experience Center</h2>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#E85D2A]" />
              </div>
              <div>
                <strong className="text-white block font-medium">Store Address</strong>
                <span className="text-[#69727C] leading-relaxed">Shop 4, Galleria Commercial Complex, Linking Road, Bandra West, Mumbai, Maharashtra 400050</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-[#E85D2A]" />
              </div>
              <div>
                <strong className="text-white block font-medium">Phone & WhatsApp Support</strong>
                <span className="text-[#69727C]">+91 98200 55123 / +91 98200 55124</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-4 h-4 text-[#E85D2A]" />
              </div>
              <div>
                <strong className="text-white block font-medium">Email Desk</strong>
                <span className="text-[#69727C]">support@techworldmobiles-demo.in</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-[#E85D2A]" />
              </div>
              <div>
                <strong className="text-white block font-medium">Store Operating Hours</strong>
                <span className="text-[#69727C]">Monday – Sunday: 10:30 AM – 9:30 PM (IST)</span>
              </div>
            </div>
          </div>

          {/* Location details card */}
          <div className="bg-white/5 rounded p-4 border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <MapPin className="w-3.5 h-3.5 text-[#E85D2A]" />
              <span>Linking Road Landmark</span>
            </div>
            <p className="text-[11px] text-[#69727C] leading-relaxed">
              Located opposite National College. Customer evaluation counter with dedicated technician bench and device diagnostic display.
            </p>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-[#E2E5E8] p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded bg-[#237A4B]/10 text-[#237A4B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#17212B] font-heading">Inquiry Submitted</h3>
              <p className="text-xs text-[#69727C] max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#17212B]">{formData.name}</span>. Our store desk has received your request and will call or message you on <span className="font-semibold text-[#17212B]">{formData.phone}</span>. (Demo simulation)
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
                }}
                className="mt-3 bg-[#17212B] hover:bg-[#20252B] text-white text-xs font-semibold px-4 py-2 rounded transition"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-[#E2E5E8] pb-3 mb-4">
                <h2 className="text-base font-bold text-[#17212B] font-heading">
                  Send Store Inquiry
                </h2>
                <p className="text-xs text-[#69727C] mt-0.5">
                  Fill in your details and our team will get in touch during retail store hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#17212B] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#17212B] mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98201 44521"
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#17212B] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@example.com"
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#17212B] mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                  >
                    <option value="New Smartphone Stock">New Smartphone Stock</option>
                    <option value="Pre-Owned Phone Inquiry">Pre-Owned Phone Inquiry</option>
                    <option value="Sell My Phone Evaluation">Sell My Phone Evaluation</option>
                    <option value="Store Warranty Claim">Store Warranty Claim</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#17212B] mb-1">
                  Message / Requirements
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify model name, storage variant, or trade-in questions..."
                  className="w-full bg-[#F5F5F2] border border-[#E2E5E8] rounded px-3 py-2 text-xs focus:bg-white focus:border-[#E85D2A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#E85D2A] hover:bg-[#d65120] text-white font-semibold py-2.5 px-4 rounded text-xs transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Store</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
