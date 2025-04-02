import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

/**
 * Componente que gestiona la configuración del perfil de usuario.
 * Contiene pestañas para mostrar la información del perfil y la opción para cambiar la contraseña.
 * 
 * Utiliza Material Design Tabs para estructurar la interfaz de usuario en diferentes secciones.
 */
@Component({
  selector: 'app-profile-settings', // Selector utilizado en la plantilla HTML para este componente
  standalone: true, // Este componente es autónomo y no necesita ser parte de un módulo
  imports: [CommonModule, MatTabsModule, ProfileComponent, ChangePasswordComponent], // Módulos necesarios para el componente
  templateUrl: './profile-settings.component.html', // Plantilla del componente
  styles: [] // Estilos asociados al componente
})
export class ProfileSettingsComponent {
  /**
   * Este componente no necesita lógica adicional, ya que solo actúa como un contenedor
   * para los otros componentes, `ProfileComponent` y `ChangePasswordComponent`, dentro de una estructura de pestañas.
   */
}
