import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

/**
 * Componente principal de la página de inicio que muestra un carrusel de imágenes.
 */
@Component({
  selector: 'app-home',  // El selector del componente para ser usado en HTML
  standalone: true,  // El componente es independiente y no pertenece a ningún módulo específico
  imports: [CommonModule],  // Importamos CommonModule para usar funcionalidades comunes de Angular
  templateUrl: './home.component.html',  // Ruta de la plantilla HTML asociada
  styleUrls: ['./home.component.css']  // Estilos CSS asociados al componente
})
export class HomeComponent implements OnInit {
  /**
   * Índice actual del slide que se está mostrando.
   */
  currentIndex: number = 0;

  /**
   * Array de objetos que contienen las imágenes y los títulos de cada slide del carrusel.
   */
  slides = [
    {
      image: 'https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      title: 'Tecnología'  // Título del slide
    },
    {
      image: 'https://images.pexels.com/photos/7574366/pexels-photo-7574366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      title: 'Automatización'  // Título del slide
    },
    {
      image: 'https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      title: 'Soluciones'  // Título del slide
    }
  ];
  

  /**
   * Constructor del componente.
   */
  constructor() {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   * Actualmente vacío, pero puede ser usado para inicializar valores o realizar tareas
   * después de que el componente ha sido creado.
   */
  ngOnInit(): void {}

  /**
   * Cambia el slide actual al anterior en el carrusel.
   * Si el slide actual es el primero, se vuelve al último.
   */
  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.slides.length - 1 : this.currentIndex - 1;
  }

  /**
   * Cambia el slide actual al siguiente en el carrusel.
   * Si el slide actual es el último, se vuelve al primero.
   */
  nextSlide() {
    this.currentIndex = (this.currentIndex === this.slides.length - 1) ? 0 : this.currentIndex + 1;
  }
}
