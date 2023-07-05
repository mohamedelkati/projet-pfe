import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../css/TaskItem.css';
const TaskItem = ({ task, deleteTask }) => {
  const Loading = () => {
    return (
      <>Loading.... </>
    );
  };

 

  return (
    <>
    
    <div className="col-md-3 mb-4 btn-group">
      <div className="carditem h-100 text-center p-4" key={task.id}>
        <img src={`${window.location.origin}/images/${task.image_user}`} className="card-img-top" alt={task.title} height="250px"  />
        <div className="card-body">
          <h3 className="card-title mb-0">{task.title.substring(0, 12)}</h3>
          <h6 className="card-title mb-0">{task.category.name.substring(0, 12)}</h6>
          <p className="card-text">${task.prix}</p>
          <div>
            <Link to={`/publication/${task.id}`} className="btn btn-outline-dark mt-auto">
              View options
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TaskItem;
