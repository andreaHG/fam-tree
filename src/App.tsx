import { useEffect, useState } from "react";

import Tree from "react-d3-tree";
import Papa from "papaparse";

import "./App.css";
import { TreeNode, CSVData, formatDataForD3Tree } from "./parser";
import NodeCard from "./components/NodeCard";
import nodePath from "./components/NodePath";

function App() {
  const [treeData, setTreeData] = useState<TreeNode | null>(null); // State to hold the formatted tree data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch and parse the CSV file
    const fetchAndParseCSV = async () => {
      try {
        const response = await fetch("/family-tree.csv"); // Adjust path if needed
        const csvText = await response.text();

        // Parse the CSV
        const parsedData = Papa.parse<CSVData>(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) => header?.toLowerCase(),
        }).data;

        // Format the parsed data for react-d3-tree
        const formattedData = formatDataForD3Tree(parsedData);
        console.log("parsedData", parsedData);
        console.log("formattedData", formattedData);

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
    <div id="treeWrapper" style={{ width: "100%", height: "100vh" }}>
      <Tree
        zoomable
        draggable
        data={treeData}
        orientation="vertical"
        nodeSize={{ x: 600, y: 300 }}
        renderCustomNodeElement={(rd3tProps) => <NodeCard {...rd3tProps} />}
        // rootNodeClassName="node__root"
        // branchNodeClassName="node__branch"
        // leafNodeClassName="node__leaf"
        pathFunc={nodePath}
        pathClassFunc={() => "my-path-class"}
      />
    </div>
  );
}

export default App;
