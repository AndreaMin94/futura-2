import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

describe('HealthController', () => {
  let controller: HealthController;

  const healthService = {
    getLiveness: vi.fn(() => ({ status: 'ok' as const })),
    getReadiness: vi.fn(() => ({
      status: 'ok' as const,
      database: 'ok' as const,
    })),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: healthService,
        },
      ],
    }).compile();

    controller = moduleRef.get(HealthController);
  });

  it('returns API health status', () => {
    expect(controller.getHealth()).toEqual({
      status: 'ok',
    });

    expect(healthService.getLiveness).toHaveBeenCalledOnce();
  });

  it('returns readiness status', async () => {
    expect(controller.getReadiness()).toEqual({
      status: 'ok',
      database: 'ok',
    });

    expect(healthService.getReadiness).toHaveBeenCalledOnce();
  });
});
