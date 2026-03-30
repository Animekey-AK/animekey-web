import Link from "next/link";
import { routes } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href={routes.home}
        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
      >
        Back to home
      </Link>
    </div>
  );
}
