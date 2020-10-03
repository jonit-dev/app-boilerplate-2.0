
export const config = (): any => ({
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
    passport: {
      defaultStrategy: process.env.PASSPORT_DEFAULT_STRATEGY
    }
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.ENV === "Development" ? true : false // Dont set to true on production
  }
})