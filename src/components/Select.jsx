

// Select.jsx

import { useState, useEffect } from "react";

export default function Select({
  inputValue,
  onInputChange,
  onChange,
  options,
  isClearable,
  placeholder,
  components,
  styles
}) {
  const [selectValue, setSelectValue] = useState('');
  const [options, setOptions] = useState([]);

  const handleInputChange = (newValue) => {
    setSelectValue(newValue);
    onInputChange(newValue);
  };

  const handleDisplayChange = (displayOption) => {
    if (displayOption) {
      setSelectValue(displayOption.label);
    } else {
      setSelectValue('');
    }
    onChange(displayOption);
  };

  useEffect(() => {
    // Fetch data if needed on component mount
  }, []);

  const CustomOption = ({ children, data }) => (
    <div style={{ display: "flex", alignItems: "center", margin: "5px" }}>
      {data.poster && (
        <img
          src={data.poster}
          alt={data.label}
          style={{ width: "50px", marginRight: "10px" }}
        />
      )}
      {children}
    </div>
  );

  return (
    <div>
      <Select
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleDisplayChange}
        options={options}
        isClearable={isClearable}
        placeholder={placeholder}
        components={{ Option: CustomOption, ...components }}
        styles={styles}
      />
    </div>
  );
}
