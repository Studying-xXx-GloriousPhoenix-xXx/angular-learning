import { DownloadStatus } from "./download-status";

export interface DownloadFile {
    id: string;
    name: string;
    progress: number;
    status: DownloadStatus;
}