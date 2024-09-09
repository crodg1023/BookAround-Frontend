export interface Client {
  id?: number;
  name: string;
  picture?: string;
  usuario_id?: number;
  user?: {
    id: number;
    email: string;
    role_id: number;
    cliente_id: number;
    comercio_id: number;
  };
}
