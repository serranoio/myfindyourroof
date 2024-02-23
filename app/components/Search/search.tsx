import React, { useState } from 'react';
import styles from './search.module.css';

interface SearchProps {
  onSearch: (res: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [ res, setRes ] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRes(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const min = formData.get("min")!
    const max = formData.get("max")!
    const rentalOrBuy = formData.get("rental-or-buy")!

    const filters = {
      min: min,
      max: max,
      rentalOrBuy: rentalOrBuy,
    }

    localStorage.setItem("filters", JSON.stringify(filters));
    onSearch(res);
  }

  return (
    <div className={ styles.container }>
      <form onSubmit={handleSubmit} className={ styles.searchBar }>
        <input 
          type="text"
          placeholder="Search..."
          value={res}
          onChange={handleChange}
          className={ styles.searchInput }/>
        <button type="submit" className={ styles.searchBtn }><img src="search.svg" alt="search" className={ styles.searchIcon }/></button>

        <div className={styles["label-input"]}>
          <label>Min</label>
          <input name="min" type="number"></input>
        </div>

        <div className={styles["label-input"]}>
          <label>Max</label>
          <input name="max" type="number"></input>
        </div>

        <select name="rental-or-buy">
          <option>rent</option>
          <option>sale</option>
          </select>

      </form>
    </div>
  );
};

export default Search; 