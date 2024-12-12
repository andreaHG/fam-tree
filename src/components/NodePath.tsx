import { TreeLinkDatum } from "react-d3-tree";

const nodePath = (linkDatum: TreeLinkDatum) => {
  const { source, target } = linkDatum;

  console.log(linkDatum);
  //   const status = source.data.attributes?.rstatus || "married"; // Default to married

  if (target.data.attributes?.relationship === "Spouse") {
    // Horizontal line for spouses
    return `M${source.x},${source.y}H${target.x}`;
  }

  // Default step link for parent-child
  const midX = (source.x + target.x) / 2;
  const deltaY = target.y - source.y;
  return `M${source.x},${source.y} V${source.y + deltaY / 2} H${target.x} V${
    target.y
  }`;
};

export default nodePath;
