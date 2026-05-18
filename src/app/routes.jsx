import { createMemoryRouter } from "react-router";
import { OsLayout } from "./components/OsLayout";
import { HomeView } from "./components/views/HomeView";
import { SkillsView } from "./components/views/SkillsView";
import { ProjectsView } from "./components/views/ProjectsView";
import { ExperienceView } from "./components/views/ExperienceView";
import { ContactView } from "./components/views/ContactView";
export const router = createMemoryRouter([
    {
        path: "/",
        Component: OsLayout,
        children: [
            { index: true, Component: HomeView },
            { path: "skills", Component: SkillsView },
            { path: "projects", Component: ProjectsView },
            { path: "experience", Component: ExperienceView },
            { path: "contact", Component: ContactView },
        ],
    },
]);
