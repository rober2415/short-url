import { Component, OnInit } from '@angular/core';
import { LinksService } from '../../services/links.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Link } from 'src/app/core/models/link.interface';

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss'],
})
export class LinksPageComponent implements OnInit {
  links: Link[] = [];
  isLoading = true;
  isDeleting = false;

  constructor(
    private linksService: LinksService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      console.warn('No user ID found in session');
      this.isLoading = false;
      return;
    }

    this.linksService.getUserLinks().subscribe({
      next: (links) => {
        this.links = links;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading user links', err);
        this.isLoading = false;
      },
    });
  }

  deleteLink(id?: number): void {
    if (!id) {
      this.isDeleting = false;
      return;
    }
    this.isDeleting = true;
    this.linksService.deleteLink(id).subscribe({
      next: () => {
        this.links = this.links.filter(link => link.id !== id);
        this.isDeleting = false;
      },
      error: (err) => {
        console.error('Error deleting link', err);
        this.isDeleting = false;
      },
    });
  }
}
