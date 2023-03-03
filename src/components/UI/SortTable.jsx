import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";

import classes from "./SortTable.module.css";

const SortTable = ({ sortByDate, onSortByDate, setSortBooksHandler }) => {
  const sortByDateHandler = () => {
    onSortByDate(true);
    setSortBooksHandler((prevState) =>
      prevState.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      })
    );
  };

  const sortByRatingsHandler = () => {
    onSortByDate(false);
    setSortBooksHandler((prevState) =>
      prevState.sort((a, b) => {
        return b.rating - a.rating;
      })
    );
  };

  return (
    <div className={classes.sortSection}>
      <span className={classes.sortDropdown}>
        <span>Sort Table By </span>
        <FontAwesomeIcon className={classes.icon} icon={faArrowRight} />
      </span>
      <ul>
        <li
          onClick={sortByDateHandler}
          className={sortByDate ? classes.active : ""}
        >
          <span>Date</span>
          <FontAwesomeIcon
            className={classes.icon}
            icon={faArrowAltCircleDown}
          />
        </li>
        <li
          onClick={sortByRatingsHandler}
          className={!sortByDate ? classes.active : ""}
        >
          <span>Ratings</span>
          <FontAwesomeIcon
            className={classes.icon}
            icon={faArrowAltCircleDown}
          />
        </li>
      </ul>
    </div>
  );
};

export default SortTable;
