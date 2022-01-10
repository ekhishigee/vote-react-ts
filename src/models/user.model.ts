export class User {
  id: number;
  name: string;
  email: string;
  roles: string;

  constructor(id: number, name: string, email: string, roles: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
  }
}
