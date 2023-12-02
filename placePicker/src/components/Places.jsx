// Functional component Places
export default function Places({ title, places, fallbackText, onSelectPlace }) {
  return (
    // Section containing a category of places
    <section className="places-category">
      {/* Title for the category */}
      <h2>{title}</h2>

      {/* Render fallback text if there are no places */}
      {places.length === 0 && <p className='fallback-text'>{fallbackText}</p>}

      {/* Render places as a list if there are places */}
      {places.length > 0 && (
        <ul className="places">
          {/* Map through the places and render each place as a list item */}
          {places.map((place) => (
            <li key={place.id} className="place-item">
              {/* Button with an onClick handler to select the place */}
              <button onClick={() => onSelectPlace(place.id)}>
                {/* Image of the place */}
                <img src={place.image.src} alt={place.image.alt} />
                {/* Title of the place */}
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
