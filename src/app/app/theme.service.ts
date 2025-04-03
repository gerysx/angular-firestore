import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  // Método para cambiar el tema
  toggleTheme(): void {
    const body = document.body;
    body.classList.toggle('dark');  // Cambia entre el tema claro y oscuro
    this.saveTheme();
  }

  // Guardar la preferencia del tema en el localStorage
  private saveTheme(): void {
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('isDark', JSON.stringify(isDark));
  }

  // Cargar el tema desde el localStorage
  loadTheme(): void {
    const isDark = JSON.parse(localStorage.getItem('isDark') || 'false');
    const body = document.body;
    if (isDark) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }
}
