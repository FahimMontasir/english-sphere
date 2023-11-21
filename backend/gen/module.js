/**
 * command: node gen/module.js folderName --forWhich(--rest|--socket)
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('command: node gen/module.js folderName --forWhich(--rest|--socket)');
  process.exit(1);
}
// Get folder and file names from command arguments
const folderName = process.argv[2];
const fileName = folderName;
const capitalizedFileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
const forWhich = process.argv[3];
// Define the target directory
const targetDirectory = path.join(
  __dirname,
  '..',
  'src',
  'modules',
  forWhich === '--socket' ? 'socket' : 'rest',
  folderName
);
// Create the target directory
fs.mkdirSync(targetDirectory, { recursive: true });

if (forWhich === '--socket') {
  // Create and write the files for web socket in the target directory
  const interfaceSocketTemp = `
// Define your interface here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.interface.ts`), interfaceSocketTemp);

  const constantSocketTemp = `
// Define your constant here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.constant.ts`), constantSocketTemp);

  const validationSocketTemp = `
// Define your validations here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.validation.ts`), validationSocketTemp);

  const modelSocketTemp = `
  // Define your model here
  `;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.model.ts`), modelSocketTemp);

  const eventSocketTemp = `
// Your event code here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.event.ts`), eventSocketTemp);

  const serviceSocketTemp = `
// Your service code here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.service.ts`), serviceSocketTemp);

  const namespaceSocketTemp = `
// Define your routes here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.namespace.ts`), namespaceSocketTemp);

  const storeSocketTemp = `
// Define your routes here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.store.ts`), storeSocketTemp);

  const testSocketTemp = `
// Define your routes here
`;
  fs.writeFileSync(path.join(targetDirectory, `__${fileName}.test.ts`), testSocketTemp);

  const docSocketTemp = `
  // Define your routes here
  `;
  fs.writeFileSync(path.join(targetDirectory, `__${fileName}.doc.ts`), docSocketTemp);

  console.info(`Folder '${folderName}' and files created successfully in 'src/modules/socket'.`);
} else {
  // Create and write the files in the target directory
  const interfaceTemplate = `
import { Model, Types } from 'mongoose';
import { SOME_CONSTANTS } from './${fileName}.constant';

export type ISomeConstant = (typeof SOME_CONSTANTS)[number];

export type I${capitalizedFileName} = {
  _id?: Types.ObjectId;
  anyRef: Types.ObjectId;
  removeIt: boolean;
  constant: ISomeConstant;
  createdAt?: Date;
  updatedAt?: Date;
};

export type I${capitalizedFileName}Model = {
  //? mongoose static methods type goes here...
} & Model<I${capitalizedFileName}>;

  `;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.interface.ts`), interfaceTemplate);

  const constantTemplate = `
  export const SOME_CONSTANTS = ['userRole', 'gender', 'anything unchangeable'] as const;
  `;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.constant.ts`), constantTemplate);

  const validationTemplate = `
  import { z } from 'zod';
  import { SOME_CONSTANTS } from './${fileName}.constant';
  
  const add${capitalizedFileName}ZodSchema = z.object({
    body: z
      .object({
        anyRef: z.string(),
        removeIt: z.boolean(),
        constant: z.enum(SOME_CONSTANTS),
      })
      .strict(),
  });
  
  const update${capitalizedFileName}ZodSchema = z.object({
    body: z
      .object({
        anyRef: z.string().optional(),
        removeIt: z.boolean().optional(),
        constant: z.enum(SOME_CONSTANTS).optional(),
      })
      .strict(),
  });
  
  const remove${capitalizedFileName}ZodSchema = z.object({
    body: z
      .object({
        value: z.string(),
      })
      .strict(),
  });
  
  export const ${capitalizedFileName}Validation = {
    update${capitalizedFileName}ZodSchema,
    add${capitalizedFileName}ZodSchema,
    remove${capitalizedFileName}ZodSchema,
  };
  
  `;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.validation.ts`), validationTemplate);

  const modelTemplate = `
  import { Schema, model } from 'mongoose';
  import { I${capitalizedFileName}, I${capitalizedFileName}Model } from './${fileName}.interface';
  import { SOME_CONSTANTS } from './${fileName}.constant';
  
  const ${fileName}Schema = new Schema<I${capitalizedFileName}>(
    {
      anyRef: {
        type: Schema.Types.ObjectId,
        ref: 'anyRef',
      },
      constant: {
        type: String,
        enum: SOME_CONSTANTS,
      },
      removeIt: Boolean,
    },
    {
      timestamps: true,
    }
  );
  
  export const ${capitalizedFileName} = model<I${capitalizedFileName}, I${capitalizedFileName}Model>('${capitalizedFileName}', ${fileName}Schema);
  
  `;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.model.ts`), modelTemplate);

  const controllerTemplate = `
  import { catchAsync } from '../../../shared/catchAsync';
  import { sendResponse } from '../../../shared/sendResponse';
  import { ${capitalizedFileName}Service } from './${fileName}.service';
  
  //? -----------------------------get-----------------------------
  const get${capitalizedFileName} = catchAsync(async (req, res) => {
    const data = await ${capitalizedFileName}Service.get${capitalizedFileName}(req.params.userId);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrieved successfully!!!',
      data,
    });
  });
  
  //? -----------------------------add-----------------------------
  const add${capitalizedFileName} = catchAsync(async (req, res) => {
    await ${capitalizedFileName}Service.add${capitalizedFileName}(req.body);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Added successfully!!!',
    });
  });
  
  //? ----------------------------update----------------------------
  const update${capitalizedFileName} = catchAsync(async (req, res) => {
    await ${capitalizedFileName}Service.update${capitalizedFileName}(req.user, req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Updated successfully!!!',
    });
  });
  
  //? ----------------------------remove----------------------------
  const remove${capitalizedFileName} = catchAsync(async (req, res) => {
    await ${capitalizedFileName}Service.remove${capitalizedFileName}(req.body.value);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Removed successfully!!!',
    });
  });
  
  export const ${capitalizedFileName}Controller = {
    get${capitalizedFileName},
    add${capitalizedFileName},
    update${capitalizedFileName},
    remove${capitalizedFileName},
  };
  
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.controller.ts`), controllerTemplate);

  const serviceTemplate = `
  import { IDecodedUser } from '../../../interfaces/user';
  import ApiError from '../../../errors/ApiError';
  import { ${capitalizedFileName} } from './${fileName}.model';
  import { I${capitalizedFileName} } from './${fileName}.interface';
  
  //? -----------------------------get-----------------------------
  const get${capitalizedFileName} = async (userId: string) => {
    const userData = await ${capitalizedFileName}.findById(userId).select('_id anyRef').lean();
  
    if (!userData) throw new ApiError(404, 'NOT FOUND');
  
    return userData;
  };
  
  //? -----------------------------add-----------------------------
  const add${capitalizedFileName} = async (payload: I${capitalizedFileName}): Promise<void> => {
    await ${capitalizedFileName}.create(payload);
  };
  
  //? ----------------------------update----------------------------
  const update${capitalizedFileName} = async (decodedUser: IDecodedUser, payload: Partial<I${capitalizedFileName}>): Promise<void> => {
    const { _id } = decodedUser;
  
    await ${capitalizedFileName}.findByIdAndUpdate(_id, { $set: payload });
  };
  
  //? ----------------------------remove----------------------------
  const remove${capitalizedFileName} = async (value: string): Promise<void> => {
    await ${capitalizedFileName}.deleteOne({ anyRef: value });
  };
  
  export const ${capitalizedFileName}Service = {
    get${capitalizedFileName},
    add${capitalizedFileName},
    update${capitalizedFileName},
    remove${capitalizedFileName},
  };
  
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.service.ts`), serviceTemplate);

  const routesTemplate = `
  import express from 'express';
  import validateRequest from '../../../middlewares/rest/validateRequest';
  import auth from '../../../middlewares/rest/auth';
  import { ${capitalizedFileName}Validation } from './${fileName}.validation';
  import { ${capitalizedFileName}Controller } from './${fileName}.controller';
  
  const router = express.Router();
  
  router.get('/:userId', ${capitalizedFileName}Controller.get${capitalizedFileName});
  
  router.post(
    '/',
    auth('user', 'admin'),
    validateRequest(${capitalizedFileName}Validation.add${capitalizedFileName}ZodSchema),
    ${capitalizedFileName}Controller.add${capitalizedFileName}
  );
  
  router.patch(
    '/',
    auth('admin'),
    validateRequest(${capitalizedFileName}Validation.update${capitalizedFileName}ZodSchema),
    ${capitalizedFileName}Controller.update${capitalizedFileName}
  );
  
  router.delete(
    '/',
    auth('user', 'userN'),
    validateRequest(${capitalizedFileName}Validation.remove${capitalizedFileName}ZodSchema),
    ${capitalizedFileName}Controller.remove${capitalizedFileName}
  );
  
  export const ${capitalizedFileName}Routes = router;
  
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.routes.ts`), routesTemplate);

  const testTemplate = `
  import mongoose from 'mongoose';
  import request from 'supertest';
  import { appTest } from '../../../server';
  import { ${capitalizedFileName} } from './${fileName}.model';
  
  beforeAll(async () => {
    await ${capitalizedFileName}.deleteMany({});
  });
  
  afterAll(async () => {
    await ${capitalizedFileName}.deleteMany({});
  });
  
  const apiRoot = '/api/v1/${fileName}';
  
  const objectId = new mongoose.Types.ObjectId().toString();
  
  const ${fileName}Snapshot = {
    _id: objectId,
    anyRef: objectId,
    constant: 'gender',
    removeIt: false,
  };
  
  describe('${fileName} route', () => {
    describe('create ${fileName}', () => {
      it('should return ${fileName} creation successful', async () => {
        const { body, statusCode } = await request(appTest)
          .post(\`\${apiRoot}/\`)
          .set({ 'x-auth-token': process.env.ADMIN_TOKEN })
          .send(${fileName}Snapshot);
  
        expect(statusCode).toBe(201);
        expect(body.success).toBeTruthy();
      });
  
      it('should return access denied with status code 403', async () => {
        const { body, statusCode } = await request(appTest).post(\`\${apiRoot}/\`).send(${fileName}Snapshot);
  
        expect(body.message).toContain('access denied');
        expect(statusCode).toBe(403);
      });
    });
  
    describe('getting ${fileName} by id', () => {
      it('should return the  users data', async () => {
        const { body, statusCode } = await request(appTest).get(\`\${apiRoot}/\${objectId}\`);
  
        expect(body).toHaveProperty('message');
        expect(statusCode).toBe(404);
      });
    });
  });
  
  `;
  fs.writeFileSync(path.join(targetDirectory, `__${fileName}.test.ts`), testTemplate);

  const docTemplate = `
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
  import { I${capitalizedFileName} } from './${fileName}.interface';
  
  @Route('/${fileName}/')
  @Tags('${capitalizedFileName}Controller')
  export class ${capitalizedFileName}Controller extends Controller {
    /**
     * Retrieves the details of an existing user.
     * @param userId Supply the valid user mongodb ID.
     */
    @Get('{userId}')
    public async get${capitalizedFileName}(
      @Header('X-Access-Token') authorization: string,
      @Path() userId: string
    ): Promise<IApiResponse<I${capitalizedFileName}>> {
      return;
    }
  
    /**
     * Adds a new user by providing required request body.
     * @param requestBody _id, createdAt and updated are optional fields
     */
    @SuccessResponse(201, 'created')
    @Post()
    public async add${capitalizedFileName}(
      @Header('X-Access-Token') authorization: string,
      @Body() requestBody: I${capitalizedFileName}
    ): Promise<IApiResponse<null>> {
      return;
    }
  
    /**
     * Patch docs here
     */
    @Patch()
    public async update${capitalizedFileName}(
      @Header('X-Access-Token') authorization: string,
      @Body() requestBody: Partial<I${capitalizedFileName}>
    ): Promise<IApiResponse<null>> {
      return;
    }
  
    /**
     * Delete docs here
     */
    @Delete()
    public async remove${capitalizedFileName}(
      @Header('X-Access-Token') authorization: string,
      @Body() requestBody: { value: string }
    ): Promise<IApiResponse<null>> {
      return;
    }
  }
  
  `;
  fs.writeFileSync(path.join(targetDirectory, `__${fileName}.doc.ts`), docTemplate);

  // Path to the routes/index.ts file
  const indexPath = path.join(__dirname, '..', 'src', 'routes', 'index.ts');

  // Read the content of the file
  let content = fs.readFileSync(indexPath, 'utf-8');

  // New import statement
  const newImport = `import { ${capitalizedFileName}Routes } from '../modules/rest/${fileName}/${fileName}.routes';\n`;

  // Append the new import statement to the content
  content = newImport + content;

  // Locate the moduleRoutes array
  const moduleRoutesIndex = content.indexOf('const moduleRoutes: IModuleRoutes = [');
  const moduleRoutesEndIndex = content.indexOf('];', moduleRoutesIndex);

  // Insert the new object into the moduleRoutes array
  const newModuleObject = `  { path: '/${fileName}', route: ${capitalizedFileName}Routes },\n`;
  content = content.slice(0, moduleRoutesEndIndex) + newModuleObject + content.slice(moduleRoutesEndIndex);

  // Write the updated content back to the file
  fs.writeFileSync(indexPath, content, 'utf-8');

  console.info(`Folder '${folderName}' and files created successfully in 'src/modules/rest'.`);
}
