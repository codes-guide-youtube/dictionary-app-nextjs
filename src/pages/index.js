// pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [word, setWord] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDefinitions = async () => {
    setLoading(true);
    setError('');
    setDefinitions([]); // Clear previous content

    try {
      const response = await axios.get(`/api/definition?word=${word}`);
      const data = response.data;

      if (data.meanings && data.meanings.length > 0) {
        setDefinitions(data.meanings);
      } else {
        setError("The word doesn't exist. Please check the spelling.");
      }
    } catch (error) {
      setError("The word doesn't exist. Please check the spelling. (if the spelling is correct, then the database might not have the word)");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Dictionary App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          className="text-gray-800 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={fetchDefinitions}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Search
        </button>
      </div>
      <div id="definitions" className="bg-white p-4 border rounded-md shadow-md text-gray-800">
        {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
        {loading ? (
          <p className="text-gray-800">Loading...</p>
        ) : (
          definitions.map((meaning, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{meaning.partOfSpeech}</p>
              {meaning.definitions.map((definition, idx) => (
                <p key={idx} className="text-gray-700">
                  {definition.definition}
                  {definition.example && (
                    <span className="italic"> (Example: {definition.example})</span>
                  )}
                </p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
