import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    @font-face { font-family: 'ghanachoco'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ghanachoco.woff') format('woff'); font-weight: normal; font-style: normal; }
    ${reset}
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'NanumSquare', sans-serif;
    }
    button { 
        cursor: pointer;
        border: none;
        outline: none;
    }
    ol, ul, li {
        list-style: none;
    }
    a {
        text-decoration: none;
        cursor: pointer;
    }
    img {
        width: 100%;
        height: 100%;
    }
`;
