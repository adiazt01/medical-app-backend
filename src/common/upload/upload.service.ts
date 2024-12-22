import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
    options?: {
      cacheControl?: string;
      contentType?: string;
      upsert?: boolean;
    }
  ) {
    const { data, error } = await this.supabase.storage
      .from('bucket')
      .upload(`${folder}/${file.originalname}`, file.buffer, {
        cacheControl: options?.cacheControl || '3600',
        contentType: options?.contentType || file.mimetype,
        upsert: options?.upsert || false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
