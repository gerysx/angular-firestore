import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);

  // Usamos signal() para manejar el estado del usuario
  user = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(this._auth, (user) => {
      this.user.set(user);  // Actualizamos la señal
    });
  }

  async signUp(user: { email: string; password: string }) {
    const userCredential = await createUserWithEmailAndPassword(this._auth, user.email, user.password);
    this.user.set(userCredential.user);  // Actualizamos la señal
    return userCredential;
  }

  async signIn(user: { email: string; password: string }) {
    const userCredential = await signInWithEmailAndPassword(this._auth, user.email, user.password);
    this.user.set(userCredential.user);  // Actualizamos la señal
    return userCredential;
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this._auth, provider);
    this.user.set(userCredential.user);  // Actualizamos la señal
    return userCredential;
  }

  async logout() {
    await signOut(this._auth);
    this.user.set(null);  // Limpiamos la señal
  }

  // Exposición de la señal de usuario
  getUser() {
    return this.user();  // Accedemos al valor actual de la señal
  }
}
