export interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id?: number;
  email: string;
  fullname: string;
  password: string;
}
