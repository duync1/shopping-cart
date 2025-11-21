export interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface User {
  id?: number;
  username: string;
  fullname: string;
  password: string;
}
