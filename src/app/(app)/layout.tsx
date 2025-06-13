'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AppHeader from '@/components/AppHeader';
import { Loader2 } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Home, Users, FileText, Edit3, Briefcase, LogOut, Settings, Building } from 'lucide-react'; // Added Building icon
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { currentUser, userProfile, loading, isAdmin, isClient } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser || !userProfile) {
    // This should ideally be handled by AuthContext redirection, but as a fallback
    router.replace('/login');
    return (
       <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  const navItems = isAdmin ? [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/admin/requests', label: 'NOI Requests', icon: FileText },
    { href: '/admin/companies', label: 'Companies', icon: Building }, // Updated icon
    // { href: '/admin/users', label: 'Users', icon: Users }, // User management for admin
  ] : [
    { href: '/dashboard', label: 'My NOI Requests', icon: Home },
    { href: '/dashboard/new-request', label: 'Submit New NOI', icon: Edit3 },
  ];

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-lg font-semibold text-sidebar-foreground">Menu</h2>
            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton 
                    className="w-full justify-start"
                    isActive={router.pathname === item.href}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    <span className="truncate">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
           <SidebarMenuButton onClick={handleLogout} className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="mr-2 h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <AppHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
            {children}
          </main>
          <footer className="border-t border-border bg-card py-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MortgageIntimator. All rights reserved.
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
