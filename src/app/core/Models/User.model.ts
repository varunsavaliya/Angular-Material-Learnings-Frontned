export class User {
    userId: number;
    username: string;
    dob: Date | null;
    address: string;
    password: string;
  
    constructor(userId: number, username: string, dob: Date, address: string, password: string) {
      this.userId = userId;
      this.username = username;
      this.dob = dob;
      this.address = address; 
      this.password = password;
    }
  }
  