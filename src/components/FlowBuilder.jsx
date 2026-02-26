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

  // 🔹 NEW: selected node state
  const [selectedNode, setSelectedNode] = useState(null);

  // connect nodes (only one outgoing edge allowed)
  const onConnect = (params) => {
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

  // 🔹 NEW: when node is clicked
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // 🔹 NEW: update node text
  const updateNodeText = (value) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, label: value } }
          : n
      )
    );

    // also update selectedNode state
    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, label: value },
    }));
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
          onNodeClick={onNodeClick}  
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/5 border-l p-4">
        <h2 className="font-bold mb-4">Settings Panel</h2>

        {selectedNode ? (
          <div>
            <label className="block text-sm mb-2">Edit Message</label>

            <input
              type="text"
              value={selectedNode.data.label}
              onChange={(e) => updateNodeText(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Click a node to edit message
          </p>
        )}
      </div>

    </div>
  );
}

export default FlowBuilder;