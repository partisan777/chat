import BaseAPI from './BaseAPI';
import { userSearch, userUpdateProfile, updatePassword } from "./interfaces"

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public search(data: userSearch) {
    return this.http.post('/search', data);
  }

  public updateProfile(data: userUpdateProfile) {
    return this.http.put('/profile', data);
  }

  public updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  public updatePassword(data: updatePassword) {
    return this.http.put('/password', data);
  }
  public readUser() {
    return this.http.get('/user');
  };

  read = undefined;
  create = undefined;
  update = undefined;
  delete = undefined;
};


export default new UserAPI();


