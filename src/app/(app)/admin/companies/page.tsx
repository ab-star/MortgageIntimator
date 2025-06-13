
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AddCompanyForm } from '@/components/forms/AddCompanyForm';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import type { Company } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';


export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "companies"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const companiesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          clientCode: data.clientCode,
          contactPerson: data.contactPerson,
          createdAt: data.createdAt as Timestamp, // Ensure createdAt is Timestamp
        };
      }) as Company[];
      setCompanies(companiesData);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast({
        title: "Error",
        description: "Failed to fetch companies.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCompanyAdded = () => {
    setIsDialogOpen(false);
    fetchCompanies(); // Refresh the list
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tight">Manage Companies</h1>
          <p className="text-muted-foreground">Add, view, and manage client companies and their codes.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Fill in the details for the new client company. The client code must be unique.
              </DialogDescription>
            </DialogHeader>
            <AddCompanyForm onSuccess={handleCompanyAdded} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Registered Companies</CardTitle>
          <CardDescription>
            A list of all registered client companies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : companies.length === 0 ? (
            <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-md">
              <p className="text-muted-foreground">No companies found. Add a new company to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Client Code</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Registered On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.clientCode}</TableCell>
                    <TableCell>{company.contactPerson}</TableCell>
                    <TableCell>
                      {company.createdAt ? format(company.createdAt.toDate(), 'PPpp') : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
