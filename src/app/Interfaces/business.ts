import { Category } from "./category";

export interface Business {
  id?: number;
  name: string;
  address: string;
  phone: string;
  pictures?: string;
  description?: string;
  score: number;
  starting_hour?: string,
  closing_hour?: string,
  categorias: Category[];
  price: number;
  usuario_id?: number;
  usuario?: any;
}
