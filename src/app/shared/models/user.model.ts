import { VocationalStudy, CollegeStudy } from './study.model';
import { Language, LanguageName } from './language.model';
import { Offer } from './offer.model';
import { Experience } from './experience.model';
export interface Users {
  [id: number]: User;
}

export interface Configuration {
  languageName: LanguageName,
  notifications: NotificationProvince[]
}
export interface NotificationProvince {
  notified: boolean;
  province: Province
}
export interface UserAddress {
  street: string;
  province: Province;
  municipe: Municipe;
}
export interface DocumentType {
  uid: number;
  name: string;
}
export interface Municipe {
  uid: number;
  name: string;
}
export interface Province {
  uid: number;
  name: string;
}
export interface Student extends User {
  phone2: string;
  documentType: DocumentType;
  aboutMe: string;
  otherCompetences: string;
  license: string;
  avatar_hash: string;
  studies: (VocationalStudy | CollegeStudy)[];
  experiencies: Experience[];
  languages: Language[];
  birthdate: string;
}
export interface Enterprise extends User {
  comercialName: string;
  businessName: string;
  url: string
}
export interface User {
  password: string; // Only for mock
  id: number;
  username: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  documentNumber: string;
  address: UserAddress;
  roles: string[];
  offers: Offer[];
  configuration: Configuration;
}

export function createNewUser(user?: Student): Student {
  return {
    ...user,
    name: '',
    surname: '',
    id: -1,
    email: '',
    roles: [''],
    /*  avatar_hash: this.avatar_hash || null, */
    experiencies: [],
    studies: [],
    languages: [],
    offers: [],
    documentNumber: '',
    documentType: { uid: -1, name: '' },
    birthdate: '',
    address: { street: '', province: { uid: -1, name: '' }, municipe: { uid: -1, name: '' } }
  };
}
