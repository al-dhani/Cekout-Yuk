import AdminLayout from "../../components/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-5 shadow rounded">
          <p>Total Products</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="bg-white p-5 shadow rounded">
          <p>Total Orders</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="bg-white p-5 shadow rounded">
          <p>Total Users</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="bg-white p-5 shadow rounded">
          <p>Total Categories</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

      </div>

    </AdminLayout>
  );
}