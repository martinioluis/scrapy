import React, { useState, useEffect } from 'react';
import TableItem from './TableItem';
import ChartItem from './ChartItem';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000')
      .then(res => res.json())
      .then(data => setItems(data))
  }, []);

  return (
    <div className="App">
      <TableItem data={items} />
      <ChartItem data={items} />
    </div>
  );
}

export default App;
