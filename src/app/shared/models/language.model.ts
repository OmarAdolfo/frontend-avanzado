export interface Language {
  uid: number;
  level: LanguageLevel;
  name: LanguageName;
  date: string;
}
export interface LanguageName {
  id: number;
  name: string;
}
export interface LanguageLevel {
  uid: number;
  name: string;
}
