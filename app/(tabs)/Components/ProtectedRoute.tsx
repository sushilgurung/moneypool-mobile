// components/ProtectedRoute.tsx
import { useAuth } from '@/app/context/AuthContext';
import { Redirect } from 'expo-router';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/LoginScreen" />;
  }

  return <>{children}</>;
}
