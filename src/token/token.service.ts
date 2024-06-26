import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';


@Injectable()
export class TokenService {
  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }


  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
