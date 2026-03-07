import AdminLayout from "../../components/AdminLayout";

export default function AdminProducts() {
  return (
    <AdminLayout>

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      <div className="bg-white p-5 shadow rounded">

        <table className="w-full">

          <thead>
            <tr className="text-left border-b">
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Sample Product</td>
              <td>Category</td>
              <td>10000</td>
              <td>10</td>
              <td>Edit | Delete</td>
            </tr>
          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}