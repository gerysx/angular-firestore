import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Importamos RouterOutlet para la navegación de rutas
import { ToolbarComponent } from "@components/toolbar/toolbar.component";  // Componente de la barra de herramientas
import { MatCardModule } from '@angular/material/card';  // Módulo de Angular Material para tarjetas (MatCard)
import { ModalService } from '@components/modal/modal.service';  // Servicio para manejar la apertura y cierre de modales
import { ModalComponent } from '@components/modal/modal.component';  // Componente para mostrar un modal
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  // Módulo de spinner de progreso
import { HomeComponent } from './pages/home/home.component';  // Componente principal de la página de inicio
import { CommonModule } from '@angular/common';  // Módulo común de Angular
import { FooterComponent } from '@components/footer/footer.component';  // Componente para el pie de página
import { ThemeService } from './app/theme.service';

// Array que agrupa los módulos de Angular Material utilizados
const MATERIAL_MODULES = [MatCardModule, MatProgressSpinnerModule];

@Component({
  selector: 'app-root',  // Selector para usar el componente como etiqueta HTML
  standalone: true,
  imports: [
    RouterOutlet,  // Módulo de enrutamiento
    ToolbarComponent,  // Barra de herramientas
    MATERIAL_MODULES,  // Módulos de Angular Material
    CommonModule,  // Módulo común de Angular
    FooterComponent  // Pie de página
  ],
  templateUrl: './app.component.html',  // Ruta a la plantilla HTML
  styleUrls: ['./app.component.css']  // Ruta a los estilos CSS
})
export class AppComponent implements OnInit{

  

  constructor(private themeService: ThemeService) {
    // Establecer el tema guardado en localStorage cuando la app se inicializa
  }

  ngOnInit() {
    this.themeService.loadTheme(); // Carga el tema guardado
  }

  // Método para alternar entre los temas claro y oscuro
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Servicio para manejar las operaciones del modal
  private readonly _modalSvc = inject(ModalService);

  /**
   * Método para abrir un modal cuando el usuario quiere crear un nuevo contacto.
   * Este método es llamado cuando el usuario hace clic en un botón para añadir un contacto.
   */
  onClickNewContact(): void {
    this._modalSvc.openModal<ModalComponent>(ModalComponent);  // Abre el modal para añadir un nuevo contacto
  }
}
