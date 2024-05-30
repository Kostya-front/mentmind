import { Injectable } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Mentor } from "./entities/mentor.entity";
import { Repository } from "typeorm";

@Injectable()
export class MentorService {
  constructor(@InjectRepository(Mentor) private readonly repo: Repository<Mentor>) {
  }
  create(createMentorDto: CreateMentorDto) {
    return this.repo.save(createMentorDto)
  }

  findAll() {
    return this.repo.find({relations: {students: true}})
  }

  findOne(id: number) {
    return `This action returns a #${id} mentor`;
  }

  update(id: number, updateMentorDto: UpdateMentorDto) {
    return `This action updates a #${id} mentor`;
  }

  remove(id: number) {
    return `This action removes a #${id} mentor`;
  }
}
