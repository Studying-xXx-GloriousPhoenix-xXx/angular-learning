import { DownloadActionType } from "./download-action-type";

export interface DownloadAction {
    id: string;
    action: DownloadActionType;
}
