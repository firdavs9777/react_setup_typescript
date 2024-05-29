import React from "react";
import { Button, Card } from "react-bootstrap";
import { Product } from './ProductList'


const SingleProduct: React.FC<Product> = ({id,name,description,price, imageUrl,brand,rating, countInStock,numReview}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img variant="top" src={imageUrl} alt={name} />
   <Card.Body>
        <Card.Title><strong> {name}</strong></Card.Title>
        <Card.Text><strong>Brand:</strong> {brand}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Card.Text><strong>Price:</strong> ${parseFloat(price).toFixed(2)}</Card.Text>
        {/* <Card.Text><strong>In Stock:</strong> {countInStock}</Card.Text>
        <Card.Text><strong>Rating:</strong> {rating} ({numReview} reviews)</Card.Text>
        <Button variant="primary" disabled={countInStock === 0}>Add to Cart</Button> */}
      </Card.Body>
    </Card>
  )
}
export default SingleProduct;