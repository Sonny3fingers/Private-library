import React from "react";

const Ratings = ({ select, selected }) => {
  const changeRatingHandler = (e) => {
    select(+e.target.value);
  };

  return (
    <div>
      <p>How would you rate this book?</p>
      <ul className="ratingsList">
        <li>
          <input
            type="radio"
            id="num1"
            name="rating"
            onChange={changeRatingHandler}
            checked={selected === 1}
            value={1}
          />
          <label htmlFor="num1">1</label>
        </li>
        <li>
          <input
            type="radio"
            id="num2"
            name="rating"
            onChange={changeRatingHandler}
            checked={selected === 2}
            value={2}
          />
          <label htmlFor="num2">2</label>
        </li>
        <li>
          <input
            type="radio"
            id="num3"
            name="rating"
            onChange={changeRatingHandler}
            checked={selected === 3}
            value={3}
          />
          <label htmlFor="num3">3</label>
        </li>
        <li>
          <input
            type="radio"
            id="num4"
            name="rating"
            onChange={changeRatingHandler}
            checked={selected === 4}
            value={4}
          />
          <label htmlFor="num4">4</label>
        </li>
        <li>
          <input
            type="radio"
            id="num5"
            name="rating"
            onChange={changeRatingHandler}
            checked={selected === 5}
            value={5}
          />
          <label htmlFor="num5">5</label>
        </li>
      </ul>
    </div>
  );
};

export default Ratings;
