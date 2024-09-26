import { Product } from '../product';

export interface ProductAPI {
  statusCode: number;
  products: Product[];
}
