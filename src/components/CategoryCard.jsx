import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryCard = ({ product, filterFunction, smallSize }) => {
  const { title, thumbnail } = product;

  return (
    <Card className={`product-card ${smallSize ? 'small' : ''}`}>
      <Link to={`/products/${filterFunction}`} style={{ textDecoration: 'none' }}>
        <div className="card-img-container">
          <Card.Img variant="top" src={thumbnail} />
        </div>
        <Card.Body>
          <Card.Title style={{ height: '3rem', overflow: 'hidden' }}>{title}</Card.Title>
          {!smallSize && (
            <Button variant="primary">Show Products</Button>
          )}
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CategoryCard;
