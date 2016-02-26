// FIXED VERSION

/// <reference path="../typings/redux/redux.d.ts" />

declare module 'redux-logger' {

  function createLogger(options?: createLogger.ReduxLoggerOptions): Redux.Middleware;

  namespace createLogger {
    interface ReduxLoggerOptions {
      actionTransformer?: (action: any) => any;
      collapsed?: boolean;
      duration?: boolean;
      level?: string;
      logger?: any;
      predicate?: (getState: Function, action: any) => boolean;
      timestamp?: boolean;
      transformer?: (state:any) => any;
    }
  }

  export = createLogger;
}
