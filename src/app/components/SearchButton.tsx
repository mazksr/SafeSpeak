"use client"
import React from 'react';
import "./styles.css"

interface Props {
    comment: string,
    onClick: (comment: string) => void
}

const SearchButton = ({ comment, onClick }: Props) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClick(comment);
    }

    return (
        <button onClick={handleClick} type={"submit"} className="cssbuttons-io">
          <span>
            Detect
            <svg
                viewBox="0 0 19.9 19.7"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="title desc"
                className="svg-icon search-icon"
            >
              <title>Search Icon</title>
              <desc id="desc">A magnifying glass icon.</desc>
              <g stroke="white" fill="none" className="search-path">
                <path d="M18.5 18.3l-5.4-5.4" stroke-linecap="square"></path>
                <circle r="7" cy="8" cx="8"></circle>
              </g>
            </svg>
          </span>
        </button>
    );
};

export default SearchButton;