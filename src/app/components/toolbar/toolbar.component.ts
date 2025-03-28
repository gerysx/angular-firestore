import { Component, EventEmitter, Output, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { User } from '@angular/fire/auth';

const MATERIAL_MODULES = [MatToolbarModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MATERIAL_MODULES, CommonModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Output() onNewContactEvent = new EventEmitter<void>();

  user: Signal<User | null>;

  isDropdownOpen = false;

  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.user; // ✅ Asigna directamente la señal
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  async logOut() {
    await this.authService.logout();
    this.router.navigate(['/sign-in']);
  }

  onNewClick(): void {
    this.onNewContactEvent.emit();
  }
}
