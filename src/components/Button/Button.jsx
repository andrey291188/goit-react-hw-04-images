import PropTypes from 'prop-types'
import css from "../styles.module.css"

export const Button = ({onClick}) => {
  return (
   <button type="button" className={css.Button} onClick={() => onClick()}>Load more</button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}
