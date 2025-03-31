import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, MatTabsModule, ProfileComponent, ChangePasswordComponent],
  templateUrl: './profile-settings.component.html',
  styles: []
})
export class ProfileSettingsComponent {}
