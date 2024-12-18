import Papa from "papaparse";
import { FamilyMember } from "./FamilyTree";

export async function fetchAndParseCSV() {
  const response = await fetch("/assets/fam-tree.csv");
  const csvText = await response.text();

  const parsedData = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  return parsedData.data;
}

// Define types for the CSV data and the tree structure
export interface CSVData {
  id: string;
  name: string;
  gender: string;
  mother?: string;
  father?: string;
  children?: string;
  spouses?: string;
  status?: string;
}

export interface TreeNode {
  name: string;
  attributes?: {
    mother?: string;
    father?: string;
    rstatus?: string;
    // spouses?: string;
    relationship: string;
  };
  children?: TreeNode[];
}

export function transformToFamilyTreeForChart(
  parsedData: CSVData[]
): FamilyMember[] {
  console.log("parsedData in transformToFamilyTreeForChart", parsedData);
  return parsedData.map((row) => {
    // Normalize `children` to always be a string for splitting
    const childrenString =
      typeof row.children === "number"
        ? String(row.children) // Convert single number to string
        : typeof row.children === "string"
        ? row.children // Keep string as is
        : ""; // Default to empty string for null/undefined

    // Normalize `spouses` to always be a string for splitting
    const spousesString =
      typeof row.spouses === "number"
        ? String(row.spouses)
        : typeof row.spouses === "string"
        ? row.spouses
        : "";

    // console.log("row is:", row);

    // Split children and spouses into arrays, handling empty or undefined cases
    const childrenArray = childrenString
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter(Boolean);

    const spousesArray = spousesString
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter(Boolean);

    // console.log("childrenArray", childrenArray);

    // Parse the first and last name from the full name
    const [firstName, ...lastNameParts] = row.name.split(" ");
    const lastName = lastNameParts.join(" ").trim();

    // Create the FamilyMember object
    const familyMember: FamilyMember = {
      id: row.id,
      rels: {
        spouses: spousesArray.length > 0 ? spousesArray : [],
        father: row.father ? parseInt(row.father) : undefined,
        mother: row.mother ? parseInt(row.mother) : undefined,
        children: childrenArray.length > 0 ? childrenArray : [],
      },
      data: {
        "first name": firstName,
        "last name": lastName || undefined,
        gender: row.gender === "M" ? "M" : "F", // Assume "status" determines gender
        birthday: "",
        avatar: "",
      },
    };

    return familyMember;
  });
}
