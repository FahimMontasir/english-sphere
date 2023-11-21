
  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  // @ts-nocheck
  import {
    Route,
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Path,
    Query,
    Body,
    SuccessResponse,
    Tags,
    Header,
  } from 'tsoa';
  import { IApiResponse } from '../../../shared/sendResponse';
  import { IBoilerplateCode } from './boilerplateCode.interface';
  
  @Route('/boilerplateCode/')
  @Tags('BoilerplateCodeController')
  export class BoilerplateCodeController extends Controller {
    /**
     * Retrieves the details of an existing user.
     * @param userId Supply the valid user mongodb ID.
     */
    @Get('{userId}')
    public async getBoilerplateCode(
      @Header('X-Access-Token') authorization: string,
      @Path() userId: string
    ): Promise<IApiResponse<IBoilerplateCode>> {
      return;
    }
  
    /**
     * Adds a new user by providing required request body.
     * @param requestBody _id, createdAt and updated are optional fields
     */
    @SuccessResponse(201, 'created')
    @Post()
    public async addBoilerplateCode(
      @Header('X-Access-Token') authorization: string,
      @Body() requestBody: IBoilerplateCode
    ): Promise<IApiResponse<null>> {
      return;
    }
  
    /**
     * Patch docs here
     */
    @Patch()
    public async updateBoilerplateCode(
      @Header('X-Access-Token') authorization: string,
      @Body() requestBody: Partial<IBoilerplateCode>
    ): Promise<IApiResponse<null>> {
      return;
    }
  
    /**
     * Delete docs here
     */
    @Delete()
    public async removeBoilerplateCode(
      @Header('X-Access-Token') authorization: string,
      @Body() requestBody: { value: string }
    ): Promise<IApiResponse<null>> {
      return;
    }
  }
  
  