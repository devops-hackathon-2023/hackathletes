interface User {
  id: string;
  name: string;
  password: string;
  profilePicture: string;
  sases: Array<{
    id: string;
    name: string;
  }>;
}

export default User;
