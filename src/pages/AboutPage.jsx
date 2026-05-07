// src/pages/AboutPage.jsx

import { PROFILE } from "../utils/profile";


export default function AboutPage() {
  const { personalInfo, aboutMe, experience, education, images } = PROFILE;

  return (
    <div className="min-h-screen text-white bg-[#070B14]">
      {/* HERO */}
      <div
        className="relative overflow-hidden rounded-3xl border border-cyan-500/20"
        style={{
          backgroundImage: `url(${images.heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 p-8">
          <img
            src={images.profile}
            alt={personalInfo.fullName}
            className="w-40 h-40 rounded-3xl object-cover border-4 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.4)]"
          />

          <div className="flex-1">
            <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-2">
              Player Profile
            </p>

            <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              {personalInfo.fullName}
            </h1>

            <h2 className="text-2xl text-fuchsia-400 font-bold mb-4">
              {personalInfo.title}
            </h2>

            <p className="text-slate-300 leading-8 text-lg max-w-4xl">
              {aboutMe.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              {aboutMe.interests.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        <div className="rounded-2xl bg-[#0f172a] border border-cyan-500/20 p-6">
          <p className="text-slate-400 text-sm">Experience</p>
          <h3 className="text-4xl font-black text-cyan-400 mt-2">
            {experience.totalExperience}
          </h3>
        </div>

        <div className="rounded-2xl bg-[#0f172a] border border-fuchsia-500/20 p-6">
          <p className="text-slate-400 text-sm">Location</p>
          <h3 className="text-2xl font-bold text-fuchsia-400 mt-2">
            {personalInfo.location}
          </h3>
        </div>

        <div className="rounded-2xl bg-[#0f172a] border border-emerald-500/20 p-6">
          <p className="text-slate-400 text-sm">Specialization</p>
          <h3 className="text-2xl font-bold text-emerald-400 mt-2">
            MERN Stack
          </h3>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="mt-10">
        <h2 className="text-3xl font-black text-cyan-400 mb-6">
          Experience Log
        </h2>

        <div className="space-y-6">
          {experience.companies.map((company) => (
            <div
              key={company.companyName}
              className="rounded-3xl border border-cyan-500/20 bg-[#0b1120] p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {company.role}
                  </h3>

                  <p className="text-cyan-400 font-semibold mt-1">
                    {company.companyName}
                  </p>

                  <p className="text-slate-400 mt-1">
                    {company.location}
                  </p>
                </div>

                <div className="text-fuchsia-400 font-semibold">
                  {company.duration}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-5">
                {company.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3 text-slate-300">
                {company.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-cyan-400">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* EDUCATION */}
      <div className="mt-10">
        <h2 className="text-3xl font-black text-fuchsia-400 mb-6">
          Education
        </h2>

        <div className="grid gap-5">
          {education.map((item) => (
            <div
              key={item.degree}
              className="rounded-3xl bg-[#0b1120] border border-fuchsia-500/20 p-6"
            >
              <h3 className="text-2xl font-bold text-white">
                {item.degree}
              </h3>

              <p className="text-fuchsia-400 mt-2">
                {item.institution}
              </p>

              <p className="text-slate-400 mt-1">
                {item.location}
              </p>

              <div className="flex gap-6 mt-4 text-sm">
                <span className="text-cyan-400">{item.duration}</span>

                {item.cgpa && (
                  <span className="text-emerald-400">
                    {item.cgpa}
                  </span>
                )}

                {item.percentage && (
                  <span className="text-emerald-400">
                    {item.percentage}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}