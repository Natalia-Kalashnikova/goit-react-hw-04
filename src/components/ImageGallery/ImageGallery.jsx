import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div className={css.gallery}>
      <ul className={css.list}>
        {images.map(image => (
          <li className={css.galleryItem} key={image.id}>
            <ImageCard
              image={image}
              onClick={onImageClick}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageGallery;

//Приклад додавання кастомного Ref

// import { forwardRef } from 'react';
// import css from "./ImageGallery.module.css";
// import ImageCard from "../ImageCard/ImageCard";

// // Використання forwardRef для передачі ref внутрішньому DOM-елементу
// const ImageGallery = forwardRef(({ images, onImageClick }, ref) => {
//   return (
//     <div className={css.gallery}>
//        <ul ref={ref} className={css.list}>
//          {images.map(image => (
//            <li className={css.galleryItem} key={image.id}>
//              <ImageCard
//                image={image}
//                onClick={onImageClick}
//             />
//           </li>
//          ))}
//        </ul>
//      </div>
//    );
// });

// // Додавання displayName до компонента для уникнення помилки
// ImageGallery.displayName = 'ImageGallery';

// export default ImageGallery;
