import './App.css';
import { useEffect, useState } from 'react';
import KanbanBoard from './components/Kanbanboard';
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (data) {
    console.log(data);
  }

  return (
    <div className="App">
      <div className="container mx-auto p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data && <KanbanBoard tickets={data.tickets} users={data.users} />
        )}
      </div>
    </div>
  );
}

export default App;
