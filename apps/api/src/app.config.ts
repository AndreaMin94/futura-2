const defaultApiPort = 3000;

export type AppConfig = {
  apiPort: number;
};

function getNumberEnv(name: string, defaultValue: number): number {
  const rawValue = process.env[name];

  if (rawValue === undefined || rawValue === '') return defaultValue;

  const value = Number(rawValue);

  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }

  return value;
}

export function getAppConfig(): AppConfig {
  return {
    apiPort: getNumberEnv('API_PORT', defaultApiPort),
  };
}
