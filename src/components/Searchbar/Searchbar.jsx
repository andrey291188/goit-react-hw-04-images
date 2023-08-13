import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import css from '../styles.module.css';
import { useState } from 'react';

const Searchbar = ({onSubmit}) => {
  const [textSearchForm, setTextSearchForm] = useState("")

  const handleTextSearchChange = e => {
    setTextSearchForm(e.currentTarget.value.toLowerCase())
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (textSearchForm.trim() === ""){
      return alert("Enter your request")
    }
    onSubmit(textSearchForm);
     setTextSearchForm('')
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span><FaSearch value={{className:"SearchForm_button"}}/></span> 
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          placeholder="Search images and photos"
          onChange={handleTextSearchChange}
          value={textSearchForm}
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}