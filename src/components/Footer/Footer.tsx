import React from "react";
import movieApiLogo from "../../assets/movieDBlogo.svg";
import { FooterContainer } from "./styles";

export const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Made by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/EdimarioJr"
        >
          edimario
        </a>
      </p>
      <img src={movieApiLogo} alt="Movie Db Api Logo" />
    </FooterContainer>
  );
};
