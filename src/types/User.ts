interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  profilePicture: string;
  favourites: any[];
}

export default User;
