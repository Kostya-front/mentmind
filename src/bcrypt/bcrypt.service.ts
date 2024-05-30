import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {

  hash(passWord: string) {
    return bcrypt.hash(passWord, 5)
  }

  compare(passWord: string, hash: string) {
    return bcrypt.compare(passWord, hash)
  }
}