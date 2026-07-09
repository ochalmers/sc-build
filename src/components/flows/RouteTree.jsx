import { useState } from "react";

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children?.length > 0;

  return (
    <li className="select-none">
      <div className="flex items-center gap-2 py-1" style={{ paddingLeft: `${depth * 1.25}rem` }}>
        {hasChildren ? (
          <button
            type="button"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[12px] text-ink-400 hover:bg-ink-100"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "−" : "+"}
          </button>
        ) : (
          <span className="w-5 shrink-0" aria-hidden />
        )}
        <span className="font-mono text-[13px] text-ink-800">{node.path}</span>
        {node.label ? <span className="text-[12px] text-ink-500">— {node.label}</span> : null}
      </div>
      {hasChildren && open ? (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child.path} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function RouteTree({ routes }) {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
      <ul>
        {routes.map((node) => (
          <TreeNode key={node.path} node={node} />
        ))}
      </ul>
    </div>
  );
}
