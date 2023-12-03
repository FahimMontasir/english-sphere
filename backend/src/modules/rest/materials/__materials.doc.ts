
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
  import { IMaterials } from './materials.interface';
  
  @Route('/materials/')
  @Tags('MaterialsController')
  export class MaterialsController extends Controller {
    /**
     * Retrieves the details of an existing user.
     * @param userId Supply the valid user mongodb ID.
     */
    @Get('{userId}')
    public async getMaterials(
      @Header('X-Access-Token') authorization: string,
      @Path() userId: string
    ): Promise<IApiResponse<IMaterials>> {
      return;
    }
  
    /**
     * Adds a new user by providing required request body.
     * @param requestBody _id, createdAt and updated are optional fields
     */
    @SuccessResponse(201, 'created')
    @Post()
    public async addMaterials(
      @Header('X-Access-Token') authorization: string,
      @Body() requestBody: IMaterials
    ): Promise<IApiResponse<null>> {
      return;
    }
  
    /**
     * Patch docs here
     */
    @Patch()
    public async updateMaterials(
      @Header('X-Access-Token') authorization: string,
      @Body() requestBody: Partial<IMaterials>
    ): Promise<IApiResponse<null>> {
      return;
    }
  
    /**
     * Delete docs here
     */
    @Delete()
    public async removeMaterials(
      @Header('X-Access-Token') authorization: string,
      @Body() requestBody: { value: string }
    ): Promise<IApiResponse<null>> {
      return;
    }
  }
  
  