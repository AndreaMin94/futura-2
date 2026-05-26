import { ServiceUnavailableException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PrismaService } from '../database/prisma.service.js';
import { HealthService } from './health.service.js';

describe('HealthService', () => {
  let service: HealthService;

  const prisma = {
    $queryRaw: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new HealthService(prisma as unknown as PrismaService);
  });

  it('returns liveness status', () => {
    expect(service.getLiveness()).toEqual({
      status: 'ok',
    });
  });

  it('returns readiness status when database is available', async () => {
    prisma.$queryRaw.mockResolvedValueOnce([{ result: 1 }]);

    await expect(service.getReadiness()).resolves.toEqual({
      status: 'ok',
      database: 'ok',
    });
  });

  it('trhows ServiceUnavailableException when database is unavailable', async () => {
    prisma.$queryRaw.mockRejectedValueOnce(new Error('Database is down'));
    await expect(service.getReadiness()).rejects.toBeInstanceOf(ServiceUnavailableException);
    expect(prisma.$queryRaw).toHaveBeenCalledOnce();
  });
});
