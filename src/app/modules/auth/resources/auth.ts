export interface User {
  id: string;
  username: string;
  email: string;
  isadmin: boolean;
}

export var UserModel: User = {
  id: null,
  username: null,
  email: null,
  isadmin: false,
};

export const storageKey = '[ngrx_shoppingapp] user_info';
