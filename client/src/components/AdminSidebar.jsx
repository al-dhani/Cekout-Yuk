import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        CekoutYuk
      </h1>

      <ul className="space-y-4">

        <li>
          <Link to="/admin/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/products" className="hover:text-gray-300">
            Products
          </Link>
        </li>

        <li>
          <Link to="/admin/orders" className="hover:text-gray-300">
            Orders
          </Link>
        </li>

        <li>
          <Link to="/admin/users" className="hover:text-gray-300">
            Users
          </Link>
        </li>

      </ul>

    </div>
  );
}