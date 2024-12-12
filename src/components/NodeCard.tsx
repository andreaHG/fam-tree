import { TreeNode } from "../parser";

// Custom Node Renderer
// TODO: Toggle node functionality
const NodeCard = ({ nodeDatum }: { nodeDatum: TreeNode }) => {
  return (
    <foreignObject width={200} height={120} x={-100} y={-55}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          border: "2px solid white",
          borderRadius: "10px",
          paddingBottom: "1rem",
          backgroundColor: "#fff",
          color: "#101",
        }}
      >
        <h3>{nodeDatum.name}</h3>
      </div>
    </foreignObject>
  );
};

export default NodeCard;
