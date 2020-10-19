export interface IConfigAuthentication {
  jwtSecret: string,
  passport: {
    defaultStrategy: string
  }
}

export interface IConfigDatabase {
  type: any,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  entities: string[],
  synchronize: boolean
}