declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_ENVIRONMENT: 'development' | 'production';
    readonly NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string;
    readonly NEXT_PUBLIC_API_URL: string;
  }
}
