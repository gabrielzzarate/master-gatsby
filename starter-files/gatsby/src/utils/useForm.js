import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number
    let { value } = e.target;

    if (e.target.value === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that change
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
