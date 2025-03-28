import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile: Profile | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      cod_postal: [
        0,
        [Validators.required, Validators.min(1000), Validators.max(99999)],
      ],
      ciudad: ['', [Validators.required, Validators.minLength(3)]],
      movil: [0, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      pais: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.getProfile();
    } else {
      console.error('Usuario no autenticado');
    }
  }

  // Obtener el perfil del usuario desde Firestore
  getProfile(): void {
    this.profileService.getProfile().then((profile) => {
      if (profile) {
        this.profile = profile;
        this.profileForm.patchValue(profile); // Cargar los datos del perfil al formulario
      } else {
        this.profile = null; // Si no hay perfil, mostramos un formulario vacío
      }
    }).catch((error) => {
      console.error('Error al obtener el perfil:', error);
    });
  }

  // Crear o actualizar el perfil
  onSubmit(): void {
    const profileData = this.profileForm.value;

    this.profileService.createOrUpdateProfile(profileData)
      .then((updatedProfile) => {
        console.log('Perfil actualizado o creado correctamente:', updatedProfile);
        this.router.navigate(['/contacts']);  // Redirigir a /contacts
      })
      .catch((error) => {
        console.error('Error al crear o actualizar el perfil:', error);
      });
  }
}
