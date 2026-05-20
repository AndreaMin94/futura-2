import { afterEach, describe, expect, it } from 'vitest';
import { getAppConfig } from './app.config.js';

const originalApiPort = process.env.API_PORT;
describe('getAppConfig', () => {
  afterEach(() => {
    if (originalApiPort === undefined) {
      delete process.env.API_PORT;
    } else {
      process.env.API_PORT = originalApiPort;
    }
  });

  it('uses default API port when API_PORT is not set', () => {
    delete process.env.API_PORT;
    expect(getAppConfig()).toEqual({
      apiPort: 3000,
    });
  });

  it('uses API_PORT from the environment', () => {
    process.env.API_PORT = '4000';

    expect(getAppConfig()).toEqual({
      apiPort: 4000,
    });
  });
});
