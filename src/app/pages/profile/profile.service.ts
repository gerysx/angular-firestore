import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc, Timestamp, collection, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Profile } from './profile.interface';

/**
 * Servicio para gestionar el perfil del usuario en la base de datos de Firestore.
 * Este servicio permite obtener, crear y actualizar el perfil del usuario autenticado.
 */
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly _firestore = inject(Firestore);  // Inyectamos el servicio de Firestore para interactuar con la base de datos.
  private readonly _auth = inject(Auth);  // Inyectamos el servicio de autenticación para obtener el usuario autenticado.

  /**
   * Obtiene la referencia a la subcolección 'profile' del usuario autenticado en Firestore.
   * 
   * @throws Error Si el usuario no está autenticado.
   * @returns La referencia a la subcolección 'profile' del usuario.
   */
  private _getUserProfileCollection() {
    const user = this._auth.currentUser;  // Obtenemos el usuario autenticado.
    if (!user) throw new Error('Usuario no autenticado');  // Si no hay usuario autenticado, lanzamos un error.
    return collection(this._firestore, `users/${user.uid}/profile`);  // Retornamos la referencia a la subcolección 'profile' del usuario.
  }

  /**
   * Obtiene el perfil del usuario autenticado.
   * 
   * @returns El perfil del usuario o null si no existe.
   */
  async getProfile(): Promise<Profile | null> {
    const uid = this._auth.currentUser?.uid;  // Obtenemos el UID del usuario autenticado.
    if (!uid) return null;  // Si no hay usuario logueado, retornamos null.

    // Referencia al documento del perfil en la subcolección 'profile' del usuario.
    const docRef = doc(this._firestore, `users/${uid}/profile`, uid);  // Usamos el UID como ID del documento.
    const docSnap = await getDoc(docRef);  // Obtenemos el documento del perfil.

    if (docSnap.exists()) {
      return docSnap.data() as Profile;  // Si el perfil existe, lo retornamos.
    } else {
      return null;  // Si no existe el perfil, retornamos null.
    }
  }

  /**
   * Crea un perfil para el usuario autenticado si no existe.
   * 
   * @param profile El perfil a crear.
   * @returns Una promesa que se resuelve cuando el perfil se ha creado correctamente.
   */
  async createProfile(profile: Profile): Promise<void> {
    const uid = this._auth.currentUser?.uid;  // Obtenemos el UID del usuario autenticado.
    if (!uid) return;  // Si no hay usuario logueado, no hacemos nada.

    const docRef = doc(this._firestore, `users/${uid}/profile`, uid);  // Usamos el UID como ID del documento.

    // Verificamos si ya existe un perfil para este usuario.
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('El perfil ya existe, no se puede crear otro');
      return;  // Si ya existe, no hacemos nada.
    }

    // Si no existe el perfil, lo creamos.
    await setDoc(docRef, {
      ...profile,  // Copiamos los datos del perfil.
      created: Timestamp.now(),  // Asignamos la fecha de creación.
      updated: Timestamp.now(),  // Asignamos la fecha de actualización.
    });
  }

  /**
   * Actualiza el perfil del usuario autenticado.
   * 
   * @param profile El perfil con los datos actualizados.
   * @returns Una promesa que se resuelve cuando el perfil se ha actualizado correctamente.
   */
  async updateProfile(profile: Profile): Promise<void> {
    const uid = this._auth.currentUser?.uid;  // Obtenemos el UID del usuario autenticado.
    if (!uid) return;  // Si no hay usuario logueado, no hacemos nada.

    // Referencia al documento del perfil en la subcolección 'profile' del usuario.
    const docRef = doc(this._firestore, `users/${uid}/profile`, uid);  // Usamos el UID como ID del documento.

    // Actualizamos el documento con los nuevos datos.
    await updateDoc(docRef, {
      ...profile,  // Copiamos los datos del perfil actualizado.
      updated: Timestamp.now(),  // Actualizamos la fecha de actualización.
    });
  }
}
