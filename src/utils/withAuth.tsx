import { useUserInfoQuery } from "@/redux/features/auth/auth.api"; 
import type { TRole } from "@/types"; 
import type { ComponentType } from "react"; 
import { Navigate } from "react-router"; 

// Higher-Order Component 
export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    //If the user is NOT loading and has no email (not logged in)
    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    //If `requiredRole` is provided AND user role does not match → redirect to unauthorized page
    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    //If authenticated (and role check passed), render the original component
    return <Component />;
  };
};
