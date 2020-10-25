import { useRouter } from "next/router";
import { observer, useStaticRendering } from "mobx-react";

// Store
import { useApplicationStore } from "stores/applicationStore";

export const PrivateRoute = observer(({ children }) => {
  useStaticRendering(typeof window === "undefined");

  const router = useRouter();
  const { isAuthenticated, isLoading } = useApplicationStore();

  if (!isAuthenticated && typeof window !== 'undefined') {
    router.push("/login");
    return null;
  }

  return isLoading ? null : children;
});

export const PublicRoute = observer(({ children }) => {
  useStaticRendering(typeof window === "undefined");
  
  const router = useRouter();
  const { isAuthenticated, isLoading } = useApplicationStore();

  if (isAuthenticated) {
    router.push("/dashboard");
    return null;
  }

  return isLoading ? null : children;
});
