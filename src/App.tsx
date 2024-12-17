import { useState,useEffect } from 'react'
import './App.css'
import ListGroup from './Components/ListGroup'

interface City {
  name: string
  description: string
}

const App: React.FC = () => {
  const initialCities: City[] = [
    { name: 'Colombo', description: 'Home of the Space Needle' },
    { name: 'Kandy', description: 'Popular because Temple of Tooth Relic' },
    { name: 'Galle', description: 'Famous because of Dutch Fort' },
  ];

  const loadCitiesFromLocalStorage = (): City[] => {
    const storedCities = localStorage.getItem('cities');
    return storedCities ? JSON.parse(storedCities) : initialCities;
  };

  const [cities, setCities] = useState<City[]>(loadCitiesFromLocalStorage());
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [newCityName, setNewCityName] = useState<string>('');
  const [newCityDescription, setNewCityDescription] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCityClick = (index: number): void => {
    setSelectedCity(index);
    
  };

  const handleAddCity = (): void => {
    if (newCityName && newCityDescription) {
      const newCity:City = {
        name: newCityName,
        description: newCityDescription,
      }
      setCities((prevCities) => [...prevCities, newCity]);
      setNewCityName('');
      setNewCityDescription('');
    }
  };

  const handleResetSelection = (): void => {
    setSelectedCity(null);
  };

  return (
    <div className='container w-800 px-4'>
      <h1 className='text-center mb-13'>
        City Explorer

      </h1>

      <div className='mb-4 d-flex justify-content-center'>
        <input 
          type='text'
          placeholder='Search for a city'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='form-control w-50'
        
        />
      </div>

      <ListGroup
        items={filteredCities}
        heading='Cities'
        onItemClick={(index) =>handleCityClick(index)}
        selectedItem={selectedCity}
     />

        {selectedCity !== null && (
          <div className='mt-4'>
            <h4>
              Description
            </h4>
            <p>{filteredCities[selectedCity].description}</p>
          </div>
        )}

        <div className='card mt-4 p-3'>
          <h4>
            Add a new city
          </h4>
          <div className='mb-3'>
            <input
              type='text'
              placeholder='City name'
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              className='form-control w-50 mb-2'
            />
            <input
              type='text'
              placeholder='City description'
              value={newCityDescription}
              onChange={(e) => setNewCityDescription(e.target.value)}
              className='form-control w-50'
            />
          </div>
    </div>

    <div className='d-flex justify-content-center mb-3'>
      <button 
      onClick={handleAddCity} 
      className='btn btn-success'
      style={{
        padding:"0.5rem 1rem",
        display:"inline-block",
        margin:"8px",
        width: "auto",

          }}>
        Add City
      </button>

    </div>

    <div className='d-flex justify-content-center mb-3'>
      <button 
      onClick={handleResetSelection} 
      className='btn btn-danger'
      style={{
        padding:"0.5rem 1rem",
        display:"inline-block",
        margin:"12px",
        width: "auto",

          }}>
        Reset Selection
      </button>

    </div>
    </div>
  );

};



export default App
