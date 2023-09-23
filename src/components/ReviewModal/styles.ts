import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  width: 40rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color:  ${({ ...props }) => props.theme.colors.terciary};
  color: white;
  padding: 2rem;
  border-radius: ${({ ...props }) => props.theme.borderRadius.md};
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition : all 0.3s ease-in-out;
  
  h3 {
    color: ${({ ...props }) => props.theme.colors.primary};
  }

  .header-row {
    display: flex;
    justify-content: space-between;
  }
  
  `;
