import { useRouter } from "next/router";

export const usePathChecker = (paths: string[]) => {
  const { pathname } = useRouter();
  return paths.includes(pathname);
};
