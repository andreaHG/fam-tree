import { useEffect, useState } from "react";
import Papa from "papaparse";

import "./App.css";
import { CSVData, transformToFamilyTreeForChart } from "./parser";
import FamilyTree, { FamilyMember } from "./FamilyTree";

function App() {
  const [treeData, setTreeData] = useState<FamilyMember[] | null>(null); // State to hold the formatted tree data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch and parse the CSV file
    const fetchAndParseCSV = async () => {
      try {
        const response = await fetch("/sample.csv"); // Adjust path if needed
        const csvText = await response.text();

        // Parse the CSV
        const parsedData = Papa.parse<CSVData>(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) => header?.toLowerCase(),
        }).data;

        // Format the parsed data for react-d3-tree
        const formattedData = transformToFamilyTreeForChart(parsedData);
        // console.log("parsedData", parsedData);
        // console.log("formattedData", formattedData);

        setTreeData(formattedData); // Set the formatted data to state
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndParseCSV();
  }, []);

  // Render loading state or tree
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!treeData) {
    return <p>No data available</p>;
  }

  return (
    <>
      <div>
        <h1>Family Tree V1</h1>
      </div>
      <FamilyTree data={treeData} />
    </>
  );
}

export default App;
