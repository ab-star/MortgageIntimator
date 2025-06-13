
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';

const companySchema = z.object({
  name: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  clientCode: z.string()
    .min(3, { message: 'Client code must be at least 3 characters.' })
    .max(20, { message: 'Client code must be at most 20 characters.' })
    .regex(/^[A-Z0-9]+$/, { message: 'Client code must be uppercase alphanumeric characters only.'})
    .refine(async (code) => {
      // Check for uniqueness
      const companiesRef = collection(db, 'companies');
      const q = query(companiesRef, where('clientCode', '==', code));
      const snapshot = await getDocs(q);
      return snapshot.empty;
    }, {message: 'This client code is already in use.'}),
  contactPerson: z.string().min(2, { message: 'Contact person name must be at least 2 characters.' }),
});

type CompanyFormValues = z.infer<typeof companySchema>;

interface AddCompanyFormProps {
  onSuccess: () => void;
}

export function AddCompanyForm({ onSuccess }: AddCompanyFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      clientCode: '',
      contactPerson: '',
    },
  });

  const onSubmit: SubmitHandler<CompanyFormValues> = async (data) => {
    setLoading(true);
    try {
      const companiesRef = collection(db, 'companies');
      await addDoc(companiesRef, {
        name: data.name,
        clientCode: data.clientCode.toUpperCase(), // Ensure it's stored in uppercase
        contactPerson: data.contactPerson,
        createdAt: Timestamp.now(),
      });

      toast({
        title: 'Company Added',
        description: `${data.name} has been successfully registered.`,
      });
      form.reset();
      onSuccess();
    } catch (error: any) {
      console.error('Error adding company:', error);
      let errorMessage = 'Failed to add company. Please try again.';
      if (error.message && error.message.includes("client code is already in use")) { // Zod refine error might not propagate well here without custom handling
        errorMessage = "This client code is already in use.";
        form.setError("clientCode", { type: "manual", message: errorMessage });
      }
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Code</FormLabel>
              <FormControl>
                <Input 
                  placeholder="E.g., UNIQUECODE7 (uppercase, alphanumeric)" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact person's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add Company'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
