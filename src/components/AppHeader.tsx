'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building, ChevronDown, LogOut, UserCircle, Home, Edit3 } from 'lucide-react';

export default function AppHeader() {
  const { currentUser, userProfile, isAdmin, isClient, companyName, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
             <svg
              className="h-8 w-auto text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.75 2.75a.75.75 0 00-1.5 0V5.5h- significativas9.19L2.75 4.75a.75.75 0 00-1 1.732l1.178.682A11.214 11.214 0 00.25 12c0 6.213 5.037 11.25 11.25 11.25S22.75 18.213 22.75 12c0-3.013-1.187-5.76-3.125-7.828V2.75zM11.25 7A4.25 4.25 0 1011.25 15.5 4.25 4.25 0 0011.25 7z"
                clipRule="evenodd"
              />
              <path d="M12 21.25a9.75 9.75 0 100-19.5 9.75 9.75 0 000 19.5zM21.25 12a9.25 9.25 0 11-18.5 0 9.25 9.25 0 0118.5 0z" />
              <path d="M11.25 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            </svg>
            <span className="text-lg font-headline font-semibold text-foreground">MortgageIntimator</span>
          </div>
        </div>
      </header>
    );
  }
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} className="flex items-center space-x-2">
           <svg
              className="h-8 w-auto text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.75 2.75a.75.75 0 00-1.5 0V5.5h- significativas9.19L2.75 4.75a.75.75 0 00-1 1.732l1.178.682A11.214 11.214 0 00.25 12c0 6.213 5.037 11.25 11.25 11.25S22.75 18.213 22.75 12c0-3.013-1.187-5.76-3.125-7.828V2.75zM11.25 7A4.25 4.25 0 1011.25 15.5 4.25 4.25 0 0011.25 7z"
                clipRule="evenodd"
              />
              <path d="M12 21.25a9.75 9.75 0 100-19.5 9.75 9.75 0 000 19.5zM21.25 12a9.25 9.25 0 11-18.5 0 9.25 9.25 0 0118.5 0z" />
              <path d="M11.25 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            </svg>
          <span className="text-lg font-headline font-semibold text-foreground">MortgageIntimator</span>
        </Link>

        <div className="flex items-center space-x-4">
          {isClient && companyName && (
            <div className="hidden items-center space-x-2 rounded-md border border-border bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground sm:flex">
              <Building size={16} />
              <span>{companyName}</span>
            </div>
          )}
          {currentUser && userProfile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-1.5 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.photoURL || undefined} alt={userProfile.displayName || 'User'} />
                    <AvatarFallback>{getInitials(userProfile.displayName)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium text-foreground md:inline">{userProfile.displayName || userProfile.email}</span>
                  <ChevronDown size={16} className="hidden text-muted-foreground md:inline" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">{userProfile.displayName}</p>
                  <p className="text-xs text-muted-foreground">{userProfile.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => router.push(isAdmin ? '/admin/dashboard' : '/dashboard')}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                {isClient && (
                  <DropdownMenuItem onClick={() => router.push('/dashboard/new-request')}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    <span>New NOI Request</span>
                  </DropdownMenuItem>
                )}
                {/* Add more items like Profile settings if needed */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
