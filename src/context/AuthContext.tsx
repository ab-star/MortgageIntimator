'use client';

import type { User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import type { UserProfile } from '@/types';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isClient: boolean;
  isAdmin: boolean;
  companyName: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // User is signed in, fetch profile
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeProfile = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            const profileData = docSnap.data() as UserProfile;
            setUserProfile(profileData);
            if (profileData.companyId) {
              const companyDocRef = doc(db, 'companies', profileData.companyId);
              const companyDocSnap = await getDoc(companyDocRef);
              if (companyDocSnap.exists()) {
                setCompanyName(companyDocSnap.data().name);
              } else {
                setCompanyName(null);
              }
            } else {
              setCompanyName(null);
            }
          } else {
            // No profile found, could mean new user or issue
            setUserProfile(null);
            setCompanyName(null);
          }
          setLoading(false);
        });
        return () => unsubscribeProfile();
      } else {
        // User is signed out
        setUserProfile(null);
        setCompanyName(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
      if (!currentUser && !isAuthPage) {
        router.push('/login');
      } else if (currentUser && isAuthPage) {
        if (userProfile?.role === 'BackOffice/Admin') {
          router.push('/admin/dashboard');
        } else if (userProfile?.role === 'Client') {
          router.push('/dashboard');
        } else {
           // If role is not yet defined or unknown, might redirect to a pending page or login
           // For now, assume role will be set upon registration
           router.push('/login');
        }
      }
    }
  }, [currentUser, userProfile, loading, pathname, router]);

  const isClient = userProfile?.role === 'Client';
  const isAdmin = userProfile?.role === 'BackOffice/Admin';

  const value = {
    currentUser,
    userProfile,
    loading,
    isClient,
    isAdmin,
    companyName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
