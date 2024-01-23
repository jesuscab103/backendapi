// mysql2.d.ts

declare module 'mysql2' {
    import { Connection, ConnectionConfig as OriginalConnectionConfig } from 'mysql2/promise';
  
    interface PoolPromise {
      getConnection(): Promise<Connection>;
    }
  
    export interface ConnectionConfig extends OriginalConnectionConfig {
      mergeFlags?: boolean;
      getDefaultFlags?: () => number;
      getCharsetNumber?: () => number;
      getSSLProfile?: () => any;
      parseUrl?: (url: string) => any;
    }
  
    export function createPoolPromise(config: ConnectionConfig): PoolPromise;
  }
