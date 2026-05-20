import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';

import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  it('returns API health status', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    const controller = moduleRef.get(HealthController);

    expect(controller.getHealth()).toEqual({
      status: 'ok',
    });
  });
});
