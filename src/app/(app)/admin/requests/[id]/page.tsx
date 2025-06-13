'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, FileText, Loader2, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
// This is a placeholder for viewing a single NOI request by an admin.
// It will include details, document links, status update options, and AI verification suggestion.

// Mock data for display - replace with actual data fetching
const mockRequest = {
  id: 'REQUEST_ID_123',
  customerName: 'John Doe',
  propertyAddress: '123 Main St, Anytown, USA',
  status: 'Pending' as 'Pending' | 'In Progress' | 'Verified' | 'Rejected',
  paymentStatus: 'Paid' as 'Paid' | 'Pending',
  submittedAt: new Date().toLocaleDateString(),
  loanAmount: 500000,
  bankName: 'Global Bank Corp',
  documents: [
    { name: 'Title_Deed.pdf', url: '#' },
    { name: 'Loan_Letter.pdf', url: '#' },
    { name: 'Proof_Docs.pdf', url: '#' },
  ],
  aiSuggestion: null as { status: string; reason: string } | null,
};


export default function AdminRequestDetailsPage({ params }: { params: { id: string } }) {
  const requestId = params.id;
  // const [requestData, setRequestData] = useState(mockRequest); // In real app, fetch based on ID
  // const [loadingAiSuggestion, setLoadingAiSuggestion] = useState(false);

  const handleAiSuggest = async () => {
    // setLoadingAiSuggestion(true);
    // // 1. Fetch actual document URLs from Firebase Storage based on requestId
    // // 2. Convert files to data URIs (server-side preferred or carefully client-side)
    // // const titleDeedDataUri = await convertFileToDataUri(docUrls.titleDeed); ...
    // try {
    //   // const suggestion = await suggestVerificationStatus({ titleDeedDataUri, loanLetterDataUri, proofDocsDataUri });
    //   // setRequestData(prev => ({ ...prev, aiSuggestion: { status: suggestion.suggestedStatus, reason: suggestion.reason }}));
    //   // Placeholder:
    //   setTimeout(() => {
    //      setRequestData(prev => ({ ...prev, aiSuggestion: { status: "Verified", reason: "All documents appear consistent and valid." }}));
    //      setLoadingAiSuggestion(false);
    //   }, 2000);
    // } catch (error) {
    //   console.error("AI Suggestion Error:", error);
    //   // Handle error, show toast
    //   setLoadingAiSuggestion(false);
    // }
    alert("AI Suggestion feature coming soon!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold tracking-tight">NOI Request Details: #{requestId}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer & Property Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Customer Name:</strong> {mockRequest.customerName}</p>
              <p><strong>Property Address:</strong> {mockRequest.propertyAddress}</p>
              <p><strong>Loan Amount:</strong> ${mockRequest.loanAmount.toLocaleString()}</p>
              <p><strong>Bank:</strong> {mockRequest.bankName}</p>
              <p><strong>Submitted On:</strong> {mockRequest.submittedAt}</p>
              {/* More fields here */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockRequest.documents.map(doc => (
                  <li key={doc.name} className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>{doc.name}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-1 h-4 w-4" /> Download
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Current Status:</p>
                <Badge variant={mockRequest.status === 'Verified' ? 'default' : mockRequest.status === 'Rejected' ? 'destructive' : 'secondary'}>
                  {mockRequest.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Payment Status:</p>
                <Badge variant={mockRequest.paymentStatus === 'Paid' ? 'default' : 'outline'}>
                  {mockRequest.paymentStatus}
                </Badge>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">(Status & Payment update controls coming soon)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Verification Suggestion</CardTitle>
            </CardHeader>
            <CardContent>
              {mockRequest.aiSuggestion ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {mockRequest.aiSuggestion.status === 'Verified' ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertCircle className="h-5 w-5 text-red-500" />}
                    <span className={`font-semibold ${mockRequest.aiSuggestion.status === 'Verified' ? 'text-green-600' : 'text-red-600'}`}>
                      Suggested: {mockRequest.aiSuggestion.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{mockRequest.aiSuggestion.reason}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No suggestion generated yet.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAiSuggest} 
                // disabled={loadingAiSuggestion || !!mockRequest.aiSuggestion}
                className="w-full"
              >
                {/* {loadingAiSuggestion && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                Generate AI Suggestion
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
