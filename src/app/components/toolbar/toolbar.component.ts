import { Component, EventEmitter, Output, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { User } from '@angular/fire/auth';
import { MatTooltip } from '@angular/material/tooltip';
import { ThemeService } from 'src/app/app/theme.service';

const MATERIAL_MODULES = [MatToolbarModule, MatIconModule, MatButtonModule, MatTooltip];

/**
 * Componente de la barra de herramientas (toolbar) que contiene iconos de navegación, opciones de inicio de sesión y una opción para agregar nuevos contactos.
 * 
 * Este componente incluye la lógica para mostrar el estado de la sesión del usuario y gestionar la apertura/cierre de un menú desplegable.
 */
@Component({
  selector: 'app-toolbar', // Selector para usar el componente en otras plantillas
  standalone: true, // Componente autónomo sin dependencia de un módulo adicional
  imports: [MATERIAL_MODULES, CommonModule, RouterLink], // Módulos de Material y Angular necesarios
  templateUrl: './toolbar.component.html', // Plantilla HTML del componente
  styleUrls: ['./toolbar.component.css'], // Estilos asociados al componente
})
export class ToolbarComponent {


  /**
   * Señal que representa al usuario autenticado.
   * Esta señal es reactiva y se actualiza cada vez que cambia el estado del usuario.
   */
  user: Signal<User | null>;

  /**
   * Estado del menú desplegable para el usuario (abierto o cerrado).
   * Se usa para controlar si el menú desplegable de opciones está visible o no.
   */
  isDropdownOpen = false;

  /**
   * Constructor del componente.
   * 
   * @param router - Instancia del servicio Router de Angular para navegación.
   * @param authService - Instancia del servicio de autenticación para gestionar el estado del usuario.
   */
  constructor(private router: Router,
     private authService: AuthService,
    private themeService: ThemeService) {
    this.user = this.authService.user; // Asignación directa de la señal del usuario
  }

  /**
   * Cambia el estado de visibilidad del menú desplegable de opciones.
   * Alterna entre abierto y cerrado.
   */
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Cierra la sesión del usuario y redirige a la página de inicio de sesión.
   * 
   * @returns {Promise<void>} - Promesa que resuelve cuando el usuario ha cerrado sesión.
   */
  async logOut() {
    await this.authService.logout(); // Llama al servicio de autenticación para cerrar sesión
    this.router.navigate(['/sign-in']); // Redirige a la página de inicio de sesión
  }


  toggleTheme() {
    this.themeService.toggleTheme(); // Llamamos al método toggleTheme del servicio
  }

}
