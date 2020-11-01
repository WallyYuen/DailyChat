import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { observer, enableStaticRendering } from "mobx-react-lite";
import { roles } from "lib/role";

// Components
import PageLayout from "components/layout/pageLayout";

// Store
import { useApplicationStore } from "stores/applicationStore";

export const PrivateRoute = observer(({ children }) => {
  enableStaticRendering(typeof window === "undefined");

  if (typeof window === "undefined") return null;

  const router = useRouter();
  const { currentUser, isAuthenticated, isLoading } = useApplicationStore();

  const component = isLoading ? null : (
    <PageLayout>{children}</PageLayout>
  );

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  if (currentUser.role === roles.student && !currentUser.approved) {
    router.push("/lobby");
    return null;
  }

  return component;
});

export const PublicRoute = observer(({ children }) => {
  enableStaticRendering(typeof window === "undefined");
  
  const router = useRouter();
  const { isAuthenticated, isLoading } = useApplicationStore();

  const component = isLoading ? null : (
    <PageLayout>{children}</PageLayout>
  );

  if (router.pathname === "/") return component;

  if (isAuthenticated) {
    router.push("/dashboard");
    return null;
  }

  return component;
});
