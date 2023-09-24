import Image from "next/image";
import React from "react";

import movieApiLogo from "../../assets/movieDBlogo.svg";

import { FooterContainer } from "./styles";

export const Footer = () => (
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
    <Image src={movieApiLogo} width={30} height={30} alt="Movie Db Api Logo" />
  </FooterContainer>
);
