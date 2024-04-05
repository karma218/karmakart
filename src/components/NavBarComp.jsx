import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import searchlogo from "./search.jpeg";

const NavBarComp = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('name');
    const getData = useSelector((state) => state.cartReducer.carts);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            // Navigate to search results with search query and search type as parameters
            navigate(`/search-results/${searchQuery}?searchType=${searchType}`);
            setSearchQuery('');
        }
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
    };

    return (
        <div>
            <Navbar bg="light" variant="light" className='shadow-sm bg-white py-4 '>
                <Container>
                    <Link style={{ textDecoration: 'none' }} to='/'> 
                        <Navbar.Brand className='fw-bold fs-2'>KarmaKart</Navbar.Brand>
                    </Link>
                    <Nav className="me-auto">
                        <Link className='nav-link nav-link-ltr' to="/">Home</Link>
                        <Link className='nav-link nav-link-ltr' to='/products'>Products</Link>
                    </Nav>
                    <div className="d-flex align-items-center">
                        <Dropdown className="me-3">
                            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                {searchType === 'name' ? 'Name Search' : 'Category Search'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSearchTypeChange('name')}>Name Search</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSearchTypeChange('category')}>Category Search</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <form onSubmit={handleSearchSubmit} className="d-flex me-3">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <img src={searchlogo} alt="Logo" className="search-logo" onClick={handleSearchSubmit} />
                        </form>
                        <Link to="/cart">
                            <Button variant="outline-dark" className='me-2'>
                                <i className='fa fa-shopping-cart me-2'></i>
                                {getData.length}
                            </Button>
                        </Link>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBarComp;
