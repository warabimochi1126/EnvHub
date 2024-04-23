import GitHubLoginCard from "../components/github-login-card";

interface LoginPageProps {
  searchParams: {
    redirect: string;
  }
}

export default function Login({ searchParams }: LoginPageProps) {
  const redirectUrl = searchParams.redirect;

  return (
    <div className="flex justify-center items-center h-screen">
      <GitHubLoginCard redirectUrl={redirectUrl} />
    </div>
  )
}