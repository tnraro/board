export interface IOrderCard {
  id: string;
  name: string;
  /**
   * image url
   */
  image: string;
  description: string;
  requires: string[];
  grade: number;
}