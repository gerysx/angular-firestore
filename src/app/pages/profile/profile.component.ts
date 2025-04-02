import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SnackBarService } from "@shared/services/snack-bar.service";
import { Profile } from "./profile.interface";
import { Component, OnInit } from "@angular/core";
import { ProfileService } from "./profile.service";
import { Router } from "@angular/router";  // Importamos Router para redirigir después del submit
import { Timestamp } from "@angular/fire/firestore";

/**
 * Componente para mostrar y gestionar el perfil del usuario.
 * Permite crear o actualizar el perfil dependiendo si el usuario tiene uno existente.
 */
@Component({
  selector: 'app-profile',  // Selector para el componente en el HTML
  standalone: true,  // Este componente es independiente
  imports: [ReactiveFormsModule],  // Importamos ReactiveFormsModule para trabajar con formularios reactivos
  templateUrl: './profile.component.html',  // Ruta del archivo HTML
  styleUrls: ['./profile.component.css']  // Ruta del archivo CSS
})
export class ProfileComponent implements OnInit {
  /**
   * Formulario reactivo que gestiona los datos del perfil.
   */
  profileForm!: FormGroup;

  /**
   * Contiene los datos del perfil del usuario.
   */
  profile: Profile | null = null;

  /**
   * Indica si el perfil es nuevo (cuando no existe en la base de datos).
   */
  isNewProfile: boolean = false;

  /**
   * Constructor del componente que inyecta los servicios necesarios.
   * 
   * @param _fb Servicio FormBuilder para crear el formulario reactivo
   * @param _profileService Servicio ProfileService para interactuar con los datos del perfil
   * @param _snackBar Servicio SnackBarService para mostrar mensajes emergentes
   * @param _router Servicio Router para redirigir a otras páginas
   */
  constructor(
    private _fb: FormBuilder,
    private _profileService: ProfileService,
    private _snackBar: SnackBarService,
    private _router: Router  // Agregamos el Router para redirigir después de guardar
  ) {}

  /**
   * Método de ciclo de vida que se ejecuta al inicializar el componente.
   * Carga el perfil existente si está disponible y construye el formulario reactivo.
   */
  ngOnInit(): void {
    this._loadProfile();  // Cargar el perfil al iniciar el componente
    this._buildForm();  // Construir el formulario
  }

  /**
   * Carga el perfil del usuario desde el servicio.
   * Si el perfil existe, se llena el formulario con los datos.
   * Si no existe, se marca como nuevo.
   */
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

  /**
   * Construye el formulario reactivo con las validaciones necesarias para cada campo.
   */
  private _buildForm(): void {
    this.profileForm = this._fb.group({
      nombre: ['', Validators.required],  // Nombre es obligatorio
      apellido: ['', Validators.required],  // Apellido es obligatorio
      movil: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Teléfono debe ser un número
      cod_postal: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Código postal debe ser un número
      ciudad: ['', Validators.required],  // Ciudad es obligatoria
      email: ['', [Validators.required, Validators.email]],  // Validación de email
      pais: ['', Validators.required]  // País es obligatorio
    });
  }

  /**
   * Método que maneja el envío del formulario.
   * Si el formulario es válido, se guarda el perfil. 
   * Si el perfil es nuevo, se crea, si ya existe, se actualiza.
   */
  async onSubmit() {
    if (this.profileForm.invalid) {
      this._snackBar.showSnackBar('Por favor, completa todos los campos.');
      return;
    }

    const profileData: Profile = {
      ...this.profileForm.value,  // Obtenemos los valores del formulario
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
