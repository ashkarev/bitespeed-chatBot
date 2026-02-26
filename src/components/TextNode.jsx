import React from "react";
import { Handle, Position } from "reactflow";

function TextNode({ data }) {
  return (
    <div className="bg-white border rounded shadow p-2 w-40 text-sm">

      {/* Title */}
      <div className="font-semibold mb-1">Send Message</div>

      {/* Message text */}
      <div className="text-gray-700">{data.label}</div>

      {/* Target Handle (left side) */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-gray-500"
      />

      {/* Source Handle (right side) */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-gray-500"
      />
    </div>
  );
}

export default TextNode;