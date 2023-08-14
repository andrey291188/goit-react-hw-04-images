import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import request from '../service/Api/api';
import css from './styles.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [textSearch, setTextSearch] = useState("");
  const [arrayDataImages, setArrayDataImages] = useState([]);
  const [dataImageIndex, setDataImageIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [btnVisible, setBtnVisible] = useState(null);

  useEffect(() => {
    if (textSearch === "") {
      return
    }
    getRequest(textSearch, page);

  }, [textSearch, page])

  const getRequest = async (queryText, page) => {
    try {
      setLoader(true);
      const response = await request(queryText, page);
      if (!response.hits.length) {
        return alert(`Request with this name ${queryText} not found`);
      }
        setArrayDataImages((prevArray) => [...prevArray, ...response.hits]);
        setBtnVisible(response.totalHits);
    } catch (error) {
      alert('Sorry something went wrong, try again');
    } finally {
      setLoader(false);
    }
  };

  const handleSearchSubmit = text => {
   setTextSearch(text);
   setPage(1); 
   setArrayDataImages([]);
  };

  const handleIncrement = () => {
   setPage((prevPage) => prevPage + 1)
    
  };

  const toggleModal = () => {
   setShowModal(!showModal)
  };

  const handleDataIndex = index => {
    setDataImageIndex(index);
    toggleModal();
  };
 
    const totalPage = btnVisible / arrayDataImages.length;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSearchSubmit} />
        {arrayDataImages && (
          <ImageGallery data={arrayDataImages} onClick={handleDataIndex} />
        )}
        {totalPage > 1 && !loader && arrayDataImages.length > 0 && (
          <Button onClick={handleIncrement} />
        )}
        {loader && <Loader />}
        {showModal && (
          <Modal
            imgModal={arrayDataImages[dataImageIndex]}
            toggleModal={toggleModal}
          />
        )}
      </div>
    );
}

export default App;
