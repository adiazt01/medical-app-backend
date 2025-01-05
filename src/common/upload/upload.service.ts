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
    nameFile: string,
    folder: string,
    options?: {
      cacheControl?: string;
      contentType?: string;
      upsert?: boolean;
    }
  ) {
    const { data, error } = await this.supabase.storage
      .from('bucket')
      .upload(`${folder}/${nameFile}`, file.buffer, {
        cacheControl: options?.cacheControl || '3600',
        contentType: options?.contentType || file.mimetype,
        upsert: options?.upsert || false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getImage(nameFileWithFolder: string) {
    const { data } = this.supabase.storage
      .from('bucket')
      .getPublicUrl(nameFileWithFolder);

    return data;
  }

  async deleteImage(nameFile: string, folder: string) {
    const { data, error } = await this.supabase.storage
      .from('bucket')
      .remove([`${folder}/${nameFile}`]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
