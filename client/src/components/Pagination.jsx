import React from "react";
import styles from './Pagination.module.css';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions';

export default function Pagination({ setPage, previousPage, nextPage }) {
    const dispatch = useDispatch();
    dispatch(actions.setPageCount());
    const pageCount = useSelector(state => state.pageCount);
    const currentPage = useSelector(state => state.currentPage);
  
    const pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(i + 1);
    }

    return (
      <div id='Pagination'>
        <h1>Page: {currentPage}</h1>
        <ul className={styles.paginationcontainer}>
            {pageNumbers?.map((number, currentPage) => (
              <li key={number} >
                    <button className={({number, currentPage}) => (number === currentPage ? styles.ulactive : styles.ul)} 
                        onClick={() => setPage(number)} >{number}</button>
                </li>
            ))}
            <button className={styles.ul} onClick={() => previousPage()} >Prev</button>
            <button className={styles.ul} onClick={() => nextPage()} >Next</button>
        </ul>
      </div>
    );
  }