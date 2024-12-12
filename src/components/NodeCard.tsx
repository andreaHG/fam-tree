import { TreeNode } from "../parser";

// Custom Node Renderer
// TODO: Toggle node functionality
const NodeCard = ({ nodeDatum }: { nodeDatum: TreeNode }) => {
  const isSpouse = nodeDatum.attributes?.relationship === "Spouse";

  return (
    <foreignObject
      width={200}
      height={200}
      x={isSpouse ? -55 : -100} // Slightly adjust spouse position
      y={isSpouse ? -355 : -55}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          border: "2px solid white",
          borderRadius: "10px",
          paddingBottom: "1rem",
          backgroundColor: isSpouse ? "#f9eaea" : "#fff",
          color: "#101",
        }}
      >
        <h3>{nodeDatum.name}</h3>
        {/* {isSpouse && <p style={{ fontSize: "0.8rem", margin: 0 }}>Spouse</p>} */}
      </div>
    </foreignObject>
  );
};
export default NodeCard;
