import React from 'react';
import './Card.css';
import todo from '../assets/To-do.svg';
import inprogress from '../assets/in-progress.svg';
import nopriority from '../assets/No-priority.svg';
import backlog from '../assets/Backlog.svg';
import cancelled from '../assets/Cancelled.svg';
import display from '../assets/Display.svg';
import done from '../assets/Done.svg';

const Card = ({ ticket, user, grouping }) => {
  
  const getStatusImage = (status) => {
    switch (status) {
      case 'Done':
        return done;
      case 'Cancelled':
        return cancelled;
      case 'Backlog':
        return backlog;
      case 'Todo':
        return todo;
      case 'In progress':
        return inprogress;
      default:
        return display;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        <div className="user-avatar">{user.name.charAt(0)}</div>
      </div>

      <div className='status'>
        {grouping !== 'status' && (
          <img 
            src={getStatusImage(ticket.status)} 
            alt={ticket.status} 
            className="status-image"
          />
        )}
        <p className="card-title">{ticket.title}</p>
      </div>
    <div className='lower'>
    {grouping !== 'priority' && (
    <img src={nopriority} className='lower-img1'/>
    )}
      <div className="card-tags">
        <div className='round'></div>
        <span className="tag">{ticket.tag}</span>
      </div>
      </div>
    </div>
  );
};

export default Card;
