import React from "react";
import styles from './Pagination.module.css';

export default function Pagination({ itemsPage, count, currentPage, setPage }) {
    const pageNumbers = [];
  
    for (let i = 0; i < Math.ceil(count / itemsPage); i++) {
      pageNumbers.push(i + 1);
    }

    return (
      <div id='Pagination'>
        <h1>Pages:</h1>
        <ul className={styles.container}>
          {pageNumbers?.map((number) => (
              <li key={number} >
                <button className={({number, currentPage}) => (number === currentPage ? styles.ulactive : styles.ul)} 
                  onClick={() => setPage(number)}>{number}</button>
              </li>
            ))}
        </ul>
      </div>
    );
  }