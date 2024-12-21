import { useState, useEffect } from "react";
import { FamilyTreeFields, UseAirtableResult } from "../types/airtable";
import { FamilyMember } from "../types/familyTree";
import { getMappedFamilyMembers } from "../parser";

export const useAirtableFamilyTree = (): UseAirtableResult => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllRecords = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_TREE_PATH
          }`
        );
        const data: FamilyTreeFields[] = await response.json();

        const mappedMembers = getMappedFamilyMembers(data);
        setFamilyMembers(mappedMembers);
      } catch (err: any) {
        // FIXME: provide better type for errors
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecords();
  }, []);

  return { familyMembers, loading, error };
};
