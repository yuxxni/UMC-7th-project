
import styled from 'styled-components';
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex; /* 사이드바 & outlet 가로로 */
  flex: 1; /* 나머지 공간 차지 */

`;

const SidebarContainer = styled(Sidebar)`
  width: 250px;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1; 
  padding: 20px;
  background-color:#131416;
  overflow: auto;
`;

const RootLayout = () => {
    return (
        <LayoutContainer>
            <Navbar />
            <MainContainer>
                <SidebarContainer />
                <MainContent>
                    <Outlet />
                </MainContent>
            </MainContainer>
        </LayoutContainer>
    );
};

export default RootLayout;
