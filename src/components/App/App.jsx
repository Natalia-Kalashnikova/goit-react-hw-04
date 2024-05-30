import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import fetchImages from '../../apiService/image-api';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEmpty, setEmpty] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const appRef = useRef();
  
  useEffect(() => {
    if (!query) {
      return;
    }
    const getImages = async () => {
      setLoader(true);
      try {
        const newImages = await fetchImages(page, query);
        if (!newImages.length) {
          setEmpty(true);
        } else {
          setEmpty(false);
          setImages((prevImages) => [...prevImages, ...newImages]);
          setVisible(page > 0);
          setTotalPages(newImages.total_pages);
        }
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
    setEmpty(false);
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
      {isEmpty && <p>Sorry. There are no images ... 😭</p>}
      {loader && <Loader />}
      {!loader && isVisible && !isEmpty && (!totalPages || page < totalPages) && (
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

