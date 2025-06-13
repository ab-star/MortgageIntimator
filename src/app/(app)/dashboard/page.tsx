'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

// This page will list NOI requests for the client.
// For now, it's a placeholder. Implementation will involve fetching data from Firestore.

export default function ClientDashboardPage() {
  const { userProfile, isClient, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isClient) {
      router.replace('/login'); // Or admin dashboard if applicable
    }
  }, [isClient, loading, router]);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!isClient) {
    // This case should be handled by layout or AuthContext, but as a safeguard
    return null; 
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tight">My NOI Requests</h1>
          <p className="text-muted-foreground">View and manage your Notice of Intimation requests.</p>
        </div>
        <Link href="/dashboard/new-request" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Submit New NOI
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Submitted Requests</CardTitle>
          <CardDescription>
            A list of all NOI requests you have submitted. (Full table coming soon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for table of NOI requests */}
          <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-md">
            <p className="text-muted-foreground">NOI Request data will be displayed here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
