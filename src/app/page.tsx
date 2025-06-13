'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { currentUser, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (currentUser && userProfile) {
        if (userProfile.role === 'BackOffice/Admin') {
          router.replace('/admin/dashboard');
        } else if (userProfile.role === 'Client') {
          router.replace('/dashboard');
        } else {
          // Fallback if role is somehow not set, though this should be handled by AuthContext
          router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
    }
  }, [currentUser, userProfile, loading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
