import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("lamborghini");
  const [page, setPage] = useState(1);

  const client_id = "mVDjhSDr0sDox9iZZQfbGXwsmrbWhmzFn74dVEg5ir0";
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

  const fetchData = () => {
    axios
      .get(fetchUrl)
      .then((response) => {
        setData([...data, ...response.data.results]);
        setPage(page + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [query]); 

  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setQuery(e.target.value);
      setData([]);
    }
  };

  return (
    <div className="container">
      <div className='header'>
        <h1>Image Search</h1>
        <input
          type="text"
          className="search-bar"
          placeholder='Search for images'
          onKeyDown={(e) => searchImages(e)}
        />
      </div>

      <InfiniteScroll
        dataLength={data.length} 
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="image-container">
          {data.map((item, key) => (
            <div className="image-item" key={key}>
              <img src={item.urls.small} className="image" alt={item.alt_description} />
              <p className="image-author">Photo by {item.user.name}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
