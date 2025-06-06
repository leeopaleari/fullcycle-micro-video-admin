/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { config as readEnv } from 'dotenv';
import { join } from 'path';

export class Config {
  static env: any = null;

  static db() {
    Config.readEnv();

    return {
      dialect: 'sqlite' as any,
      host: Config.env.DB_HOST,
      logging: Config.env.DB_LOGGING === 'true',
    };
  }

  static bucketName() {
    Config.readEnv();

    return Config.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME;
  }

  static googleCredentials() {
    Config.readEnv();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return JSON.parse(Config.env.GOOGLE_CLOUD_CREDENTIALS);
  }

  static rabbitmqUri() {
    Config.readEnv();

    return Config.env.RABBITMQ_URI;
  }

  static readEnv() {
    if (Config.env) {
      return;
    }

    const { parsed } = readEnv({
      path: join(process.cwd(), `envs/.env.${process.env.NODE_ENV}`),
      // path: join(__dirname, `../../../../envs/.env.${process.env.NODE_ENV}`),
    });

    if (!parsed) {
      throw new Error('Failed to load environment variables');
    }

    Config.env = {
      ...parsed,
      ...process.env,
    };
  }
}
