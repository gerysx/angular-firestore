import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SnackBarService } from "@shared/services/snack-bar.service";
import { Profile } from "./profile.interface";
import { Component, OnInit } from "@angular/core";
import { ProfileService } from "./profile.service";
import { Router } from "@angular/router";  // Importamos Router para redirigir después del submit
import { Timestamp } from "@angular/fire/firestore";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profile: Profile | null = null;
  isNewProfile: boolean = false;  // Variable para saber si el perfil es nuevo o no

  constructor(
    private _fb: FormBuilder,
    private _profileService: ProfileService,
    private _snackBar: SnackBarService,
    private _router: Router  // Agregamos el Router para redirigir después de guardar
  ) {}

  ngOnInit(): void {
    this._loadProfile();  // Cargar el perfil al iniciar el componente
    this._buildForm();  // Construir el formulario
  }

  // Método para cargar el perfil desde el servicio
  private async _loadProfile() {
    this.profile = await this._profileService.getProfile();  // Obtenemos el perfil del servicio

    if (this.profile) {
      // Si el perfil existe, cargamos sus datos en el formulario
      this.isNewProfile = false;
      this.profileForm.patchValue(this.profile);
    } else {
      // Si no existe el perfil, lo consideramos como nuevo
      this.isNewProfile = true;
    }
  }

  // Método para construir el formulario reactivo
  private _buildForm(): void {
    this.profileForm = this._fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      movil: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Aseguramos que sea un número
      cod_postal: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Aseguramos que sea un número
      ciudad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],  // Validación de email
      pais: ['', Validators.required]
    });
  }

  // Método para manejar el submit del formulario
  async onSubmit() {
    if (this.profileForm.invalid) {
      this._snackBar.showSnackBar('Por favor, completa todos los campos.');
      return;
    }

    const profileData: Profile = {
      ...this.profileForm.value,
      created: this.isNewProfile ? Timestamp.now() : this.profile!.created,  // Si es nuevo, asignamos la fecha actual
      updated: Timestamp.now()  // Siempre actualizamos la fecha de modificación
    };

    try {
      if (this.isNewProfile) {
        // Si es un perfil nuevo, lo creamos
        await this._profileService.createProfile(profileData);
        this._snackBar.showSnackBar('Perfil creado correctamente');
      } else {
        // Si el perfil ya existe, lo actualizamos
        await this._profileService.updateProfile(profileData);
        this._snackBar.showSnackBar('Perfil actualizado correctamente');
      }
      
      // Redirigir a la página de contactos después de crear o actualizar
      this._router.navigate(['/contacts']);
    } catch (error) {
      console.error('Error al crear o actualizar el perfil', error);
      this._snackBar.showSnackBar('Error al crear o actualizar el perfil.');
    }
  }
}
