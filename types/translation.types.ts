// value should match resource's folder name from /src
export enum Entities {
  Global = 'global', // this one exists only in /translations folder
  Auth = 'auth',
  Tasks = 'tasks',
  Users = 'users',
  Logs = 'logs',
}

export enum GlobalTranslationKeys {
  FORBIDDEN_KEY_UPDATE = 'FORBIDDEN_KEY_UPDATE',
  SERVER_BOOTSTRAP_ERROR = 'SERVER_BOOTSTRAP_ERROR',
  SERVER_RUNNING = 'SERVER_RUNNING',
}

export enum AuthTranslationKeys {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}

export enum UserTranslationKeys {
  ADMIN_ONLY = 'ADMIN_ONLY',
}

export enum LogTranslationKeys {
  LOG_DELETE_NOT_FOUND = 'LOG_DELETE_NOT_FOUND',
}
