import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import fetchImages from '../../apiService/image-api';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

// import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const appRef = useRef();
  
  useEffect(() => {
    if (!query) {
      return;
    }
    const getImages = async () => {
      setLoader(true);      
      try {
        setError(false);
        const data = await fetchImages(page, query);
          setImages((prevImages) => [...prevImages, ...data.results]);          
          setShowBtn(data.total_pages && data.total_pages !== page);        
      } catch (error) {
        setError(true);
        toast.error("Oops! Something went wrong. Please try again later...");
      } finally {
        setLoader(false);
      }
    };
    getImages();
  }, [query, page]);

  useEffect(() => {
    if (page === 1) return;
    appRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [images, page]);

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]); 
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (imageUrl, altDescription, authorName, likes) => {
    setSelectedImage({ imageUrl, altDescription, authorName, likes });
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  return (
    <div ref={appRef}>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openModal} />
      )}
      {error && <ErrorMessage />}      
      {loader && <Loader />}
      {images.length > 0 && !loader && showBtn && (
  <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageInfo={selectedImage}
      />
    </div>
  )
}

export default App;

