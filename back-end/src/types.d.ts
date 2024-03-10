export interface HttpsConstructor {
  keyRoute: string;
  certRoute: string;
}

export interface OptionsHttps {
  key: Buffer;
  cert: Buffer;
}

export interface ListenServerType {
  app: Express.Application;
  listen: () => void;
  PORT: number;
}

export interface ErrorType {
  error: string;
}
