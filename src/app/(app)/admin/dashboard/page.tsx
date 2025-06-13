'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// This page will list ALL NOI requests for the admin.
// For now, it's a placeholder. Implementation will involve fetching data from Firestore and filters.

export default function AdminDashboardPage() {
  const { userProfile, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace('/login'); // Or client dashboard if applicable
    }
  }, [isAdmin, loading, router]);

  if (loading) {
    return <p>Loading admin dashboard...</p>;
  }
  
  if (!isAdmin) {
     // This case should be handled by layout or AuthContext, but as a safeguard
    return null;
  }


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold tracking-tight">Admin Dashboard</h1>
      <p className="text-muted-foreground">Manage all NOI requests, companies, and users.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total NOI Requests</CardTitle>
            <CardDescription>Overview of all submitted requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">0</p> {/* Placeholder */}
            <p className="text-xs text-muted-foreground"> (Data coming soon)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Verification</CardTitle>
            <CardDescription>Requests awaiting action.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">0</p> {/* Placeholder */}
             <p className="text-xs text-muted-foreground"> (Data coming soon)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Managed Companies</CardTitle>
            <CardDescription>Total registered client companies.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">0</p> {/* Placeholder */}
             <p className="text-xs text-muted-foreground"> (Data coming soon)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All NOI Requests</CardTitle>
          <CardDescription>
            A list of all NOI requests submitted by clients. (Full table and filters coming soon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for table of NOI requests */}
           <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-md">
            <p className="text-muted-foreground">NOI Request data and management tools will be displayed here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
