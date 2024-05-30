import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import { Mentor } from "../mentor/entities/mentor.entity";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly repo: Repository<Student>,
    @InjectRepository(Mentor) private readonly mentorRepo: Repository<Mentor>
  ) {
  }
  create(createStudentDto: CreateStudentDto) {
    return this.repo.save(createStudentDto)
  }

  findAll() {
    return this.repo.find({relations: {mentor: true}})
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const mentor = await this.mentorRepo.findOne({where: {id: updateStudentDto.mentorId}})
    return  await this.repo.save({id, mentor})

  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
