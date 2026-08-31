export interface Link {
  id?: number;
  user_id?: number;
  original_url: string;
  short_url: string;
  click_count?: number;
  created_at?: string;
  updated_at?: string;
}
