function Input({ value, onChange }) {
  return (
      <input type='text' 
      value={value} 
      onChange={(e) => onChange(e.target.value)} />
  );
}
export default Input;