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

export interface Skills {
    icons: Icon[];
}

export interface Icon {
    name:  string;
    class: string;
    level: string;
}

export interface LangSpecificData {
    basic_info: BasicInfo;
    projects:   Project[];
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
}

export interface Experience {
    company:      string;
    title:        string;
    years:        string;
    mainTech:     string[];
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








