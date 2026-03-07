import AdminLayout from "../../components/AdminLayout";

export default function AdminOrders() {
  return (
    <AdminLayout>

      <h1 className="text-2xl font-bold mb-6">
        Orders
      </h1>

      <div className="bg-white p-5 shadow rounded">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th>Order Code</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>ORD-001</td>
              <td>User</td>
              <td>50000</td>
              <td>Pending</td>
            </tr>
          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}