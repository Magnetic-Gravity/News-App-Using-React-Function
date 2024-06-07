import React from 'react';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  // Default values for missing data
  const defaultImage = "https://www.hindustantimes.com/ht-img/img/2024/04/19/1600x900/India_Flag_1713518778477_1713518820010.jpeg";
  const fallbackTitle = "No Title Available";
  const fallbackDescription = "No Description Available";
  const fallbackSource = "Unknown Source";
  const fallbackAuthor = "Unknown";

  return (
    <div className="my-3">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger">{source || fallbackSource}</span>
        </div>
        <img 
          src={imageUrl || defaultImage} 
          className="card-img-top" 
          alt={title || fallbackTitle}
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="card-title">{title || fallbackTitle}</h5>
          <p className="card-text">{description || fallbackDescription}</p>
          <p className="card-text">
            <small className="text-danger">
              By {author || fallbackAuthor} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a 
            href={newsUrl} 
            rel="noopener noreferrer" 
            target="_blank" 
            className="btn btn-sm btn-dark"
            aria-label={`Read more about ${title || fallbackTitle}`}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
