// src/pages/ProjectsPage.jsx

import { PROFILE } from "../utils/profile";

export default function ProjectsPage() {
  const { projects } = PROFILE;

  return (
    <div className="text-white">
      <div className="mb-8">
        <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm">
          Mission Archive
        </p>

        <h1 className="text-5xl font-black mt-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          Featured Projects
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.projectName}
            className="overflow-hidden rounded-3xl bg-[#0b1120] border border-cyan-500/20 group hover:border-cyan-400 transition-all duration-300"
          >
            <div className="h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.projectName}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-white">
                  {project.projectName}
                </h2>

                <span className="text-cyan-400 text-sm">
                  {project.duration}
                </span>
              </div>

              <p className="mt-4 text-slate-300 leading-7">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-fuchsia-400 font-bold mb-3">
                  Features
                </h3>

                <ul className="space-y-2 text-slate-300">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="text-cyan-400">▹</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-bold hover:scale-105 transition-all duration-300"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}