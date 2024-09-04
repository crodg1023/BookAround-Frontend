export interface Review {
  id?: number;
  comercio_id: number;
  client?: {
    name: string;
    picture: string;
  };
  cliente_id: number;
  score: number;
  content: string;
  published?: string;
}
