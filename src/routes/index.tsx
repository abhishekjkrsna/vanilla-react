import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <h2>App showing various Star Wars Character</h2>
      <p>
        In this App we will be listing various StarWars Characters and Info
        about them. We have used various React Libraries for this project.
      </p>
      <p>We have used the following libraries:</p>
      <ul>
        <li>Tanstack Router</li>
        <li>Tanstack Query</li>
        <li>Tailwind CSS</li>
        <li>React 19</li>
      </ul>
    </main>
  );
}
