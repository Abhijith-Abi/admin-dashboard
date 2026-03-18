export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  age: number;
  gender: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
  company: {
    name: string;
    title: string;
    department: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
