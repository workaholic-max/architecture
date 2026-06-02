import type { PermissionKey } from '@shared/types/permission.ts';

export type PermissionMeta =
    | {
          key: PermissionKey;
      }
    | {
          keys: PermissionKey[];
      };
