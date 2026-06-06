declare global {
  namespace Nodejs {
    interface processEnv {
      PORT: any;
      JWT_SECRET: any;
      DATABASE_URL: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
      DATABASE_HOST: string;
      DATABASE_PORT: any;
    }
  }
}
export { };