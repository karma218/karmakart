import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import ImageCarousel from './ImageCarousel';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { addToCart} from '../redux/actions/action';


const Product = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const send = (item) => {
        dispatch(addToCart(item))
        alert("Item added successfully")
    }
    useEffect(() => {
        setLoading(true)
        axios.get(`https://dummyjson.com/products/${id}`)
        .then(response => {
            console.log(response.data)
            setProduct(response.data)
            setLoading(false)
        })
        .catch(error => {
            // Handle any errors
            console.error('Error fetching data:', error);
        });
    }, [])
    const Loading = () => {
        return (
            <>
                 <div className="mt-4 ">
                    <Spinner animation="grow" size='sm' />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" size='sm' />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" size='sm'/>
                    <Spinner animation="grow" />
                    <Spinner animation="grow" size='sm'/>
                </div>
            </>
        )
    }
    const ShowProduct = () => {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mt-5">
                            <ImageCarousel imageData={product.images} />
                        </div>
                        <div className="col-lg-6 mt-5">
                            <h4 className='text-uppercase'>{product.category}</h4>
                            <h1 className='display-5'>{product.title}</h1>
                            <p className='fw-bolder'>Rating {product.rating}&#x2605;</p>
                            <h3>$ {product.price}</h3>
                            <p>{product.description}</p>
                            <Button onClick={() => send(product)} variant="dark">Add to Cart</Button>
                            <Link to="/cart"> {/* Navigate to Cart page on click */}
                                <Button className='ms-3' variant="dark">Go to Cart</Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    return (
        <div>
            <div className="container">
                {loading ? <Loading /> : <ShowProduct />}
            </div>
        </div>
    )
}

export default Product