// ─── Shared (non-translatable) data ─────────────────────────────────────────

export interface SharedData {
  basic_info: BasicSharedInfo;
  /** Non-translatable project metadata (url, images, technologies, startDate) */
  projects: ProjectMeta[];
  /** Non-translatable skill metadata (icon, proficiency) per category */
  skills: SkillCategoryMeta[];
  /** Non-translatable experience metadata (logo_path, years, technologies) */
  experience: ExperienceMeta[];
}

export interface BasicSharedInfo {
  name: string;
  titles: string[];
  social: Social[];
  image: string;
}

export interface Social {
  name: string;
  url: string;
  class: string;
}

export interface ProjectMeta {
  startDate: string;
  images: string[];
  url: string;
  technologies: Technology[];
}

export interface SkillCategoryMeta {
  data: SkillMeta[];
}

export interface SkillMeta {
  icon: string;
  proficiency: number;
}

export interface ExperienceMeta {
  logo_path: string;
  years: string;
  technologies: string[];
}

export interface Technology {
  class: string;
  name: string;
}

// ─── Language-specific translations ──────────────────────────────────────────

export interface LangTranslations {
  basic_info: BasicInfo;
  /** Translatable project text (title, description) — same order as SharedData.projects */
  projects: ProjectTranslation[];
  /** Translatable skill category names and skill names/descriptions */
  skills: SkillCategoryTranslation[];
  /** Translatable experience text (title, description) — same order as SharedData.experience */
  experience: ExperienceTranslation[];
}

export interface ProjectTranslation {
  title: string;
  description: string;
}

export interface SkillCategoryTranslation {
  name: string;
  data: SkillTranslation[];
}

export interface SkillTranslation {
  name: string;
  description: string;
}

export interface ExperienceTranslation {
  title: string;
  description: string;
}

// ─── Merged result — what components receive ─────────────────────────────────

export interface LangSpecificData {
  basic_info: BasicInfo;
  projects: Project[];
  skills: Skills;
  experience: Experience[];
}

export interface BasicInfo {
  description_header: string;
  description: string;
  section_name: SectionName;
}

export interface SectionName {
  home: string;
  about: string;
  projects: string;
  skills: string;
  experience: string;
  contact: string;
}

export type Skills = Array<SkillCategory>

export interface SkillCategory {
  name: string;
  data: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
  description: string;
  proficiency: number;
}

export interface Project {
  title: string;
  startDate: string;
  description: string;
  images: string[];
  url: string;
  technologies: Technology[];
}

export interface Experience {
  title: string;
  logo_path: string;
  years: string;
  description: string;
  technologies: string[];
}
