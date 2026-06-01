export type Persona = {
  id: string;
  title: string;
  summary: string;
  signal: string;
  promptRole: string;
  mindset: string;
};

export type Enhancement = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export type OutputLanguage = {
  locale: "en";
  label: string;
  hint: string;
  promptName: string;
};
