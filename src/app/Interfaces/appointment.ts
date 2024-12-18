import { Business } from "./business";
import { Client } from "./client";

export interface Appointment {
  id?: number;
  business?: Business;
  client?: Client;
  cliente_id?: number;
  comercio_id: number;
  dateTime: string;
  status: 'active' | 'canceled' | 'fulfilled';
  people: number;
  reservation_email: string;
}
