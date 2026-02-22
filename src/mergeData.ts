import { LangSpecificData, LangTranslations, SharedData } from "./components/loaded_data_types";

export function mergeData(lang: LangTranslations, shared: SharedData): LangSpecificData {
    return {
        basic_info: lang.basic_info,
        projects: lang.projects.map((t, i) => ({
            ...shared.projects[i],
            ...t,
        })),
        skills: lang.skills.map((cat, i) => ({
            name: cat.name,
            data: cat.data.map((skill, j) => ({
                ...shared.skills[i].data[j],
                ...skill,
            })),
        })),
        experience: lang.experience.map((t, i) => ({
            ...shared.experience[i],
            ...t,
        })),
    };
}
