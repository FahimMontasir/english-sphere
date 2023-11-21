
  import mongoose from 'mongoose';
  import request from 'supertest';
  import { appTest } from '../../../server';
  import { BoilerplateCode } from './boilerplateCode.model';
  
  beforeAll(async () => {
    await BoilerplateCode.deleteMany({});
  });
  
  afterAll(async () => {
    await BoilerplateCode.deleteMany({});
  });
  
  const apiRoot = '/api/v1/boilerplateCode';
  
  const objectId = new mongoose.Types.ObjectId().toString();
  
  const boilerplateCodeSnapshot = {
    _id: objectId,
    anyRef: objectId,
    constant: 'gender',
    removeIt: false,
  };
  
  describe('boilerplateCode route', () => {
    describe('create boilerplateCode', () => {
      it('should return boilerplateCode creation successful', async () => {
        const { body, statusCode } = await request(appTest)
          .post(`${apiRoot}/`)
          .set({ 'x-auth-token': process.env.ADMIN_TOKEN })
          .send(boilerplateCodeSnapshot);
  
        expect(statusCode).toBe(201);
        expect(body.success).toBeTruthy();
      });
  
      it('should return access denied with status code 403', async () => {
        const { body, statusCode } = await request(appTest).post(`${apiRoot}/`).send(boilerplateCodeSnapshot);
  
        expect(body.message).toContain('access denied');
        expect(statusCode).toBe(403);
      });
    });
  
    describe('getting boilerplateCode by id', () => {
      it('should return the  users data', async () => {
        const { body, statusCode } = await request(appTest).get(`${apiRoot}/${objectId}`);
  
        expect(body).toHaveProperty('message');
        expect(statusCode).toBe(404);
      });
    });
  });
  
  