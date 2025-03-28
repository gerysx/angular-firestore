import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "@components/toolbar/toolbar.component";
import {MatCardModule} from '@angular/material/card';
import {ModalService} from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@components/footer/footer.component';

const MATERIAL_MODULES = [MatCardModule, MatProgressSpinnerModule]
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, MATERIAL_MODULES, CommonModule, FooterComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  private readonly _modalSvc = inject(ModalService);

  onClickNewContact(): void{
    this._modalSvc.openModal<ModalComponent>(ModalComponent);
  }
}
