import { TreeLinkDatum } from "react-d3-tree";

const NodePath = (linkDatum: TreeLinkDatum) => {
  const { source, target } = linkDatum;
  console.log(linkDatum);
  //   const status = source.data.attributes?.rstatus || "married"; // Default to married

  if (source.data.attributes?.relationship === "Spouse") {
    // Horizontal line for spouses
    return `M${source.x},${source.y}H${target.x}`;
  }

  // Default curved link for parent-child
  const midX = (source.x + target.x) / 2;
  return `M${source.x},${source.y}C${midX},${source.y} ${midX},${target.y} ${target.x},${target.y}`;
};

export default NodePath;
