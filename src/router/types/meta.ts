import type { PermissionKey } from '@app/types/permission.ts';

export type PermissionMeta =
    | {
          key: PermissionKey;
      }
    | {
          keys: PermissionKey[];
      };
