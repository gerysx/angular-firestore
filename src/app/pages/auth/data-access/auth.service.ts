import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
  updatePassword
} from '@angular/fire/auth';

import { signal } from '@angular/core';
import { doc, Firestore, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);

  // Signal para manejar el estado del usuario
  user = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(this._auth, async (user) => {
      this.user.set(user); // Actualizamos la señal
      if (user) {
        await this.ensureUserDocumentExists(user.uid);
      }
    });
  }

  async signUp(user: { email: string; password: string }) {
    const userCredential = await createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
    this.user.set(userCredential.user); // Actualizamos la señal

    // Crear documento si no existe
    await this.ensureUserDocumentExists(userCredential.user.uid);

    return userCredential;
  }

  async signIn(user: { email: string; password: string }) {
    const userCredential = await signInWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
    this.user.set(userCredential.user); // Actualizamos la señal

    // Asegurar que el documento del usuario existe
    await this.ensureUserDocumentExists(userCredential.user.uid);

    return userCredential;
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this._auth, provider);
    this.user.set(userCredential.user); // Actualizamos la señal

    // Asegurar que el documento del usuario existe
    await this.ensureUserDocumentExists(userCredential.user.uid);

    return userCredential;
  }

  async logout() {
    await signOut(this._auth);
    this.user.set(null); // Limpiamos la señal
  }

  getUser() {
    return this.user(); // Accedemos al valor actual de la señal
  }

  getUserUid(): string | null {
    return this.user()?.uid ?? null; // Retorna el UID o null si no está disponible
  }

  /**
   * Asegura que el documento del usuario existe en Firestore.
   * Si no existe, lo crea automáticamente con el UID como ID.
   */
  async ensureUserDocumentExists(uid: string) {
    const userRef = doc(this._firestore, 'users', uid);

    try {
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // Si el documento no existe, lo creamos vacío
        await setDoc(userRef, {});
        console.log(`Documento creado para el usuario con ID: ${uid}`);
      }
    } catch (error) {
      console.error('Error al verificar o crear el documento:', error);
    }
  }

  /**
   * Cambia la contraseña del usuario autenticado.
   * @param newPassword La nueva contraseña.
   */
  async changePassword(newPassword: string): Promise<void> {
    const user = this._auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        console.log('Contraseña actualizada correctamente');
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        throw error;
      }
    } else {
      throw new Error('No hay usuario autenticado');
    }
  }
}