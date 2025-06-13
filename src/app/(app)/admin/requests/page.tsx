'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminAllRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold tracking-tight">All NOI Requests</h1>
      <p className="text-muted-foreground">View, filter, and manage all submitted NOI requests.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Requests Overview</CardTitle>
          <CardDescription>
            Detailed table of all requests with filtering and status update capabilities. (Coming Soon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[300px] flex items-center justify-center border-2 border-dashed border-border rounded-md">
            <p className="text-muted-foreground">A comprehensive table of all NOI requests will be displayed here.</p>
          </div>
          {/* Add filters for client, status, date */}
          {/* Add functionality to click on a request to go to its detail page */}
        </CardContent>
      </Card>
    </div>
  );
}
