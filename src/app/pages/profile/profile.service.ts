import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc, updateDoc, DocumentReference, Timestamp } from '@angular/fire/firestore';
import { AuthService } from '../auth/data-access/auth.service';
import { Profile } from './profile.interface';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly _firestore = inject(Firestore);
  private authService = inject(AuthService);

  // Obtener la referencia al documento 'userProfile' dentro de la subcolección 'profile'
  private _getProfileDoc(userId: string) {
    return doc(this._firestore, 'users', userId, 'profile', 'userProfile');
  }

  // Crear o actualizar el perfil (solo uno por usuario)
  async createOrUpdateProfile(profile: Profile): Promise<Profile> {
    try {
      const user = this.authService.getUser();
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
      const userId = user.uid; // Obtenemos el uid del usuario autenticado

      // Aseguramos que el perfil tenga las fechas creadas y actualizadas
      const profileWithDates: Profile = {
        ...profile,
        created: profile.created instanceof Timestamp ? profile.created : Timestamp.now(),
        updated: profile.updated instanceof Timestamp ? profile.updated : Timestamp.now(),
      };

      const docRef = this._getProfileDoc(userId);
      const docSnapshot = await getDoc(docRef);

      const profileData = this.convertProfileToFirestoreFormat(profileWithDates);

      if (docSnapshot.exists()) {
        // Si ya existe el perfil, lo actualizamos
        await updateDoc(docRef, profileData);
        console.log('Perfil actualizado correctamente.');
      } else {
        // Si no existe el perfil, lo creamos
        await setDoc(docRef, profileData);
        console.log('Perfil creado correctamente.');
      }

      // Asegurarnos de devolver el perfil completo con el id generado
      return { ...profileWithDates, id: 'userProfile' }; // Asignamos 'userProfile' como ID
    } catch (error) {
      console.error('Error al crear o actualizar perfil:', error);
      throw error;
    }
  }

  // Convertir Profile a un objeto con el formato adecuado para Firestore
  private convertProfileToFirestoreFormat(profile: Profile): { [key: string]: any } {
    const { created, updated, ...profileData } = profile;
    return {
      ...profileData,
      created: created instanceof Timestamp ? created : Timestamp.now(),
      updated: updated instanceof Timestamp ? updated : Timestamp.now(),
    };
  }

  // Obtener el perfil del usuario
  async getProfile(): Promise<Profile | null> {
    const user = this.authService.getUser();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    const userId = user.uid; // Obtenemos el uid del usuario autenticado

    const docRef = this._getProfileDoc(userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const profile = docSnapshot.data() as Profile;
      return { ...profile, id: 'userProfile' }; // Incluimos el id de 'userProfile' aquí
    } else {
      return null; // Si no existe el perfil, devolvemos null
    }
  }
}
