import API, { AuthAPI } from '../api/AuthAPI';
import store from '../models/components/store';
import Router from '../models/components/router';
import { SigninData, SignupData } from "../api/interfaces"

export class AuthController {
  private readonly api: AuthAPI;
  constructor() {
    this.api = API;
  }
  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      Router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }
  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      Router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }
  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }
  async logout() {
    try {
      await this.api.logout();
      Router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();

