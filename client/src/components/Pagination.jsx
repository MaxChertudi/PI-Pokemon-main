import React from "react";
import styles from './Pagination.module.css';
import { useSelector } from "react-redux";

export default function Pagination({ setPage, previousPage, nextPage }) {

  const currentPage = useSelector(state => state.currentPage);
  const filteredPokemons = useSelector(state => state.filteredPokemons);
  const MaxRenderedPokemons = useSelector(state => state.MaxRenderedPokemons);
  const pageNumbers = [];
  
    const pageCount = Math.ceil(filteredPokemons.length / MaxRenderedPokemons);
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(i + 1);
    }

    return (
      <div id='Pagination' key='Pagination'>
        <h1 className={styles.title}>Page: {currentPage}</h1>
        <div id='Pagination2' key='Pagination2'>
          <ul className={styles.paginationcontainer} id='PaginationList' key='PaginationList'>
            {pageNumbers?.map( (number) => (
              <li key={number} id={number} >
                    <button className={styles.ul} onClick={() => setPage(number)} >{number}</button>
                </li>
            ))}
          </ul>
        </div>
        <button className={styles.PrevNext} onClick={() => previousPage()} >Prev</button>
        <button className={styles.PrevNext} onClick={() => nextPage()} >Next</button>
      </div>
    );
  }