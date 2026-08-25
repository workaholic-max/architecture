import type { FileExportPayload } from '@features/file-export/types/file-export.ts';

import { downloadFile } from '@shared/utils/file.ts';

const save = ({ data, fileName }: FileExportPayload) => {
    downloadFile(data, fileName);
};

export const fileExportService = {
    save,
};
