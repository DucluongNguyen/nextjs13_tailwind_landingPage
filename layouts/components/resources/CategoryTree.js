import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

// Cây danh mục tài nguyên, đệ quy — dùng chung cho trang xem công khai (readonly)
// và trang quản trị (editable, cho phép thêm/sửa/xoá category con ở bất kỳ cấp nào).
const CategoryNode = ({
  node,
  depth,
  selectedId,
  onSelect,
  editable,
  onAddChild,
  onRename,
  onDelete,
}) => {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  return (
    <li>
      <div
        className={`group flex items-center gap-1 rounded-lg px-2 py-1.5 text-base font-medium cursor-pointer ${
          isSelected
            ? "bg-primary/10 font-semibold text-primary"
            : "hover:bg-gray-100"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <button
          type="button"
          className="shrink-0 text-gray-500"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          {hasChildren ? (
            open ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )
          ) : (
            <span className="inline-block w-4" />
          )}
        </button>

        <span
          className="flex flex-1 items-center gap-1.5 truncate"
          onClick={() => {
            // Có danh mục con thì bấm vào tên cũng tự sổ/thu gọn luôn,
            // không bắt buộc phải bấm đúng mũi tên mới mở được.
            if (hasChildren) setOpen((prev) => !prev);
            onSelect?.(node);
          }}
        >
          {open && hasChildren ? (
            <FolderOpen size={16} className="shrink-0" />
          ) : (
            <Folder size={16} className="shrink-0" />
          )}
          <span className="truncate">{node.name}</span>
        </span>

        {editable && (
          <span className="ml-auto hidden shrink-0 items-center gap-1 group-hover:flex">
            <button
              type="button"
              title="Thêm danh mục con"
              className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onAddChild?.(node);
              }}
            >
              <Plus size={14} />
            </button>
            <button
              type="button"
              title="Đổi tên"
              className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onRename?.(node);
              }}
            >
              <Pencil size={14} />
            </button>
            <button
              type="button"
              title="Xoá danh mục"
              className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(node);
              }}
            >
              <Trash2 size={14} />
            </button>
          </span>
        )}
      </div>

      {hasChildren && open && (
        <ul>
          {node.children.map((child) => (
            <CategoryNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              editable={editable}
              onAddChild={onAddChild}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const CategoryTree = ({
  tree = [],
  selectedId,
  onSelect,
  editable = false,
  onAddChild,
  onRename,
  onDelete,
  onAddRoot,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="text-sm font-bold uppercase text-gray-500">
          Danh mục tài nguyên
        </h3>
        {editable && (
          <button
            type="button"
            title="Thêm danh mục gốc"
            className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-primary"
            onClick={() => onAddRoot?.()}
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      {tree.length === 0 ? (
        <p className="px-2 py-4 text-sm text-gray-400">
          Chưa có danh mục nào.
        </p>
      ) : (
        <ul>
          {tree.map((node) => (
            <CategoryNode
              key={node.id}
              node={node}
              depth={0}
              selectedId={selectedId}
              onSelect={onSelect}
              editable={editable}
              onAddChild={onAddChild}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryTree;
