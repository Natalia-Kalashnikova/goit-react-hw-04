import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery=({ items, onImageClick })=> {
  return (
    <div className={css.gallery}>
     <ul className={css.list}>
      {items.map(({ id, alt_description, urls, likes, user }) => (
        <li className={css.galleryItem} key={id} onClick={() => onImageClick(urls.regular, alt_description, user.name, likes)}>
          <ImageCard
            alt_description={alt_description}
            urls={urls}
            likes={likes}
            user={user}
          />
        </li>
      ))}
    </ul>
    </div>
  );
}

export default ImageGallery;



