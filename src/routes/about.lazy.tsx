import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="grid">Made with Love ❤️ by Abhishek!</div>;
}
