import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, filter, switchMap, interval, map, takeWhile, of } from 'rxjs';
import { DownloadAction } from './interfaces/download-action';
import { DownloadFile } from './interfaces/download-file';
import { DownloadStatus } from './interfaces/download-status';

@Component({
    selector: 'app-load-manager-page',
    imports: [],
    templateUrl: './load-manager-page.component.html',
    styleUrl: './load-manager-page.component.scss',
})
export class LoadManagerPageComponent {
    protected filesList = signal<DownloadFile[]>([]);
    protected activeCount = computed(() => {
        return this.filesList().filter(f => f.status === 'downloading').length;
    });
    protected globalProgress = computed(() => {
        const list = this.filesList();
        if (list.length === 0) return 0;
        const total = list.reduce((sum, f) => sum + f.progress, 0);
        return Math.round(total / list.length);
    });

    private downloadAction$ = new Subject<DownloadAction>();
    private destroyRef = inject(DestroyRef);

    protected startDownload(fileId: string) {
        this.setFileStatus(fileId, 'downloading');
        this.downloadAction$.next({ id: fileId, action: 'start' });
    }
    protected pauseDownload(fileId: string) {
        this.setFileStatus(fileId, 'paused');
        this.downloadAction$.next({ id: fileId, action: 'pause' });
    }
    protected resumeDownload(fileId: string) {
        this.setFileStatus(fileId, 'downloading');
        this.downloadAction$.next({ id: fileId, action: 'resume' });
    }
    protected cancelDownload(fileId: string) { 
        this.setFileStatus(fileId, 'cancelled');
        this.downloadAction$.next({ id: fileId, action: 'cancel' });
    }

    constructor() {
        this.addFiles([
            'Angular_Core_Mastery.pdf',
            'RxJS_Deep_Dive.mp4',
            'Enterprise_Architecture_Guide.epub'
        ]);
    }

    private addFiles(name: string[]) {
        const pendingCount = name.length;
        const currentCount = this.filesList().length;

        const pendingFiles: DownloadFile[] = [];
        for (let i = 0; i < pendingCount; i++) {
            const pendingFile: DownloadFile = {
                id: (currentCount + i + 1).toString(),
                name: name[i],
                status: 'idle',
                progress: 0
            }
            pendingFiles.push(pendingFile);
            this.initFileDownloadStream(pendingFile.id);
        }

        this.filesList.update(v => [...v, ...pendingFiles]);
    }

    private initFileDownloadStream(fileId: string) {
        let currentProgress = 0;
        this.downloadAction$.pipe(
            filter(cmd => cmd.id === fileId),
            switchMap(cmd => {
                if (cmd.action === 'start' || cmd.action === 'resume') {
                    return interval(200).pipe(
                        map(() => {
                            const step = Math.floor(Math.random() * 4) + 1;
                            currentProgress = Math.min(currentProgress + step, 100);
                            return currentProgress;
                        }),
                        takeWhile(progress => progress < 100, true)
                    )
                }

                if (cmd.action === 'pause') {
                    return of(currentProgress);
                }

                currentProgress = 0;
                return of(0);
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(progress => {
            this.filesList.update(l => l.map(f => 
                f.id === fileId
                    ? { ...f, progress, status: progress === 100 ? 'completed' : f.status }
                    : f
            ));
        });
    }

    private statusMap: Record<DownloadStatus, DownloadStatus[]> = {
        'idle': ['downloading'],
        'downloading': ['paused', 'completed', 'cancelled'],
        'paused': ['downloading', 'cancelled'],
        'completed': [],
        'cancelled': ['downloading']
    }

    private setFileStatus(fileId: string, status: DownloadStatus) {
        this.filesList.update(l => l.map(f => {
            if (f.id === fileId && this.statusMap[f.status].includes(status)) {
                return { ...f, status };
            }

            return f;
        }));
    }
}
