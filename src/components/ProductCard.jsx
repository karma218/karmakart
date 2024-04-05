import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, onUpdateQuantity, onDelete, smallSize }) => {
  const { id, title, price, quantity, thumbnail } = product;

  return (
    <Card className={`product-card ${smallSize ? 'small' : ''}`}>
      <div className="card-img-container">
        <Card.Img variant="top" src={thumbnail} />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Price: ${price}</Card.Text>
        <Card.Text>Quantity: {quantity}</Card.Text>
        <Button variant="outline-primary" size="sm" onClick={() => onUpdateQuantity(id, quantity - 1)}>-</Button>
        <Button variant="outline-primary" size="sm" onClick={() => onUpdateQuantity(id, quantity + 1)}>+</Button>
        <Button variant="danger" onClick={() => onDelete(id)}>Remove</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
