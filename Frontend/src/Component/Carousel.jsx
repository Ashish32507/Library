import { useState, useEffect } from "react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://img.freepik.com/premium-photo/stack-books-library_391052-28531.jpg",
    "https://res.cloudinary.com/jerrick/image/upload/v1684070078/6460debb1e2b6a001d347dd2.jpg",
    "https://thumbnails.production.thenounproject.com/9ypE4xlNlyzXJujslod5fY0ieOg=/fit-in/0x450/photos.production.thenounproject.com/photos/collections_of_books_in_wooden_shelves-scopio-dee39bdb-c408-4177-a8a1-b7b08332aed3.jpg",
  ];

  // Move to the next image automatically every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="relative max-w-5xl mx-auto mt-5 overflow-hidden rounded-lg">
      <div
        className="relative w-full h-96 bg-gray-200 rounded-lg"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
