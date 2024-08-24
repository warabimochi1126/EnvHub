import Link from "next/link";
import { GitHubButton } from "./element/github-button";
import { QiitaButton } from "./element/qiita-button";

export function Toppage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-background px-4 py-6 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between">
          <div className="text-2xl font-bold">EnvHub</div>
          <GitHubButton />
        </div>
      </div>

      <main className="flex-1">
        <section className="bg-background py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Share.env
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Securely share your environment variables.
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <Link
                  href="#"
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  prefetch={false}
                >
                  <ShareIcon className="mr-2 h-5 w-5" />
                  Share.env
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                  prefetch={false}
                >
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  Get.env
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/90 focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
                  prefetch={false}
                >
                  <FileIcon className="mr-2 h-5 w-5" />
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#F1F5F9] px-4 py-6 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Share.env. All rights reserved.
          </p>
          <nav className="hidden space-x-4 md:flex">
            <QiitaButton />
          </nav>
        </div>
      </footer>
    </div>
  );
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
