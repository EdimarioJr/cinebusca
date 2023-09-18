import styled from "styled-components";

export const Gallery = styled.section`
  width: 100%;
  height: 600px;
  margin: 20px 0;
  position: relative;
  border-radius: 10px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.2rem;
  width: 70rem;
  height: 20rem;

  background-color: #e1e5f2;
  color: #20242b;

  button {
    background: none;
    padding: 1.2rem;
    font-size: 1.2rem;
    border: none;
  }
`;
