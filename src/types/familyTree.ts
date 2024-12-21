import { Gender } from "./enums";

export interface FamilyMember {
  id: number;
  rels: {
    spouses?: number[];
    father?: number;
    mother?: number;
    children?: number[];
  };
  data: {
    "first name": string;
    "last name"?: string;
    birthday?: string;
    avatar?: string;
    gender: Gender;
  };
}
