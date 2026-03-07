import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {children}
      </div>

    </div>
  );
}