import { documentService } from '@shared/services/document.js';
import { deviceService } from '@shared/services/device.js';

export const initServices = () => {
    documentService.init();
    deviceService.init();
};
