import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from 'tsoa';
import { IAppUser } from '../user/app/user.app.interface';

@Route('users/app/')
@Tags('User')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number, @Query() name?: string): Promise<IAppUser> {
    return;
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: { name: string }): Promise<void> {
    return;
  }
}
