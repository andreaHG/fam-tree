import { FamilyMember } from "./familyTree";
import { Gender } from "./enums";

export interface FamilyTreeFields {
  ID: number;
  NAME: string;
  GENDER: Gender;
  MOTHER: number;
  FATHER: number;
  CHILDREN: string; // Comma-separated list of children IDs (if needed)
  SPOUSES: string; // Comma-separated list of spouse IDs (if needed)
  STATUS: string; // NOT YET USED
}

export interface UseAirtableResult {
  familyMembers: FamilyMember[];
  loading: boolean;
  error: string | null;
}
