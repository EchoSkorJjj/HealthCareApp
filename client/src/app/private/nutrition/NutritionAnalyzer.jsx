import React, { useState } from 'react';
import '../../../assets/styles/private_styles/NutritionAnalyzer.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [nutritionDataList, setNutritionDataList] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async (item) => {
    try {
      const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
      const response = await fetch(`${baseUrl}/api/recipe/getNutrition?q=${encodeURIComponent(item)}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setNutritionDataList((prevDataList) => [...prevDataList, { ...data, food: item }]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setNutritionDataList((prevDataList) => [...prevDataList, { error: true, food: item }]);
    }
  };

  const handleFetchClick = () => {
    const items = searchTerm.split('\n').map((item) => item.trim());
    setNutritionDataList([]); // Clear previous data
    items.forEach((item) => {
      if (item !== '') {
        fetchData(item);
      }
    });
  };

  const calculateTotal = () => {
    const total = nutritionDataList.reduce(
      (acc, data) => {
        acc.calories += data.calories || 0;
        acc.fat += data.totalNutrients?.FAT?.quantity || 0;
        acc.cholesterol += data.totalNutrients?.CHOLE?.quantity || 0;
        acc.sodium += data.totalNutrients?.NA?.quantity || 0;
        acc.carbohydrates += data.totalNutrients?.CHOCDF?.quantity || 0;
        acc.protein += data.totalNutrients?.PROCNT?.quantity || 0;
        acc.totalCO2Emissions += data.totalCO2Emissions || 0;
        return acc;
      },
      {
        calories: 0,
        fat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrates: 0,
        protein: 0,
        totalCO2Emissions: 0,
      }
    );
    return total;
  };

  const totalNutrition = calculateTotal();

  return (
    <div className='container nutrition-main bg-light col-lg-9'>
      <div className="container py-5">
        <h1>Nutrition Data Search</h1>
        <div className='d-flex justify-content-center row'>
          <div>
            <textarea
              placeholder="Enter food items (one per line) 
            e.g (1 chicken or 100g chicken)"
              value={searchTerm}
              onChange={handleSearchChange}
              className='w-100 nutrition-text'
            />
          </div>
          <div>
            <button className='nutrition-btn' onClick={handleFetchClick}>Fetch Nutrition Data</button>
          </div>
        </div>
        {nutritionDataList.length > 0 ? (
          <div>
            {nutritionDataList.map((nutritionData, index) => (
              <div key={index} className="nutrition-container">
                {nutritionData.error ? (
                  <h2 className="nutrition-title">Error fetching data for {nutritionData.food}</h2>
                ) : (
                  <h2 className="nutrition-title">Nutrition Facts for {nutritionData.food}</h2>
                )}
                {nutritionData.error ? (
                  <p className="error-message">
                    Failed to fetch nutrition data for {nutritionData.food}. Please check the item name.
                  </p>
                ) : (
                  <table className="nutrition-table">
                    <tbody>
                      <tr>
                        <td className="nutrition-label">Calories</td>
                        <td className="nutrition-value">{nutritionData.calories?.toFixed(1)}</td>
                      </tr>
                      {/* Add more rows for other nutrient information */}
                      <tr>
                        <td className="nutrition-label">Total Weight</td>
                        <td className="nutrition-value">{nutritionData.totalWeight?.toFixed(1)} g</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            ))}
            {/* Display total nutrition values */}
            <div className="nutrition-container">
              <h2 className="nutrition-title">Total Nutrition</h2>
              <table className="nutrition-table">
                <tbody>
                  <tr>
                    <td className="nutrition-label">Total Calories</td>
                    <td className="nutrition-value">{totalNutrition.calories.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td className="nutrition-label">Total Fat</td>
                    <td className="nutrition-value">{totalNutrition.fat.toFixed(1)} g</td>
                  </tr>
                  <tr>
                    <td className="nutrition-label">Total Cholesterol</td>
                    <td className="nutrition-value">{totalNutrition.cholesterol.toFixed(1)} mg</td>
                  </tr>
                  <tr>
                    <td className="nutrition-label">Total Sodium</td>
                    <td className="nutrition-value">{totalNutrition.sodium.toFixed(1)} mg</td>
                  </tr>
                  <tr>
                    <td className="nutrition-label">Total Carbohydrates</td>
                    <td className="nutrition-value">{totalNutrition.carbohydrates.toFixed(1)} g</td>
                  </tr>
                  <tr>
                    <td className="nutrition-label">Total Protein</td>
                    <td className="nutrition-value">{totalNutrition.protein.toFixed(1)} g</td>
                  </tr>
                  <tr>
                    <td className="nutrition-label">Total CO2 Emissions</td>
                    <td className="nutrition-value">{totalNutrition.totalCO2Emissions.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className='filler-component'>
            <p>Enter food items and click "Fetch Nutrition Data"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
