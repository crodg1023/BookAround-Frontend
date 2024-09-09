import { Category } from "./category";

export interface Business {
  id?: number;
  user?: {
    id: number;
    email: string;
    role_id: number;
    cliente_id: number;
    comercio_id: number;
  };
  name: string;
  address: string;
  phone: string;
  pictures?: string;
  price?: number;
  workingHours?: {
    opening: number;
    closing: number;
  };
  description?: string;
  score?: number;
  categories?: Category[];
  usuario_id?: number;
}
