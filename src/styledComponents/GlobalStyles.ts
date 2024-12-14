import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  },
  html,body, #root {
  width:100%;
  height: 100%;
    
  }
`;

export default GlobalStyles;
