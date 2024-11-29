import styled from "styled-components";
import { BsMusicPlayer } from "react-icons/bs"; 

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <BsMusicPlayer style={{ marginRight: '10px' }} />
        <h3>UMC PLAYLIST</h3>
        <BsMusicPlayer style={{ marginLeft: '10px' }} />
      </div>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  background-color: #6c63ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  height: 60px;
  width: 100%;
  max-width: 800px; /* 최대 너비를 설정 */
  margin: 0 auto; /* 자동으로 좌우 여백을 동일하게 */
  
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  h3 {
    text-align: center;
    margin: 0;
    font-size: 1.2rem;
  }
`;