import { useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';
import fetchImages from '../../apiService/image-api';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
    
  useEffect(() => {
    if (!query) {
      return;
    }
    const getImages = async () => {
      setLoader(true);
      try {
        setError(false);
        const data = await fetchImages(page, query);
        if (data.results.length === 0) {
          toast.error("Sorry. There are no images ... 😭");
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]);
          setShowBtn(data.total_pages && data.total_pages !== page);
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

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
     setSelectedImage(null);
  }

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {error && <ErrorMessage />}
      {loader && <Loader />}
      {images.length > 0 && !loader && showBtn && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          regular={selectedImage.urls.regular}
          altDescription={selectedImage.description}
          likes={selectedImage.likes}
          user={selectedImage.user.name}
        />
      )}
    </div>
  )
}

export default App;

//Приклад використання useRef (додавання скроллу)

// import { useState, useEffect, useRef } from 'react';
// import { toast } from 'react-hot-toast';
// import fetchImages from '../../apiService/image-api';

// import SearchBar from '../SearchBar/SearchBar';
// import Loader from '../Loader/Loader';
// import ImageGallery from '../ImageGallery/ImageGallery';
// import ImageModal from '../ImageModal/ImageModal';
// import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';

// const App = () => {
//   const [images, setImages] = useState([]);
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [loader, setLoader] = useState(false);
//   const [error, setError] = useState(false);
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showBtn, setShowBtn] = useState(false);
//   const appRef = useRef();
  
//   useEffect(() => {
//     if (!query) {
//       return;
//     }
//     const getImages = async () => {
//       setLoader(true);
//       try {
//         setError(false);
//         const data = await fetchImages(page, query);
//         if (data.results.length === 0) {
//           toast.error("Sorry. There are no images ... 😭");
//         } else {
//           setImages((prevImages) => [...prevImages, ...data.results]);
//           setShowBtn(data.total_pages && data.total_pages !== page);
//         }
//       } catch (error) {
//         setError(true);
//         toast.error("Oops! Something went wrong. Please try again later...");
//       } finally {
//         setLoader(false);
//       }
//     };
//     getImages();
//   }, [query, page]);

//   useEffect(() => {
//     if (page === 1) return;
//     appRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
//   }, [images, page]);

//   const handleSubmit = (query) => {
//     setQuery(query);
//     setPage(1);
//     setImages([]);
//   };

//   const handleLoadMore = () => {
//     setPage(page + 1);
//   };

//   const openModal = (image) => {
//     setSelectedImage(image);
//     setIsOpen(true);
//   }

//   const closeModal = () => {
//     setIsOpen(false);
//      setSelectedImage(null);
//   }

//   return (
//     <div ref={appRef}>
//       <SearchBar onSubmit={handleSubmit} />
//       {images.length > 0 && (
//         <ImageGallery images={images} onImageClick={openModal} />
//       )}
//       {error && <ErrorMessage />}
//       {loader && <Loader />}
//       {images.length > 0 && !loader && showBtn && (
//         <LoadMoreBtn onClick={handleLoadMore} />
//       )}
//       {selectedImage && (
//         <ImageModal
//           isOpen={modalIsOpen}
//           onClose={closeModal}
//           regular={selectedImage.urls.regular}
//           altDescription={selectedImage.description}
//           likes={selectedImage.likes}
//           user={selectedImage.user.name}
//         />
//       )}
//     </div>
//   )
// }

// export default App;

//Приклад використання кастомного Ref

// import { useState, useEffect, useRef } from 'react';
// import { toast } from 'react-hot-toast';
// import fetchImages from '../../apiService/image-api';

// import SearchBar from '../SearchBar/SearchBar';
// import Loader from '../Loader/Loader';
// import ImageGallery from '../ImageGallery/ImageGallery';
// import ImageModal from '../ImageModal/ImageModal';
// import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';

// const App = () => {
//   const [images, setImages] = useState([]);
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [loader, setLoader] = useState(false);
//   const [error, setError] = useState(false);
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showBtn, setShowBtn] = useState(false);
//   const appRef = useRef();
//   const galleryRef = useRef(); // Додано реф для галереї
  
//   useEffect(() => {
//     if (!query) {
//       return;
//     }
//     const getImages = async () => {
//       setLoader(true);
//       try {
//         setError(false);
//         const data = await fetchImages(page, query);
//         if (data.results.length === 0) {
//           toast.error("Sorry. There are no images ... 😭");
//         } else {
//           setImages((prevImages) => [...prevImages, ...data.results]);
//           setShowBtn(data.total_pages && data.total_pages !== page);
//         }
//       } catch (error) {
//         setError(true);
//         toast.error("Oops! Something went wrong. Please try again later...");
//       } finally {
//         setLoader(false);
//       }
//     };
//     getImages();
//   }, [query, page]);

//   useEffect(() => {
//     if (page === 1) return;
//     // Отримання висоти картки галереї
//     const cardHeight = galleryRef.current?.firstElementChild?.getBoundingClientRect().height;
//     if (cardHeight) {
//       // Плавне прокручування через розбивку на менші кроки
//       let totalScroll = cardHeight * 2;
//       let currentScroll = 0;
//       let scrollStep = totalScroll / 20; // Кількість кроків прокрутки
//       let scrollInterval = 10; // Інтервал між кроками в мілісекундах

//       const smoothScroll = () => {
//         if (currentScroll < totalScroll) {
//           window.scrollBy(0, scrollStep);
//           currentScroll += scrollStep;
//           setTimeout(smoothScroll, scrollInterval);
//         }
//       };
//       smoothScroll();
//     }
//   }, [images, page]);

//   const handleSubmit = (query) => {
//     setQuery(query);
//     setPage(1);
//     setImages([]);
//   };

//   const handleLoadMore = () => {
//     setPage(page + 1);
//   };

//   const openModal = (image) => {
//     setSelectedImage(image);
//     setIsOpen(true);
//   }

//   const closeModal = () => {
//     setIsOpen(false);
//      setSelectedImage(null);
//   }

//   return (
//     <div ref={appRef}>
//       <SearchBar onSubmit={handleSubmit} />
//       {images.length > 0 && (
//         <ImageGallery ref={galleryRef} images={images} onImageClick={openModal} />
//       )}
//       {error && <ErrorMessage />}
//       {loader && <Loader />}
//       {images.length > 0 && !loader && showBtn && (
//         <LoadMoreBtn onClick={handleLoadMore} />
//       )}
//       {selectedImage && (
//         <ImageModal
//           isOpen={modalIsOpen}
//           onClose={closeModal}
//           regular={selectedImage.urls.regular}
//           altDescription={selectedImage.description}
//           likes={selectedImage.likes}
//           user={selectedImage.user.name}
//         />
//       )}
//     </div>
//   )
// }

// export default App;


