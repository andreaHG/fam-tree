import { FamilyTreeFields } from "./types/airtable";

export const getMappedFamilyMembers = (results: FamilyTreeFields[]) => {
  return results.map((field) => {
    // const field = record.fields as FamilyTreeFields;
    // Utility function to safely parse a comma-separated string into an array of numbers
    const parseIDs = (field?: string | null): number[] => {
      return field
        ? field
            .split(",")
            .map((id) => parseInt(id.trim()))
            .filter(Boolean)
        : [];
    };

    const [firstName, ...lastNameParts] = field.NAME.split(" ");
    const lastName = lastNameParts.join(" ").trim();

    return {
      id: field.ID,
      rels: {
        father: field.FATHER || undefined,
        mother: field.MOTHER || undefined,
        spouses: parseIDs(field.SPOUSES),
        children: parseIDs(field.CHILDREN),
      },
      data: {
        "first name": firstName,
        "last name": lastName || undefined,
        gender: field.GENDER,
        birthday: "",
        avatar: "",
      },
    };
  });
};
