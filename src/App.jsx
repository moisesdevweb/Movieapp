import Header from './components/Header';
import { Sidebar } from './components/sidebar';


function App() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      
      <main className="flex-1">
        <Header />
        {/* Aquí va el contenido principal */}
      </main>
    </div>
  );
}
export default App;
