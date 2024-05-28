import css from "./ImageCard.module.css";

export default function ImageCard({
  alt_description,
  urls,
}) {
  return (
    <div className={css.container}>
      <img className={css.img} src={urls.small} alt={alt_description} />
    </div>
  );
}