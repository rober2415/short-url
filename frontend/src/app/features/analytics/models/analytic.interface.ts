import { Link } from "src/app/core/models/link.interface";

export interface Analytic {
  created_at: string;
  ip_address: string;
  country: string;
  device: string;
  referer: string;
  user_agent: string;
  url?: Link;
}