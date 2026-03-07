import AdminLayout from "../../components/AdminLayout";

export default function AdminUsers() {
  return (
    <AdminLayout>

      <h1 className="text-2xl font-bold mb-6">
        Users
      </h1>

      <div className="bg-white p-5 shadow rounded">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Admin</td>
              <td>admin@mail.com</td>
              <td>admin</td>
            </tr>
          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}