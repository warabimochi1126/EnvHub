import { GitHubButton } from "../elements/github-button";

export function Header() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">EnvHub</div>
        <GitHubButton />
      </div>
    </div>
  );
}
