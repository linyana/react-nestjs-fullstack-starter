type ExtractWhere<T> = T extends { findUnique(args: infer A): any }
  ? A extends { where: infer W }
    ? W
    : never
  : never;

type ExtractCreate<T> = T extends { create(args: infer A): any }
  ? A extends { data: infer D }
    ? D
    : never
  : never;

type ExtractUpdate<T> = T extends { update(args: infer A): any }
  ? A extends { data: infer D }
    ? D
    : never
  : never;

type ExtractResult<T> = T extends { findUnique(...args: any[]): Promise<infer R | null> }
  ? R
  : never;