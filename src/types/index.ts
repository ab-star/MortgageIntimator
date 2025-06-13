import type { Timestamp } from 'firebase/firestore';

export type UserRole = 'Client' | 'BackOffice/Admin';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName?: string | null;
  role: UserRole;
  companyCode?: string; // For Client users, links to companies collection's clientCode
  companyId?: string; // For Client users, links to companies collection's document ID
  createdAt: Timestamp;
}

export interface Company {
  id: string; // Firestore document ID
  name: string;
  clientCode: string; // Unique code assigned by Admin
  contactPerson: string;
  createdAt: Timestamp;
}

export type NOIStatus = 'Pending' | 'In Progress' | 'Verified' | 'Rejected';
export type PaymentStatus = 'Paid' | 'Pending';
export type MortgageType = 'Equitable' | 'Registered';
export type PropertyType = 'Flat' | 'House' | 'Plot' | 'Commercial' | 'Agricultural' | 'Other';


export interface NOIRequest {
  id: string; // Firestore document ID
  companyId: string; 
  companyCode: string;
  submittedByUid: string;
  submittedByName?: string; // Name of the user who submitted
  submittedAt: Timestamp;
  
  customerName: string;
  panNumber: string;
  aadhaarNumber: string;
  contactNumber: string;
  email: string;
  address: string; // Customer's address
  
  propertyAddress: string;
  surveyPlotFlatNumber: string;
  typeOfProperty: PropertyType;
  city: string;
  state: string;
  pincode: string;
  
  loanAccountNumber: string;
  loanAmount: number;
  sanctionDate: Timestamp;
  disbursementDate: Timestamp;
  mortgageType: MortgageType;
  
  bankName: string;
  branch: string;
  
  titleDeedUrl?: string; // Firebase Storage path/URL
  titleDeedFileName?: string;
  loanLetterUrl?: string; // Firebase Storage path/URL
  loanLetterFileName?: string;
  proofDocsUrl?: string; // Firebase Storage path/URL
  proofDocsFileName?: string;
  
  status: NOIStatus;
  paymentStatus: PaymentStatus;
  
  adminNotes?: string;
  verificationSuggestion?: {
    suggestedStatus: 'Verified' | 'Rejected';
    reason: string;
    suggestedAt: Timestamp;
  };
  lastUpdatedAt?: Timestamp;
}

// For forms, using string for dates initially, convert to Timestamp before saving
export interface NOIRequestFormValues {
  customerName: string;
  panNumber: string;
  aadhaarNumber: string;
  contactNumber: string;
  email: string;
  address: string;
  propertyAddress: string;
  surveyPlotFlatNumber: string;
  typeOfProperty: PropertyType;
  city: string;
  state: string;
  pincode: string;
  loanAccountNumber: string;
  loanAmount: string; // string for form input, convert to number
  sanctionDate: string;
  disbursementDate: string;
  mortgageType: MortgageType;
  bankName: string;
  branch: string;
  titleDeed?: FileList;
  loanLetter?: FileList;
  proofDocs?: FileList;
}

export interface Payment {
  id: string; // Firestore document ID
  noiRequestId: string;
  companyId: string;
  amount: number;
  paymentReferenceId?: string;
  paidAt: Timestamp;
  method?: string; // e.g., 'Manual', 'Razorpay'
}
