import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useParams, useLocation } from 'react-router-dom';

const SearchResults = () => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const { searchQuery } = useParams();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const searchType = new URLSearchParams(location.search).get('searchType');

        let apiUrl = '';

        if (searchType === 'category') {
            // Use different API endpoint for category search
            apiUrl = `https://dummyjson.com/products/category/${searchQuery}`;
        } else {
            apiUrl = `https://dummyjson.com/products/search?q=${searchQuery}`;
        }

        axios.get(apiUrl)
            .then(response => {
                setSearchResults(response.data.products);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [searchQuery, location.search]);

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
                    <h1 className='display-6'>Search Results</h1>
                    <hr />
                    {loading ? (
                        <Loading />
                    ) : searchResults.length === 0 ? (
                        <div className="text-center mt-5">
                            <h3>No results to display</h3>
                            {/* You can add an image or additional styling here */}
                        </div>
                    ) : (
                        <div className="row justify-content-center">
                            {searchResults.map(item => (
                                <div key={item.id} className="col-3 mt-5">
                                    <Card className="my-custom-card">
                                        <Card.Img variant="top" style={{ height: '250px' }} src={item.thumbnail} />
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
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
