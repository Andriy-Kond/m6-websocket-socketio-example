import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const FilteredNavLink = ({ className, children, ...props }) => (
  <NavLink {...props} className={className}>
    {children}
  </NavLink>
);

export const StyledNavLink = styled(FilteredNavLink)`
  font-weight: normal;
  color: #000;
  transition: transform 0.3s ease;

  /* Псевдоклас active NavLink додає автоматично */
  &.active {
    font-weight: bold;
    color: #ff4500;
  }
`;

// Usage example:
// const ColorButton = styled.button`
//   background-color: ${props => props.hexColor};
//   color: ${props => props.invertColor};
//   transform: ${({ isActive }) => (isActive ? "scale(1.2)" : "scale(1)")};
//   color: ${({ invertColor }) => invertColor};
// `;

//  <ColorButton
//    type="button"
//    onClick={() => this.handleClick(index)}
//    isActive={isActive}
//    key={hex}
//    hexColor={hex}
//    invertColor={invertColor}>
//    color: {hex}
//  </ColorButton>;

// import styled from "@emotion/styled";
// import { NavLink } from "react-router-dom";

// const FilteredNavLink = ({ className, children, ...props }) => (
//   <NavLink {...props} className={className}>
//     {children}
//   </NavLink>
// );

// export const StyledNavLink = styled(FilteredNavLink)`
//   font-weight: normal;
//   color: #000;
//   transition: transform 0.3s ease;

//   &.active {
//     font-weight: bold;
//     color: #ff4500;
//   }
// `;
