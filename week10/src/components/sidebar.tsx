import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineMovie } from "react-icons/md";
import { GoArchive } from "react-icons/go";
import { LuShoppingCart } from "react-icons/lu";


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


interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
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
      <NavItem to="/subscriptions">
         <Icon>
           <GoArchive />
         </Icon>
           구독
      </NavItem>
      <NavItem to="/purchase">
         <Icon>
           <LuShoppingCart />
         </Icon>
           개별 구매
      </NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;
