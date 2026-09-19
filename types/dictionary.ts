export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
}

export interface FormationEntry {
  level: string;
  title: string;
  school: string;
  period: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    craft: string;
    photographies: string;
  };
  actions: {
    emailMe: string;
    downloadCv: string;
    openMenu: string;
    closeMenu: string;
    navigation: string;
  };
  home: {
    name: string;
    role: string;
    description: {
      title: string;
      body: string;
    };
    experiences: {
      title: string;
      items: ExperienceEntry[];
    };
    formations: {
      title: string;
      items: FormationEntry[];
    };
    more: {
      title: string;
      /** Sentence holding `{twitter}` and `{github}` placeholders. */
      body: string;
      twitter: string;
      github: string;
    };
  };
  craft: {
    title: string;
    body: string;
  };
  photographies: {
    title: string;
    body: string;
  };
}
