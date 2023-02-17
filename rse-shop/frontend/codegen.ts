import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: 'graphql/*.ts',
  generates: {
    'graphql/generated/types.d.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        reactApolloVersion: 4
      }
    }
  }
};

export default config;
