
import { AddCompanyForm } from '@/components/forms/AddCompanyForm';
import AdminLayout from '../../../layout'; // Corrected import path

export default function AddCompanyPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Add New Company</h1>
          <AddCompanyForm />
        </div>
      </div>
    </AdminLayout>
  );
}