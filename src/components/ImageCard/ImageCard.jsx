import css from "./ImageCard.module.css";

const ImageCard=({
  alt_description,
  urls,
}) =>{
  return (    
      <img className={css.img} src={urls.small} alt={alt_description} />    
  );
}

export default ImageCard;

