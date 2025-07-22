declare namespace NodeJS {
    interface ProcessEnv {
        PORT?: string;
        MONGO_URI: string;
        JWT_REFRESH_SECRET: string;
        JWT_ACCESS_SECRET: string;
    }
}
