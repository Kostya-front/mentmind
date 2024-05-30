import { CreateTokenDto } from "../dto/create-token.dto";

export class GenerateTokensCommand {
  constructor(public payload: CreateTokenDto) {
  }
}