import css from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => { 
  const handleClick = () => {
    onClick(image); 
  };
  
  return (    
    <img
      className={css.img}
      src={image.urls.small} 
      onClick={handleClick}
    />    
  );
}

export default ImageCard;

