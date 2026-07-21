import Base from "@layouts/Baseof";
import CategoryFormModal from "@layouts/components/resources/CategoryFormModal";
import CategoryTree from "@layouts/components/resources/CategoryTree";
import ResourceList from "@layouts/components/resources/ResourceList";
import UploadResourceForm from "@layouts/components/resources/UploadResourceForm";
import {
  useCategoryTree,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "hooks/useCategories";
import { useDeleteResource, useResourcesByCategory } from "hooks/useResources";
import useRequireAuth from "hooks/useRequireAuth";
import { useState } from "react";

// Modal state: { mode: "add" | "rename", node } — với mode "add", `node` là
// danh mục cha (null nếu thêm danh mục gốc). Với "rename", `node` là danh mục đang sửa.
const AdminResourcesPage = () => {
  const { ready } = useRequireAuth({ adminOnly: true });
  const [selected, setSelected] = useState(null);
  const [modalState, setModalState] = useState(null);

  const { data: tree = [], isLoading: treeLoading } = useCategoryTree({
    enabled: ready,
  });
  const { data: resources = [], isLoading: resourcesLoading } =
    useResourcesByCategory(selected?.id);

  const { mutateAsync: createCategory, isPending: creating } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: updating } =
    useUpdateCategory();
  const { mutateAsync: removeCategory } = useDeleteCategory();
  const { mutateAsync: removeResource } = useDeleteResource();

  const closeModal = () => setModalState(null);

  const handleModalSubmit = async (name) => {
    if (modalState.mode === "add") {
      await createCategory({ name, parent: modalState.node?.id || null });
    } else {
      await updateCategory({ id: modalState.node.id, name });
    }
    closeModal();
  };

  const handleDeleteCategory = async (node) => {
    if (!confirm(`Xoá danh mục "${node.name}"?`)) return;
    try {
      await removeCategory(node.id);
      if (selected?.id === node.id) setSelected(null);
    } catch (e) {
      // lỗi (còn con/tài nguyên bên trong) đã được toast trong hook
    }
  };

  const handleDeleteResource = async (resource) => {
    if (!confirm(`Xoá tài nguyên "${resource.title}"?`)) return;
    await removeResource({ id: resource.id, categoryId: selected?.id });
  };

  if (!ready) {
    return (
      <Base title="Quản trị tài nguyên">
        <div className="section pt-32 text-center text-gray-400">
          Đang tải...
        </div>
      </Base>
    );
  }

  return (
    <Base title="Quản trị tài nguyên">
      <section className="section pt-32">
        <div className="container">
          <h1 className="mb-1 text-2xl font-bold text-dark">
            Quản trị tài nguyên
          </h1>
          <p className="mb-6 text-sm text-gray-500">
            Tạo danh mục con theo cây và upload tài nguyên cho từng danh mục.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
            <div>
              {treeLoading ? (
                <p className="text-sm text-gray-400">Đang tải danh mục...</p>
              ) : (
                <CategoryTree
                  tree={tree}
                  selectedId={selected?.id}
                  onSelect={setSelected}
                  editable
                  onAddRoot={() => setModalState({ mode: "add", node: null })}
                  onAddChild={(node) => setModalState({ mode: "add", node })}
                  onRename={(node) =>
                    setModalState({ mode: "rename", node })
                  }
                  onDelete={handleDeleteCategory}
                />
              )}
            </div>

            <div className="flex flex-col gap-6">
              <UploadResourceForm category={selected} />

              {selected && (
                <div>
                  <h2 className="mb-3 text-lg font-semibold text-dark">
                    Tài nguyên trong "{selected.name}"
                  </h2>
                  {resourcesLoading ? (
                    <p className="text-sm text-gray-400">Đang tải...</p>
                  ) : (
                    <ResourceList
                      resources={resources}
                      editable
                      onDelete={handleDeleteResource}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CategoryFormModal
        open={!!modalState}
        title={modalState?.mode === "add" ? "Thêm danh mục con" : "Đổi tên danh mục"}
        initialName={modalState?.mode === "rename" ? modalState.node.name : ""}
        submitting={creating || updating}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
    </Base>
  );
};

export default AdminResourcesPage;
