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

  console.info(`Folder '${folderName}' and files created successfully in 'src/modules/socket'.`);
} else {
  // Create and write the files in the target directory
  const interfaceTemplate = `
  // Define your interface here
  `;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.interface.ts`), interfaceTemplate);

  const constantTemplate = `
  // Define your constant here
  `;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.constant.ts`), constantTemplate);

  const validationTemplate = `
  // Define your validations here
  `;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.validation.ts`), validationTemplate);

  const controllerTemplate = `
// Your controller code here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.controller.ts`), controllerTemplate);

  const serviceTemplate = `
// Your service code here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.service.ts`), serviceTemplate);

  const routesTemplate = `
// Define your routes here
`;
  fs.writeFileSync(path.join(targetDirectory, `${fileName}.routes.ts`), routesTemplate);

  const testTemplate = `
  // Define your routes here
  `;
  fs.writeFileSync(path.join(targetDirectory, `__${fileName}.test.ts`), testTemplate);

  console.info(`Folder '${folderName}' and files created successfully in 'src/modules/rest'.`);
}
