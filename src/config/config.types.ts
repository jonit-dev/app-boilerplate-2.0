

export interface IEnvConfig {
  'authentication.jwtSecret': string,
  'authentication.passport.defaultStrategy': string,
  'database.type': string,
  'database.host': string,
  'database.port': number,
  'database.username': string,
  'database.password': string,
  'database.database': string,
  'database.entities': string[],
  'database.synchronize': string[],
}

