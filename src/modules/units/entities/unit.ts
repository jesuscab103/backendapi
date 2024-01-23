import { Entity } from '../../../kernel/types';

export type Units = Entity<number> & {
    idgps?: number;
    brand?: string;
    model?: string;
    plate?: string;
    serie?: string;
    year?: string;
    color?: string;
    line?: string;
    unit_name?: string;
    group_name?: string;
};
  