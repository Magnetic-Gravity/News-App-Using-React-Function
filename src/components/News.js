import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country = 'in', pageSize = 5, category = 'general', apiKey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setProgress(10);
    setLoading(true);
    setError(null);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch news');
      
      const data = await response.json();
      setProgress(70);
      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching the news data: ", error);
      setError('Failed to load news. Please try again later.');
      setLoading(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - The Wire`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch more news');

      const data = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...(data.articles || [])]);
      setTotalResults(data.totalResults || 0);
    } catch (error) {
      console.error("Error fetching more data: ", error);
      setError('Failed to load more news. Please try again later.');
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '30px 0px', marginTop: '80px' }}>
        The Wire - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      {error && <div className="error-message">{error}</div>}
      <InfiniteScroll
        dataLength={articles?.length || 0}
        next={fetchMoreData}
        hasMore={articles?.length !== totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {articles && articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || 'Untitled'}
                  description={element.description ? element.description.slice(0, 88) : 'No description available.'}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author || 'Unknown'}
                  date={new Date(element.publishedAt).toLocaleString()}
                  source={element.source.name || 'Unknown'}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
