import type { PermissionMeta } from '@router/types/meta.ts';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
        permission?: PermissionMeta;
    }
}
