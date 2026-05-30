function Card({ name, imgSrc, years, profession, country }) {
  return (
    <div className="Card">
      <h2>{name}</h2>
      <img src={imgSrc} alt={name} />
      <p>{years}</p>
      <p>{profession}</p>
      <p>{country}</p>
    </div>
  );
}

export default Card;
