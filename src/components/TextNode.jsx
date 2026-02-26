import React from "react";
import { Handle, Position } from "reactflow";

function TextNode({ data }) {
  return (
    <div className="bg-white border rounded shadow p-3 w-44 text-sm cursor-pointer">

      {/* Header */}
      <div className="font-semibold text-blue-600 mb-1">
        Send Message
      </div>

      {/* Message text */}
      <div className="text-gray-700 break-words">
        {data.label}
      </div>

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