// src/pages/ContactPage.jsx

import { PROFILE } from "../utils/profile";

export default function ContactPage() {
  const { personalInfo, languages, certifications } = PROFILE;

  return (
    <div className="text-white">
      <div className="mb-8">
        <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm">
          Connect Terminal
        </p>

        <h1 className="text-5xl font-black mt-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Contact Me
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="rounded-3xl bg-[#0b1120] border border-cyan-500/20 p-8">
          <h2 className="text-2xl font-black text-cyan-400 mb-6">
            Communication Channel
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-slate-400 text-sm">Email</p>
              <p className="text-xl text-white font-semibold">
                {personalInfo.email}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Phone</p>
              <p className="text-xl text-white font-semibold">
                {personalInfo.phone}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Location</p>
              <p className="text-xl text-white font-semibold">
                {personalInfo.location}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-white/5 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
            >
              GitHub
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-white/5 border border-fuchsia-500/20 hover:border-fuchsia-400 transition-all duration-300"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold text-fuchsia-400 mb-4">
              Languages
            </h3>

            <div className="flex gap-3 flex-wrap">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="px-4 py-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-3xl bg-[#0b1120] border border-fuchsia-500/20 p-8">
          <h2 className="text-2xl font-black text-fuchsia-400 mb-6">
            Certifications
          </h2>

          <div className="space-y-5">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="text-xl font-bold text-white">{cert.name}</h3>

                <p className="text-cyan-400 mt-2">{cert.provider}</p>

                <p className="text-slate-400 mt-1">{cert.year}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-black text-cyan-400 mb-6">
              Send Message
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-black/30 border border-cyan-500/20 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-black/30 border border-cyan-500/20 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full bg-black/30 border border-cyan-500/20 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />

              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-black hover:scale-[1.02] transition-all duration-300">
                TRANSMIT MESSAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
