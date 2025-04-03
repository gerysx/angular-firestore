import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './profile.service';  // Servicio para obtener y actualizar el perfil
import { Profile } from './profile.interface';  // Interfaz para el perfil
import { CommonModule } from '@angular/common';

/**
 * Componente para la visualización y actualización del perfil de usuario.
 */
@Component({
  selector: 'app-profile',
  standalone: true, 
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  /**
   * El formulario reactivo para editar los datos del perfil.
   */
  profileForm!: FormGroup;
  /**
   * Bandera para verificar si el perfil es nuevo.
   */
  isNewProfile: boolean = true;
 
  /**
   * El perfil del usuario.
   */
  profile: Profile | null = null;


  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,  // Inyección del servicio de perfil

  ) {}

  /**
   * Inicializa el formulario de perfil y carga la información del perfil si existe.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.loadProfile();
  }

  /**
   * Inicializa el formulario con los campos correspondientes.
   */
  initializeForm(): void {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      movil: ['', Validators.required],
      cod_postal: ['', Validators.required],
      ciudad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pais: ['', Validators.required],
    });
  }

  /**
   * Carga los datos del perfil desde el servicio.
   */
  async loadProfile(): Promise<void> {
    this.profile = await this.profileService.getProfile();
    if (this.profile) {
      this.profileForm.patchValue(this.profile);  // Llenar el formulario con los datos del perfil
      this.isNewProfile = false;  // El perfil ya existe
    }
  }

  /**
   * Maneja el envío del formulario de perfil.
   */
  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) {
      return;
    }

    const profileData = this.profileForm.value;

    if (this.isNewProfile) {
      await this.profileService.createOrUpdateProfile(profileData);  // Crear o actualizar el perfil
    } else {
      await this.profileService.createOrUpdateProfile(profileData);  // Actualizar el perfil
    }
  }

 
}
