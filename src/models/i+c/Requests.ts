
export interface RolesCreationRequest {
  name: string;
  description: string;
  scope: string;
  modules: number[];
}

export interface RequestService {
  isPackage: boolean;
  id: string;
}

export interface RequestCandidate {
  username: string;
  name: string;
  email: string;
  customerId: number;
  charge?: string;
}

export interface RequestCustom {
  id?: number;
  dateOfCreation: string;
  dateOfFiling: string;
  customerId: number;
  customerInternal: string;
  regional: string;
  costCenterId: string;
  billable: boolean;
  remarks: string;
  services: RequestService[];
  candidates?: RequestCandidate[];
  saveType: string;
}

export interface RequestCustomList {
  id?: number;
  creationDate: string;
  submitDate: string;
  customer: {
    id: number;
    name: string;
  };
  billable: boolean;
  remarks: string;
  services: RequestService[];
  candidates: RequestCandidate[];
  status: RequestEnum;
}

export enum RequestEnum {
  REGISTERED = 'REGISTERED',
  SUBMIT = 'SUBMIT',
  CANCELLED = 'CANCELLED',
}

export enum RequestEnumLabels {
  REGISTERED = 'CREADA',
  SUBMIT = 'RADICADA',
  CANCELLED = 'ANULADA',
}
