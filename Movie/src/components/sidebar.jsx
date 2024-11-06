import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineMovie } from "react-icons/md";

const SidebarContainer = styled.div`
  width: 250px; 
  background-color: #141517; 
  padding: 20px; 
  display: flex;
  flex-direction: column;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  color: white; 
  text-decoration: none; 
  padding: 10px;
  margin: 5px 0; /* 항목 간 간격 */

  &:hover {
    background-color: rgba(243, 47, 95, 0.5); 
  }
`;

const Icon = styled.span`
 margin-right: 10px;
`;


const Sidebar = () => {
  return (
    <SidebarContainer>
      <NavItem to="/search">
         <Icon>
           <FaMagnifyingGlass />
         </Icon>
           찾기
      </NavItem>
      <NavItem to="/categories">
         <Icon>
           <MdOutlineMovie />
        </Icon>
          영화
     </NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;
