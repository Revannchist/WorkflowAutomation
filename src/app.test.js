import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app.js';

describe('GET /calculate', () => {
  it('should return the total when valid input is provided', async () => {
    const response = await request(app)
      .get('/calculate')
      .query({ price: 10, quantity: 5 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ total: 50 });
  });

  it('should return an error for invalid input', async () => {
    const response = await request(app)
      .get('/calculate')
      .query({ price: -10, quantity: 5 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
