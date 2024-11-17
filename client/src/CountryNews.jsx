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
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // New: error message state

  const pageSize = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null); // Clear previous error

        const response = await fetch(
          `https://info-acquirer.onrender.com/country/${params.iso}?page=${page}&pageSize=${pageSize}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const myJson = await response.json();

        // Debug: Log the entire API response
        console.log('API Response:', myJson);

        // Ensure data exists and has expected structure
        if (!myJson || !myJson.data || !myJson.data.articles) {
          throw new Error('Unexpected API response format');
        }

        // Set the data if all is good
        setTotalResults(myJson.data.totalResults || 0);
        setData(myJson.data.articles || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Could not fetch the news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, params.iso]);

  function handlePrev() {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNext() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <>
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {!isLoading ? (
          data.length > 0 ? (
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
            <p>{errorMessage || 'No news articles found for this criteria.'}</p>
          )
        ) : (
          <Loader />
        )}
      </div>
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
    </>
  );
}

export default CountryNews;
