import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function DashboardLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItemClass = (path) =>
    `block px-4 py-2 rounded ${
      location.pathname === path ? 'bg-blue-500 text-white font-semibold' : 'hover:bg-blue-100'
    }`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-100 p-4 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-4 text-sm text-blue-600 underline"
        >
          {collapsed ? '➤' : '◀ Collapse'}
        </button>

        {/* Sidebar Content */}
        <div className={collapsed ? 'hidden' : ''}>
          <h2 className="text-xl font-bold mb-6">WMS Dashboard</h2>
        </div>

        <nav className="flex flex-col gap-2">
          <Link to="/add-product" className={navItemClass('/add-product')}>
            {collapsed ? '➕' : 'Add Product'}
          </Link>
          <Link to="/inventory" className={navItemClass('/inventory')}>
            {collapsed ? '📦' : 'Inventory'}
          </Link>
          <Link to="/inbound" className={navItemClass('/inbound')}>
            {collapsed ? '⬇️' : 'Inbound'}
          </Link>
          <Link to="/outbound" className={navItemClass('/outbound')}>
            {collapsed ? '⬆️' : 'Outbound'}
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            className="text-left px-4 py-2 rounded text-red-600 hover:bg-red-100"
          >
            {collapsed ? '🚪' : 'Logout'}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
