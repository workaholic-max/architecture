import type { PermissionMeta } from '@router/types/meta';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
        permission?: PermissionMeta;
    }
}
