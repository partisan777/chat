import API, { UserAPI } from '../api/UserAPI';
import { userUpdateProfile, updatePassword, userSearch } from '../api/interfaces';

class UserController {
  private readonly api: UserAPI;
  constructor() {
    this.api = API;
  }

  async updateProfile(data: userUpdateProfile) {
    try {
      await this.api.updateProfile(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      // console.log(data);
      await this.api.updateAvatar(data);
    } catch (e: any) {
      console.error(e);
    }
    
  }
  
  async updatePassword(data: updatePassword) {
    try {
      // console.log(data);
      await this.api.updatePassword(data);
    } catch (e: any) {
      console.error(e);
    }
    
  }
  async search(data: userSearch) {
    try {
      await this.api.search(data);
    } catch (e: any) {
      console.error(e);
    }
    
  }
}

export default new UserController();

