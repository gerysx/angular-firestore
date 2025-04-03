import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc, Timestamp } from '@angular/fire/firestore';
import { Profile } from './profile.interface';
import { AuthService } from '../auth/data-access/auth.service';
import { inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

/**
 * Servicio para gestionar el perfil del usuario en la base de datos de Firestore y almacenamiento de imágenes.
 * Este servicio permite obtener, crear, actualizar el perfil del usuario y gestionar las imágenes de perfil.
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _firestore = inject(Firestore);  // Instancia de Firestore
  private _authService = inject(AuthService);  // Instancia de AuthService para obtener el UID del usuario
  private _storage = inject(Storage);  // Instancia de Storage para gestionar imágenes en Firebase Storage

  /**
   * Obtiene el perfil del usuario autenticado.
   * Si el perfil no existe, lo crea con valores predeterminados.
   */
  async getProfile(): Promise<Profile | null> {
    const uid = this._authService.getUserUid();
    if (!uid) {
      console.error('No user UID found.');
      return null;
    }

    const profileRef = doc(this._firestore, 'users', uid);
    const docSnap = await getDoc(profileRef);

    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    } else {
      console.error('No profile found for user:', uid);
      return null;
    }
  }

  /**
   * Crea o actualiza el perfil del usuario autenticado en Firestore.
   * Si el perfil ya existe, lo actualiza; si no, lo crea.
   * @param profile El perfil con los datos que deben ser guardados o actualizados.
   */
  async createOrUpdateProfile(profile: Profile): Promise<void> {
    const uid = this._authService.getUserUid();
    if (!uid) return;  // Si no hay usuario autenticado, no hacemos nada

    const userRef = doc(this._firestore, 'users', uid);

    // Actualizamos o creamos el perfil
    const existingProfile = await getDoc(userRef);
    if (existingProfile.exists()) {
      // Si el perfil ya existe, lo actualizamos
      await updateDoc(userRef, { ...profile, updated: Timestamp.now() });
    } else {
      // Si el perfil no existe, lo creamos
      await setDoc(userRef, { ...profile, created: Timestamp.now(), updated: Timestamp.now() });
    }
  }

}
