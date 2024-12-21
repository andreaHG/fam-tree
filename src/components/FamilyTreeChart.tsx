import { useEffect, useRef } from "react";
import f3 from "family-chart";
import { FamilyMember } from "../types/familyTree";

interface FamilyTreeChartPropsProps {
  data: FamilyMember[];
}

const FamilyTreeChartProps = ({ data }: FamilyTreeChartPropsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the family chart store
    const store = f3.createStore({
      data,
      node_separation: 250,
      level_separation: 150,
    });

    console.log("store", store);

    // Create the SVG element
    const svg = f3.createSvg(containerRef.current);

    // Configure the card element
    const Card = f3.elements.Card({
      store,
      svg,
      card_dim: {
        w: 220,
        h: 70,
        text_x: 75,
        text_y: 15,
        img_w: 60,
        img_h: 60,
        img_x: 5,
        img_y: 5,
      },
      card_display: [
        (i: any) =>
          `${i.data["first name"] || ""} ${i.data["last name"] || ""}`,
      ],
      mini_tree: true,
      link_break: false,
    });

    // Attach the chart logic to the store
    store.setOnUpdate((props: any) =>
      f3.view(store.getTree(), svg, Card, props || {})
    );

    // Initialize the tree
    store.updateTree({ initial: true });
  }, [data]);

  return <div id="FamilyChart" ref={containerRef} className="f3"></div>;
};

export default FamilyTreeChartProps;
