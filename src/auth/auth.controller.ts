import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Res, Req, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { RegisterCommand } from "./commands/register.command";
import { RegisterDto } from "./dto/register.dto";
import { LoginCommand } from "./commands/login.command";
import express from "express";
import { CheckAuthQuery } from "./queries/check-auth.query";
import { RefreshTokensQuery } from "./queries/refresh=tokens.query";
import { Roles } from "../guards/roles-guards/roles.decorator";
import { RolesGuard } from "../guards/roles-guards/roles.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post('register')
  // @Roles(['admin'])
  // @UseGuards(RolesGuard)
  register(@Body() createAuthDto: RegisterDto) {
    try {
      return this.commandBus.execute(new RegisterCommand(createAuthDto))
    } catch (e) {
      throw new HttpException(e.message, 404)
    }
  }

  @Post('login')
  async login(@Res({passthrough: true}) res: express.Response, @Body() createAuthDto: RegisterDto) {
    const data = await this.commandBus.execute(new LoginCommand(createAuthDto))
    res.cookie('refreshToken', data.refreshToken, {httpOnly: true})
    return data
  }

  @Get('refresh')
  refreshTokens(@Req() req: express.Request) {
    const {refreshToken} = req.cookies
    return this.queryBus.execute(new RefreshTokensQuery(refreshToken))
  }

  @Get('logout')
  logoutUser( @Res({passthrough: true}) res: express.Response) {
    res.clearCookie('refreshToken')
    return {ok: true}

  }

  @Get('check')
  checkAuth(@Req() req: express.Request) {
    const authorizationHeader = req.headers?.authorization
    const token = authorizationHeader?.split(' ')[1] || ''
    return this.queryBus.execute(new CheckAuthQuery(token))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
