export interface SharedData {
    basic_info: BasicSharedInfo;
    skills:     Skills;
}

export interface BasicSharedInfo {
    name:   string;
    titles: string[];
    social: Social[];
    image:  string;
}

export interface Social {
    name:  string;
    url:   string;
    class: string;
}

export type Skills = Array<SkillCategory>

export interface SkillCategory{
    name: string;
    data: Skill[];
}

export interface Skill {
    name:  string;
    icon: string;
    description: string;
    proficiency: string;
}

export interface LangSpecificData {
    basic_info: BasicInfo;
    projects: Project[];
    skills: Skills;
    experience: Experience[];
}

export interface BasicInfo {
    description_header: string;
    description:        string;
    section_name:       SectionName;
}

export interface SectionName {
    about:      string;
    projects:   string;
    skills:     string;
    experience: string;
    contact:    string;
}

export interface Experience {
    title:        string;
    years:        string;
    description:  string;
    technologies: string[];
}

export interface Project {
    title:        string;
    startDate:    string;
    description:  string;
    images:       string[];
    url:          string;
    technologies: Technology[];
}

export interface Technology {
    class: string;
    name:  string;
}








