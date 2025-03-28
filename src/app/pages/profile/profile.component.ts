import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileId: string = '123abc'; // Esto debe ser dinámico o obtenerse desde la autenticación del usuario
  profile: Profile | null = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    // Inicializamos el formulario con validadores
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
    this.getProfile(); // Intentamos obtener el perfil desde Firestore cuando se carga el componente
  }

  getProfile(): void {
    this.profileService
      .getProfileById(this.profileId)
      .then((profile) => {
        if (profile) {
          this.profile = profile;
          this.profileForm.patchValue(profile); // Cargamos los valores en el formulario
        } else {
          this.profile = null; // No hay perfil, entonces estamos en modo de creación
        }
      })
      .catch((error) => {
        console.error('Error al obtener el perfil:', error);
      });
  }

  onSubmit(): void {
    const profileData = this.profileForm.value;
    if (this.profile) {
      // Si ya existe un perfil, lo actualizamos
      profileData.id = this.profile.id; // Aseguramos de incluir el ID
      this.updateProfile(profileData);
    } else {
      // Si no existe un perfil, lo creamos
      this.createProfile(profileData);
    }
  }

  createProfile(profileData: Profile): void {
    this.profileService
      .newProfile(profileData)
      .then((newProfile) => {
        console.log('Perfil creado correctamente:', newProfile);
      })
      .catch((error) => {
        console.error('Error al crear el perfil:', error);
      });
  }

  updateProfile(profileData: Profile): void {
    this.profileService
      .updateProfile(profileData.id, profileData)
      .then(() => {
        console.log('Perfil actualizado correctamente.');
      })
      .catch((error) => {
        console.error('Error al actualizar el perfil:', error);
      });
  }
}
