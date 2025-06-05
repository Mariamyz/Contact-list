import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import catAnimation from "../../animations/404cat.json";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <Lottie animationData={catAnimation} loop={true} />
      <h1>Ой! Сторінку не знайдено</h1>
      <p>Але котик все ще тут і шукає її разом з тобою 🐾</p>

      <Link to="/" className="notfound-button">
        Повернутись на головну
      </Link>
    </div>
  );
}
