import FormBuilder from './components/FormBuilder';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-700">Ace<span className="text-blue-600">Hours</span></h1>
          {/* <div className="flex space-x-4">
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors">
              Save
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Publish
            </button>
          </div> */}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <FormBuilder />
      </main>
    </div>
  );
}

export default App;