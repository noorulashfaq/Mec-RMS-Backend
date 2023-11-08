import React, { useState } from 'react';
import Select from 'react-select';

const MulSel = () => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [inputValue, setInputValue] = useState('');

const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const regexPattern = /^(\d{2}[A-Z]{2}\d{3},)*\d{2}[A-Z]{2}\d{3}$/;

    if (regexPattern.test(inputValue)) {
      // If the input matches the regex pattern, split and map the values as before
      const valuesArray = inputValue
        .split(',')
        .map((value) => ({
          value: value.trim(),
          label: value.trim(),
        }));
      setSelectedOptions(valuesArray);
    } else {
      // Handle invalid input, such as showing an error message
      alert('Invalid input format');
    }

    // Update the inputValue state for the input field
    setInputValue(inputValue)
      const arrayToDb=[]
  for(let i=0;i<selectedOptions.length;i++){
    console.log(selectedOptions[i])
    // arrayToDb.push(selectedOptions[i].value)
  }
  // console.log(arrayToDb)
// console.log(JSON.stringify(arrayToDb))
  };

  return (
    <div>
      <h1>Multi select</h1><br/>
      <h1>Multi select</h1>
      <h2>Multi-Select Using Comma-Separated Input</h2>
      <input
        type="text"
        placeholder="Enter comma-separated values"
        onChange={handleInputChange}
      />
      <Select
        isMulti
        name="event_coordinator"
        options={selectedOptions}
        value={selectedOptions}
        onChange={selectedOptions}
        isSearchable
        placeholder="Select options..."
        closeMenuOnSelect={false}
      />
      {selectedOptions.map((item)=>{
            return(
                <div>
                    <h4>{item.value}</h4>
                </div>
            )
      })}
    </div>
  );
}


export default MulSel
