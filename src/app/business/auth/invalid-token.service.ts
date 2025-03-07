import { Injectable } from '@nestjs/common';

@Injectable()
export class InvalidTokenService {
  private invalidTokens: Set<string> = new Set();

  addToken(token: string) {
    this.invalidTokens.add(token);
  }

  isTokenInvalid(token: string): boolean {
    return this.invalidTokens.has(token);
  }
}
