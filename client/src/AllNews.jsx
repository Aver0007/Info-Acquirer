import { React, useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Components/Loader';

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  let pageSize = 30;

  useEffect(() => {
    setIsLoading(true); 
    // fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`)
    fetch(`https://info-acquirer.onrender.com/all-news?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch news"); 
        }
        return response.json();
      })
      .then(myJson => {
        setTotalResults(myJson.data.totalResults);
        setData(myJson.data.articles);
        setIsLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        setIsLoading(false); 
      });
  }, [page]);

  function handlePrev() {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  }

  function handleNext() {
    setPage(prevPage => prevPage + 1);
  }

  return (
    <>
      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {isLoading ? <Loader /> : 
          data.map((element, index) => (
            <EverythingCard
              title={element.title} description={element.description} imgUrl={element.urlToImage}
              publishedAt={element.publishedAt} url={element.url} author={element.author}
              source={element.source.name} key={index}
            />
          ))
        }
      </div>
      {!isLoading && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className='pagination-btn text-center' onClick={handlePrev}>&larr; Prev</button>
          <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / 15)}</p>
          <button className='pagination-btn text-center' disabled={page > Math.ceil(totalResults / 15)} onClick={handleNext}>Next &rarr;</button>
        </div>
      )}
    </>
  );
}

export default AllNews;
