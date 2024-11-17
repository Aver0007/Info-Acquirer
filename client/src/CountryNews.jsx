// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Loader from './Components/Loader';
// import EverythingCard from './EverythingCard';
// function CountryNews() {
//   const params = useParams();
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   function handlePrev() {
//     setPage(page - 1);
//   }

//   function handleNext() {
//     setPage(page + 1);
//   }

//   const pageSize = 6;

//   useEffect(() => {
//     setIsLoading(true);
//     fetch(`https://info-acquirer.onrender.com/country/${params.iso}?page=${page}&pageSize=${pageSize}`)
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           // Handle errors gracefully, e.g., display an error message
//           console.error('Failed to fetch data:', response.statusText);
//           setIsLoading(false);
//           return null; // Prevent setting empty data if request fails
//         }
//       })
//       .then((myJson) => {
//         if (myJson) {
//           setTotalResults(myJson.data.totalResults);
//           setData(myJson.data.articles);
//         }
//         setIsLoading(false);
//       });
//   }, [page, params.iso]);

//   return (
//     <>
//       <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
//         {!isLoading ? (
//           data.length > 0 ? (
//             data.map((element, index) => (
//               <EverythingCard
//                 key={index}
//                 title={element.title}
//                 description={element.description}
//                 imgUrl={element.urlToImage}
//                 publishedAt={element.publishedAt}
//                 url={element.url}
//                 author={element.author}
//                 source={element.source.name}
//               />
//             ))
//           ) : (
//             <p>No news articles found for this criteria.</p>
//           )
//         ) : (
//           <Loader />
//         )}
//       </div>
//       {!isLoading && (
//         <div className="pagination flex justify-center gap-14 my-10 items-center">
//           <button
//             disabled={page <= 1}
//             className="pagination-btn"
//             onClick={() => handlePrev()}
//           >
//             Prev
//           </button>
//           <p className="font-semibold opacity-80">
//             {page} of {Math.ceil(totalResults / 15)}
//           </p>
//           <button
//             disabled={page >= Math.ceil(totalResults / 15)}
//             className="pagination-btn"
//             onClick={() => handleNext()}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

// export default CountryNews

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Components/Loader';
import EverythingCard from './EverythingCard';

function CountryNews() {
  const { iso } = useParams();
  const [data, setData] = useState([]); // Store articles
  const [page, setPage] = useState(1); // Current page number
  const [totalResults, setTotalResults] = useState(0); // Total articles available
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const pageSize = 6; // Number of articles per page

  // Function to fetch news data
  const fetchNews = async (currentPage) => {
    setIsLoading(true);
    setError(null); // Reset any previous error

    try {
      const response = await fetch(
        `https://info-acquirer.onrender.com/country/${iso}?page=${currentPage}&pageSize=${pageSize}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();
      const { totalResults: fetchedTotal, articles } = result.data || {};

      // Check if data exists
      if (!articles || articles.length === 0) {
        setData([]); // Clear data if no articles
        setTotalResults(0);
      } else {
        setData(articles);
        setTotalResults(fetchedTotal || 0);
      }
    } catch (err) {
      setError(err.message); // Set error message for display
    } finally {
      setIsLoading(false); // Stop the loader
    }
  };

  // Fetch news whenever page or country code changes
  useEffect(() => {
    fetchNews(page);
  }, [page, iso]);

  // Pagination handlers
  const handlePrev = () => setPage((prevPage) => Math.max(prevPage - 1, 1));
  const handleNext = () =>
    setPage((prevPage) => (prevPage < Math.ceil(totalResults / pageSize) ? prevPage + 1 : prevPage));

  return (
    <div>
      {/* News Articles Grid */}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">Error: {error}</p> // Display error message
        ) : data.length > 0 ? (
          data.map((element, index) => (
            <EverythingCard
              key={index}
              title={element.title}
              description={element.description}
              imgUrl={element.urlToImage}
              publishedAt={element.publishedAt}
              url={element.url}
              author={element.author}
              source={element.source.name}
            />
          ))
        ) : (
          <p>No news articles found for this criteria.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="pagination-btn"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default CountryNews;
