import React from 'react';
function Input({ value, onChange }) {
  return (
      <input 
      type='text' 
      value={value} 
      onChange={(e) => onChange(e)}/>
  );
}
export default Input;