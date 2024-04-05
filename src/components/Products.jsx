import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Products = ({ searchQuery }) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchQuery]);

    const getProducts = () => {
        setLoading(true);
        axios.get('https://dummyjson.com/products')
            .then(response => {
                setData(response.data.products);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }

    const filterProducts = () => {
        if (!searchQuery) {
            setFilter(data);
        } else {
            const filteredItems = data.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilter(filteredItems);
        }
    }

    const filterProduct = (cat) => {
        if (cat === "all") {
            setFilter(data);
        } else {
            const updatedItems = data.filter((item) => item.category === cat);
            setFilter(updatedItems);
        }
    }

    const Loading = () => (
        <div className="mt-4">
            <Spinner animation="grow" size='sm' />
            <Spinner animation="grow" />
            <Spinner animation="grow" size='sm' />
            <Spinner animation="grow" />
            <Spinner animation="grow" size='sm' />
            <Spinner animation="grow" />
            <Spinner animation="grow" size='sm' />
        </div>
    );

    return (
        <div className="container mt-5 pb-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex justify-content-center mb-3">
                        <Button variant="dark" onClick={() => filterProduct("all")} className="mx-2">All Products</Button>
                        <Button variant="dark" onClick={() => filterProduct("smartphones")} className="mx-2">Smart Phones</Button>
                        <Button variant="dark" onClick={() => filterProduct("laptops")} className="mx-2">Laptops</Button>
                        <Button variant="dark" onClick={() => filterProduct("fragrances")} className="mx-2">Fragrances</Button>
                        <Button variant="dark" onClick={() => filterProduct("skincare")} className="mx-2">Skincare</Button>
                        <Button variant="dark" onClick={() => filterProduct("groceries")} className="mx-2">Groceries</Button>
                        <Button variant="dark" onClick={() => filterProduct("home-decoration")} className="mx-2">Home Decor</Button>
                    </div>
                    <hr />
                    <div className="row justify-content-center">
                        {loading ? <Loading /> :
                            filter.map(item => (
                                <div key={item.id} className="col-2 mt-3">
                                    <Card className="my-custom-card">
                                        <Card.Img variant="top" style={{ height: '100px' }} src={item.thumbnail} />
                                        <Card.Body>
                                            <Card.Title>{item.title.substring(0, 12)}</Card.Title>
                                            <Card.Text className='fw-bold'>
                                                $ {item.price}
                                            </Card.Text>
                                            <Link to={`/products/${item.id}`}>
                                                <Button variant="dark">Buy Now</Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
