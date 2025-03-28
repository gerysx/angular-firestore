import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentIndex: number = 0;

  slides = [
    {
      image: 'https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      title: 'Tecnología'
    },
    {
      image: 'https://images.pexels.com/photos/7574366/pexels-photo-7574366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      title: 'Automatización'
    },
    {
      image: 'https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      title: 'Soluciones'
    }
  ];
  

  constructor() {}

  ngOnInit(): void {}

  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.slides.length - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex === this.slides.length - 1) ? 0 : this.currentIndex + 1;
  }
}
