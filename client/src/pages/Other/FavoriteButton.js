// Necessary Import
import styled from "styled-components";
import React, { useState } from "react";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <DivContainer>
      <button onClick={toggleFavorite} style={{cursor: "pointer"}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill={isFavorite ? "gold" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>
    </DivContainer>
  );
};

export default FavoriteButton;

const DivContainer = styled.div`
  width: 10%;
  height: fit-content;
  cursor: pointer;
  & button {
    background-color: lightgray;
    border: none;
  }
`;