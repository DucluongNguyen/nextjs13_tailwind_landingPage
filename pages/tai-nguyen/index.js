import Base from "@layouts/Baseof";
import CategoryTree from "@layouts/components/resources/CategoryTree";
import ResourceList from "@layouts/components/resources/ResourceList";
import { useCategoryTree } from "hooks/useCategories";
import { useResourcesByCategory } from "hooks/useResources";
import { useState } from "react";

// Trang tài nguyên công khai — ai cũng xem/tải được, không cần đăng nhập.
const ResourcesPage = () => {
  const [selected, setSelected] = useState(null);

  const { data: tree = [], isLoading: treeLoading } = useCategoryTree();
  const { data: resources = [], isLoading: resourcesLoading } =
    useResourcesByCategory(selected?.id);

  return (
    <Base title="Tài nguyên học tập">
      <section className="section pt-32">
        <div className="container">
          <h1 className="mb-6 text-2xl font-bold text-dark">
            Tài nguyên học tập
          </h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
            {/* min-w-0: mặc định grid item không tự co dưới kích thước nội
                dung (min-width: auto), khiến cây danh mục lồng sâu đẩy rộng
                cả trang gây scroll ngang trên mobile. min-w-0 cho phép co lại
                đúng theo track của grid để phần tên dài bên trong tự truncate. */}
            <div className="min-w-0">
              {treeLoading ? (
                <p className="text-sm text-gray-400">Đang tải danh mục...</p>
              ) : (
                <CategoryTree
                  tree={tree}
                  selectedId={selected?.id}
                  onSelect={setSelected}
                />
              )}
            </div>

            <div className="min-w-0">
              {!selected ? (
                <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-400">
                  Đánh thức đam mê - Chắp cánh ước mơ.
                </div>
              ) : (
                <>
                  <h2 className="mb-3 text-lg font-semibold text-dark">
                    {selected.name}
                  </h2>
                  {resourcesLoading ? (
                    <p className="text-sm text-gray-400">Đang tải...</p>
                  ) : (
                    <ResourceList resources={resources} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default ResourcesPage;
