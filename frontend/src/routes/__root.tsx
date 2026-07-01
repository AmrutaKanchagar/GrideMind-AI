import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div style={{ minHeight: "100vh", padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <Outlet />
    </div>
  );
}