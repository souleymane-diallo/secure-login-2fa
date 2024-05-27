const request = require('supertest');
const { describe, it, expect } = require('@jest/globals');
const app = require('../app');

let server;

beforeAll((done) => {
  const PORT = 5001; 
  server = app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('Auth Controller', () => {
  describe('POST /api/register', () => {
    it('should register a user with valid email and password', async () => {
      const validPayload = {
        email: `newuser${Date.now()}@example.com`,  // Utiliser un email unique pour chaque test
        password: 'password123'
      };
      const response = await request(app)
        .post('/api/register')
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should reject short passwords during registration', async () => {
      const shortPasswordPayload = {
        email: `test${Date.now()}@example.com`,
        password: 'short'
      };
      const response = await request(app)
        .post('/api/register')
        .send(shortPasswordPayload);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Password must be at least 6 characters long.');
    });

    it('should not allow SQL injection through email during registration', async () => {
      const maliciousPayload = {
        email: "' OR 1=1 --",
        password: 'password123'
      };
      const response = await request(app)
        .post('/api/register')
        .send(maliciousPayload);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/login', () => {
    it('should not allow SQL injection through email', async () => {
      const maliciousPayload = {
        email: "' OR 1=1 --",
        password: 'password123'
      };
      const response = await request(app)
        .post('/api/login')
        .send(maliciousPayload);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should not allow SQL injection through password', async () => {
      const maliciousPayload = {
        email: 'test@example.com',
        password: "' OR 1=1 --"
      };
      const response = await request(app)
        .post('/api/login')
        .send(maliciousPayload);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 2FA setup required for new users', async () => {
      const newUserPayload = {
        email: `newuser${Date.now()}@example.com`,
        password: 'password123'
      };

      // Register the new user first
      await request(app)
        .post('/api/register')
        .send(newUserPayload);

      // Attempt to login
      const response = await request(app)
        .post('/api/login')
        .send(newUserPayload);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', '2FA setup required');
      expect(response.body).toHaveProperty('qrCodeUrl');
      expect(response.body).toMatchSnapshot();
    });
  });
});
