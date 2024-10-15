import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-shop-plh513';
  activeLink: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Set the active link based on the current route
    this.activeLink = this.router.url;

    // Subscribe to router events to keep active link updated
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeLink = this.router.url; // Update active link on navigation
      });
  }

  setActive(link: string) {
    this.activeLink = link;
    this.router.navigate([link]);
  }
}
