import { DASHBOARD_ROUTE_NAME } from '@domains/dashboard/routes/route-names.js';
import { routeAccessDeniedService } from '../../services/route-access-denied.service.js';
import { canAccessRoute } from '../../utils/permission.js';

export const permissionGuard = ({ to, employee }) => {
    const { title, permission } = to.meta ?? {};

    if (!canAccessRoute(employee, permission)) {
        routeAccessDeniedService.report(title);

        return { name: DASHBOARD_ROUTE_NAME };
    }

    return null;
};
