export interface Client {
  id?: number;
  name: string;
  picture?: string;
  usuario_id?: number;
  usuario?: {
    id: number,
    email: string
  }
}
