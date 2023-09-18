import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  width: 40rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: #383d48;
  color: white;
  padding: 2rem;
  border-radius: .4rem;
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition : all 0.3s ease-in-out;
  
  h3 {
    color: #107ee5;
  }
  
  `;
