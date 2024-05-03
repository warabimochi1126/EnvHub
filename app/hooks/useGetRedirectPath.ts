import { usePathname } from "next/navigation"

export const useGetRedirectPath = () => {
  const pathname = usePathname();
  const redirectToPath = pathname.split("/")[2];
  return redirectToPath;
}