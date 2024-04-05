import { useEffect, useState } from 'react';

function ImageCarousel({ imageData }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (imageData && imageData.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex === imageData.length - 1 ? 0 : prevIndex + 1));
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [imageData]);

  if (!imageData || imageData.length === 0) {
    return null; // Render nothing if imageData is empty or undefined
  }

  return (
    <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {imageData.map((imageUrl, index) => (
          <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
            <img src={imageUrl} className="d-block w-100" alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="prev"
        onClick={() => setActiveIndex((prevIndex) => (prevIndex === 0 ? imageData.length - 1 : prevIndex - 1))}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="next"
        onClick={() => setActiveIndex((prevIndex) => (prevIndex === imageData.length - 1 ? 0 : prevIndex + 1))}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ImageCarousel;
