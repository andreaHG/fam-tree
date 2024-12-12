import Papa from "papaparse";

// Papa.parse(file, config);

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
  mother?: string;
  father?: string;
  children?: string;
  spouses?: string;
  rstatus?: string;
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

export const formatDataForD3Tree = (data: CSVData[]): TreeNode | null => {
  // Standardize nodeMap to use string keys
  const nodeMap: Record<string, TreeNode & { addedChildren: Set<string> }> = {};

  // Initialize nodes
  data.forEach(({ id, name }) => {
    const nodeId = String(id); // Ensure id is always a string
    nodeMap[nodeId] = { name, children: [], addedChildren: new Set() };
  });

  // Establish relationships
  data.forEach(({ id, mother, father, children, spouses, rstatus }) => {
    const currentNodeId = String(id); // Standardize id as string
    const currentNode = nodeMap[currentNodeId];

    // Add to mother if exists and not already added
    if (mother) {
      const motherId = String(mother);
      if (
        nodeMap[motherId] &&
        !nodeMap[motherId].addedChildren.has(currentNodeId)
      ) {
        nodeMap[motherId].children!.push(currentNode);
        nodeMap[motherId].addedChildren.add(currentNodeId);
      }
    }

    // Add to father if exists and not already added
    if (father) {
      const fatherId = String(father);
      if (
        nodeMap[fatherId] &&
        !nodeMap[fatherId].addedChildren.has(currentNodeId)
      ) {
        nodeMap[fatherId].children!.push(currentNode);
        nodeMap[fatherId].addedChildren.add(currentNodeId);
      }
    }

    // Add children relationships
    if (children) {
      const childIds =
        typeof children === "string"
          ? children.split(",").map((id) => id.trim())
          : [String(children)];
      childIds.forEach((childId) => {
        if (nodeMap[childId] && !currentNode.addedChildren.has(childId)) {
          currentNode.children!.push(nodeMap[childId]);
          currentNode.addedChildren.add(childId);
        }
      });
    }

    // Add spouses as sibling-like nodes
    if (spouses) {
      const spouseIds =
        typeof spouses === "string"
          ? spouses.split(",").map((id) => id.trim())
          : [String(spouses)];
      spouseIds.forEach((spouseId) => {
        if (nodeMap[spouseId] && !currentNode.addedChildren.has(spouseId)) {
          currentNode.addedChildren.add(spouseId);

          // Add spouse as a sibling-like node
          if (currentNode.children) {
            currentNode.children.push({
              name: nodeMap[spouseId].name,
              attributes: {
                // id: spouseId,
                rstatus: rstatus || "Married",
                relationship: "Spouse",
              },
              children: [], // Spouses won't have nested children in this layout
            });
          }
        }
      });
    }
  });

  // Find root node(s)
  const rootNodes = data
    .filter(({ mother, father, spouses }) => !mother && !father && !spouses) // Ensure no parent and not just a spouse
    .map(({ id }) => {
      const nodeId = String(id);
      const { addedChildren, ...rest } = nodeMap[nodeId]; // Remove the internal `addedChildren`
      return rest;
    });

  console.log("nodeMap", nodeMap);
  console.log("rootNodes", rootNodes);

  // Return the highest node or null
  return rootNodes[0] || null;
};
