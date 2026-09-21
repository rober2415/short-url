import { Component, OnInit } from '@angular/core';
import { LinksService } from '../../services/links.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ConfirmModalService } from 'src/app/core/services/confirm-modal/confirm-modal.service';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss'],
})
export class LinksPageComponent implements OnInit {
  links$ = this.linksService.links$;
  isLoading$ = this.linksService.isLoading$;
  isDeletingId$ = this.linksService.isDeleting$;

  constructor(
    private linksService: LinksService,
    private toastService: ToastService,
    private confirmModalService: ConfirmModalService,
  ) {}

  ngOnInit(): void {
    this.linksService.getUserLinks().subscribe({
      error: (error) => console.error('Error loading user links', error),
    });
  }

  onDelete(linkId: number): void {
    if (!linkId) return;

    this.confirmModalService
      .confirm({
        title: 'Delete link',
        message: 'Are you sure you want to delete this link?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'danger',
      })
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => this.linksService.deleteLink(linkId)),
      )
      .subscribe({
        next: () => this.toastService.success('Link deleted successfully.'),
        error: () => this.toastService.error('Error deleting link.'),
      });
  }
}
