import React, { useEffect, useReducer, useState } from "react";

const initialState = {
  lastNotecreate: null,
  totalNotes: 0,
  notes: [],
};
const NotesReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      const newState = {
        lastNotecreate: new Date().toLocaleDateString()+" "+ new Date().toTimeString( 'en-US', { hour: 'numeric', hour12: true}).slice(0,8) ,
        totalNotes: prevState.notes.length + 1,
        notes: [...prevState.notes, action.payload],
      };
     
      return newState;

    case "DELETE_NOTE":
      const newSate={
        ...prevState,
      totalNotes:prevState.notes.length-1,
      notes:prevState.notes.filter((note)=>note.id !== action.payload.id)
      }  
      return newSate
  }
};

function App() {
  const [notesState, dispatch] = useReducer(NotesReducer, initialState);
  const [notesInput, setnotesInput] = useState('');
  

  const addNote = (e) => {
    e.preventDefault();

    const uuid = Math.floor(Math.random() * 20);

    if (!notesInput) {
      return;
    }
    const newNote = {
      id: uuid,
      text: notesInput,
      rotate: Math.floor(Math.random() * 20),
    };

    dispatch({ type: "ADD_NOTE", payload: newNote });
    setnotesInput("");
   
  };
  const dragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dropNote = (e) => {
    e.target.style.left = `${e.pageX - 50}px`;
    e.target.style.top = `${e.pageY - 50}px`;
  };

  return (
    <>
      <div className="wrapper-container" onDragOver={dragOver}>
        <div className="addnotes-container">
          <h1 className="title">Sticky Notes App </h1>
          <form>
            <textarea
            value={notesInput}
              cols={7}
              rows={15}
              placeholder="Enter Your Notes"
              onChange={(e) => setnotesInput(e.target.value)}
            ></textarea>
            <button onClick={addNote}>Add Note</button>
            <span className="totalnotes"><p>{`Notes - ${notesState.totalNotes}`}</p>
           
            </span>
          </form>
        </div>
      </div>
      {notesState.notes.map((note) => (
       
        <div
          className="notes-container"
          style={{ transform: `rotate(${note.rotate}deg)` }}
          draggable="true"
          key={note.id}
          onDragEnd={dropNote}
        >
    <div className="close" onClick={()=>dispatch({type:"DELETE_NOTE", payload: note})} >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
    </div>

          <pre className="text">{note.text}</pre>

          <span><p style={{fontFamily:'"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'}}>{notesState.lastNotecreate}</p></span>
        </div>
      ))}
    </>
  );
}

export default App;
