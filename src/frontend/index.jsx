import * as React from 'react';
import ReactDOM from "react-dom/client";
import App from './app.jsx';
import "./input.css"
import RouteList from './routes.jsx';

export default function Home() {
  return (
    <RouteList></RouteList>
  );
}


const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(<Home />);
