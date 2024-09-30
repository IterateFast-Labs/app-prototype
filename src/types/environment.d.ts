declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_ENVIRONMENT: 'development' | 'production';
  }
}
