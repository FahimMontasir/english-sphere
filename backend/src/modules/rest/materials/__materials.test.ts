
  import mongoose from 'mongoose';
  import request from 'supertest';
  import { appTest } from '../../../server';
  import { Materials } from './materials.model';
  
  beforeAll(async () => {
    await Materials.deleteMany({});
  });
  
  afterAll(async () => {
    await Materials.deleteMany({});
  });
  
  const apiRoot = '/api/v1/materials';
  
  const objectId = new mongoose.Types.ObjectId().toString();
  
  const materialsSnapshot = {
    _id: objectId,
    anyRef: objectId,
    constant: 'gender',
    removeIt: false,
  };
  
  describe('materials route', () => {
    describe('create materials', () => {
      it('should return materials creation successful', async () => {
        const { body, statusCode } = await request(appTest)
          .post(`${apiRoot}/`)
          .set({ 'x-auth-token': process.env.ADMIN_TOKEN })
          .send(materialsSnapshot);
  
        expect(statusCode).toBe(201);
        expect(body.success).toBeTruthy();
      });
  
      it('should return access denied with status code 403', async () => {
        const { body, statusCode } = await request(appTest).post(`${apiRoot}/`).send(materialsSnapshot);
  
        expect(body.message).toContain('access denied');
        expect(statusCode).toBe(403);
      });
    });
  
    describe('getting materials by id', () => {
      it('should return the  users data', async () => {
        const { body, statusCode } = await request(appTest).get(`${apiRoot}/${objectId}`);
  
        expect(body).toHaveProperty('message');
        expect(statusCode).toBe(404);
      });
    });
  });
  
  