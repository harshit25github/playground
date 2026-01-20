import React from "react";
import ReactDOM from "react-dom/client";


const headingTag = React.createElement('h1',{className:'heading',key:'h1'},'Hello, React!');
const Container = React.createElement('div',{className:'container'},[headingTag,"Hello from text"]);
console.log(Container)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(Container);