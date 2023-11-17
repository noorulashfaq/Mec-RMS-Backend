import React, { useState } from 'react';
import Select from 'react-select';

const MulSel = () => {

  const [selectedOptions, setSelectedOptions] = useState([])

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
      console.log('Invalid input format');
    }
  }
  // the selectedOptions hook will have the splitted text in array format which contain a value and a label
  // console.log(selectedOptions)

  // using map, picking only value and pushing to result array
  let result=[]
  selectedOptions.map((item)=>{
    if(!(result.includes(item.value))){
      result.push(item.value)
    }
  })

  // result is the final required array
console.log(result)

// we can now map the result array and put wherever we need.. like the attendance sheet

  return (
    <div>
      <h1>Multi select</h1><br/>
      <h1>Multi select</h1>
      <h2>Multi-Select Using Comma-Separated Input</h2>

      {/* input box for getting comma separated text from user */}
      <input
        type="text"
        placeholder="Enter comma-separated values"
        onChange={handleInputChange}
      />

      {/* dropdown that show the roll no entered like selected options */}
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

      {/* just printing to check each numbers*/}
      {selectedOptions.map((item)=>{
            return(
                <div>
                    <h4>{item.value}</h4>
                </div>
            )
      })}

{/* the result array is the array that has the comma separated text which is printed in console*/}

    </div>
  );
}


export default MulSel
