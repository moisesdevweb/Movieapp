import { Outlet } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
