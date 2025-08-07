import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDarkMode = false;
  menuOpen = false;

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      // move focus into menu for accessibility
      setTimeout(() => {
        const el = document.querySelector('.side-menu') as HTMLElement | null;
        el?.focus();
      }, 0);
    }
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  // Close the menu if user presses ESC anywhere
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
