import React, { useState, useEffect } from 'react';
import Card from './Card';
import todo from '../assets/To-do.svg';
import inprogress from '../assets/in-progress.svg';
import nopriority from '../assets/No-priority.svg';
import low from '../assets/Img - Low Priority.svg';
import high from '../assets/Img - High Priority.svg';
import medium from '../assets/Img - Medium Priority.svg';
import urgent_red from '../assets/SVG - Urgent Priority colour.svg';
import backlog from '../assets/Backlog.svg';
import cancelled from '../assets/Cancelled.svg';
import done from '../assets/Done.svg';
import threedots from '../assets/3 dot menu.svg';
import add from '../assets/add.svg';
import display from '../assets/Display.svg';
import down from '../assets/down.svg';
import './Kanbanboard.css';
const KanbanBoard = ({ tickets, users }) => {
    const [grouping, setGrouping] = useState(localStorage.getItem('kanban_grouping') || 'status');
    const [sorting, setSorting] = useState(localStorage.getItem('kanban_sorting') || 'priority');  
    const [groupedTickets, setGroupedTickets] = useState({});
    const [show, setShow] = useState(false);
    useEffect(() => {
    const savedGrouping = localStorage.getItem('kanban_grouping');
    const savedSorting = localStorage.getItem('kanban_sorting');
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSorting) setSorting(savedSorting);
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban_grouping', grouping);
    localStorage.setItem('kanban_sorting', sorting);
    regroupTickets();
  }, [grouping, sorting, tickets]);

  const regroupTickets = () => {
    let groups = {};
    
    tickets.forEach(ticket => {
      let key;
      switch (grouping) {
        case 'status':
          key = ticket.status;
          break;
        case 'user':
          const user = users.find(u => u.id === ticket.userId);
          key = user ? user.name : 'Unassigned';
          break;
        case 'priority':
          key = ticket.priority;
          if (key !== 0) key = 5 - ticket.priority;
          break;
        default:
          key = 'Other';
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);
    });
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    setGroupedTickets(groups);
  };

  const getGroupTitle = (group) => {
    if (grouping === 'priority') {
      switch (parseInt(group)) {
        case 1: return 'Urgent';
        case 2: return 'High';
        case 3: return 'Medium';
        case 4: return 'Low';
        default: return 'No priority';
      }
    }
    return group;
  };

  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    setGrouping(newGrouping);
    localStorage.setItem('kanban_grouping', newGrouping);
  };

  const handleSortingChange = (e) => {
    const newSorting = e.target.value;
    setSorting(newSorting);
    localStorage.setItem('kanban_sorting', newSorting);
  };

  const getStatusImage = (groupTitle) => {
    switch (groupTitle) {
      case 'Urgent': return urgent_red;
      case 'High': return high;
      case 'Medium': return medium;
      case 'Low': return low;
      case 'No priority': return nopriority;
      case 'Done': return done;
      case 'Cancelled': return cancelled;
      case 'Backlog': return backlog;
      case 'Todo': return todo;
      case 'In progress': return inprogress;
      default: return null;
    }
  };

  return (
    <div>
      <div className="container">
      <div className='navbar'>
        <button className='display' onClick={() => setShow(!show)}>
          <img src={display}/>
          <p className='para'>Display</p>
          <img src={down}/>
        </button>
      </div>
      {show && (
         <div className="display-controls">
            <div className='group'>
                <p> Grouping </p>
         <select value={grouping} onChange={handleGroupingChange}>
           <option value="status">Status</option>
           <option value="user">User</option>
           <option value="priority">Priority</option>
         </select>
         </div>
         <div className='group'>
                <p> Ordering </p>
         <select value={sorting} onChange={handleSortingChange}>
           <option value="priority">Priority</option>
           <option value="title">Title</option>
         </select>
         </div>
       </div> 
      )}
        
        <div className="kanban-board">
          {Object.entries(groupedTickets).map(([group, groupTickets]) => (
            <div key={group} className="column">
              <div className="header-row-1">
                <div className='header-2'>
                {grouping === 'user' ? (
                    <div className="user-avatar">
                    {groupTickets[0].userId 
                        ? users.find(u => u.id === groupTickets[0].userId).name.charAt(0) 
                        : 'U'}
                    </div>
                ) : (
                    <img 
                    src={getStatusImage(getGroupTitle(group))} 
                    alt={getGroupTitle(group)} 
                    className="group-image"
                    />
                )}
                <p>{getGroupTitle(group)}</p>
                <p>{groupTickets.length}</p>
                </div>
                <div className="action-icons">
                    <img src={add} alt="Add" />
                    <img src={threedots} alt="More options" />
                </div>
                </div>

              {groupTickets.map(ticket => (
                <Card 
                  key={ticket.id} 
                  ticket={ticket} 
                  user={users.find(u => u.id === ticket.userId)}
                  grouping={grouping}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
