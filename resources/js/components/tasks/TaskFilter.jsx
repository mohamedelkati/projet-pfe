import React from 'react';
import '../../../css/TaskFilter.css';
const TaskFilter = ({ category, catId, setCatId, orderBy, setOrderBy, setPage }) => {
  const handleCategoryChange = (event) => {
    setPage(1);
    setCatId(event.target.value);
  };

  const handleOrderChange = (event) => {
    setPage(1);
    setOrderBy({
      column: 'id',
      direction: event.target.value,
    });
  };

  return (
    <>
      <div className="btn-group  justify-content-center mb-6 pb-5" >
        <button id='button'
          className={`btn ${!catId ? 'btn-outline-dark' : 'btn-outline-dark'} mr-2`}
          onClick={() => {
            setPage(1);
            setCatId(null);
          }}
        >
          All
        </button>
        {category?.map((category) => (
          <button id='button'
            className={`btn ${category.id === catId ? 'btn-outline-dark' : 'btn-outline-dark'} mr-2`}
            key={category.id}
            onClick={() => {
              setPage(1);
              setCatId(category.id);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default TaskFilter;
