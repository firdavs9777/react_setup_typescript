import product1Image from '../../assets/images/airpods.jpg'
import product2Image from '../../assets/images/alexa.jpg';
import product3Image from '../../assets/images/camera.jpg';
import product4Image from '../../assets/images/mouse.jpg'
import product5Image from '../../assets/images/phone.jpg'
import product6Image from '../../assets/images/playstation.jpg'


export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  brand: string;
  countInStock: number;
  rating: number;
  numReview: number;
}

export const products: ProductType[] = [
  {
    id: 1,
    name: 'Airpods Pro',
    description: 'Best Airpods in the world.',
    price: '200.00',
    imageUrl: product1Image,
     brand: 'Brand A',
    countInStock: 0,
    rating: 1.5,
    numReview: 20,
  },
  {
    id: 2,
    name: 'Alexa',
    description: 'Alexa is here on sale',
    price: '120.00',
    imageUrl: product2Image,
     brand: 'Brand A',
    countInStock: 5,
    rating: 2.5,
    numReview: 30,
  },
  {
    id: 3,
    name: 'Professional Camera',
    description: 'Pro Camera is only on our website',
    price: '500.00',
    imageUrl: product3Image,
     brand: 'Brand A',
    countInStock: 5,
    rating: 0.5,
    numReview: 40,
  },
    {
    id: 4,
    name: 'Mouse',
    description: 'Easy to use with any keyboard.',
    price: '30.00',
      imageUrl: product4Image,
     brand: 'Brand A',
    countInStock: 5,
    rating: 3.5,
    numReview: 50,
  },
  {
    id: 5,
    name: 'Phone',
    description: 'New Phone is on Sale',
    price: '1220.00',
    imageUrl: product5Image,
     brand: 'Brand A',
    countInStock: 5,
    rating: 1.5,
    numReview: 60,
  },
  {
    id: 6,
    name: 'Playstation',
    description: 'Try Playstation at home and enjoy your self time.',
    price: '30.00',
    imageUrl: product6Image, 
     brand: 'Brand A',
    countInStock: 5,
    rating: 2.5,
    numReview: 10,
  }
];