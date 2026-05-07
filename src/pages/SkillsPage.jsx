// src/pages/SkillsPage.jsx

import { PROFILE } from "../utils/profile";

export default function SkillsPage() {
  const { skills, images } = PROFILE;

  const sections = [
    {
      title: "Frontend",
      items: skills.frontend,
      color: "cyan",
    },
    {
      title: "Backend",
      items: skills.backend,
      color: "fuchsia",
    },
    {
      title: "Database",
      items: skills.database,
      color: "emerald",
    },
    {
      title: "Tools",
      items: skills.tools,
      color: "orange",
    },
  ];

  return (
    <div className="text-white">
      <div className="mb-8">
        <p className="text-cyan-400 uppercase tracking-[0.4em] text-sm">
          Power Loadout
        </p>

        <h1 className="text-5xl font-black mt-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Skills & Tech Stack
        </h1>
      </div>

      {/* ICONS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {Object.entries(images.skillsIcons).map(([key, icon]) => (
          <div
            key={key}
            className="rounded-3xl border border-cyan-500/20 bg-[#0b1120] p-6 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all duration-300"
          >
            <img src={icon} alt={key} className="w-16 h-16" />

            <p className="capitalize font-bold text-cyan-300">
              {key}
            </p>
          </div>
        ))}
      </div>

      {/* SKILL SECTIONS */}
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-3xl bg-[#0b1120] border border-cyan-500/20 p-6"
          >
            <h2 className="text-2xl font-black text-cyan-400 mb-5">
              {section.title}
            </h2>

            <div className="flex flex-wrap gap-3">
              {section.items.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}