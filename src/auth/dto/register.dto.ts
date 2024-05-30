import { CreateUserDto } from "../../user/dto/create-user.dto";
import { CreateMentorDto } from "../../mentor/dto/create-mentor.dto";
import { CreateStudentDto } from "../../student/dto/create-student.dto";

export type RegisterDto = CreateUserDto & CreateMentorDto
