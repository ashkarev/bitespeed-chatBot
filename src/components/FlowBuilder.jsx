import React, { useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "./TextNode";

function FlowBuilder() {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // connect nodes
  const onConnect = (params) => {
  // check if source already has an outgoing edge
  const alreadyHasEdge = edges.some(
    (edge) => edge.source === params.source
  );

  if (alreadyHasEdge) {
    alert("Only one outgoing connection allowed from a node");
    return;
  }

  setEdges((prev) => addEdge(params, prev));
};

  // allow dropping
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // handle drop
  const onDrop = (event) => {
    event.preventDefault();

    const bounds = reactFlowWrapper.current.getBoundingClientRect();

    const position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };

    const newNode = {
  id: Date.now().toString(),
  position,
  data: { label: "Text Message" },
  type: "textNode",   
};

    setNodes((prev) => [...prev, newNode]);
  };


  const nodeTypes = {
  textNode: TextNode,
};
  return (
    <div className="flex w-full h-full">

      {/* LEFT PANEL */}
      <div className="w-1/5 border-r p-4">
        <h2 className="font-bold mb-4">Nodes Panel</h2>

        <div
          className="border p-2 rounded bg-blue-100 cursor-grab"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", "textNode");
          }}
        >
          Message Node
        </div>
      </div>

      {/* CANVAS */}
      <div className="flex-1 h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/5 border-l p-4">
        <h2 className="font-bold mb-4">Settings Panel</h2>
      </div>
    </div>
  );
}

export default FlowBuilder;