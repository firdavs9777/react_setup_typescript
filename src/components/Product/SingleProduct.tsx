import React from "react";
import { Button, Card } from "react-bootstrap";
import { ProductType } from './ProductData'
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";


const SingleProduct: React.FC<ProductType> = ({ _id, name, description, price, image, brand, rating, countInStock, numReviews }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${_id}`}>
        <Card.Img variant="top" src={image} alt={name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as="div"><strong> {name}</strong></Card.Title>
          <Card.Text><strong>Brand:</strong> {brand}</Card.Text>
          <Card.Text>{description}</Card.Text>
          <Card.Text as="h3"><strong>Price:</strong> ${price}</Card.Text>
          <Card.Text><strong>In Stock:</strong> {countInStock}</Card.Text>
          <Card.Text as='div'>
            <Rating
              value={rating}
              text={`${numReviews} reviews`}
              color="#f8e825"
            />
          </Card.Text>
          <Button variant="primary" disabled={countInStock === 0}>Add to Cart</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
export default SingleProduct;