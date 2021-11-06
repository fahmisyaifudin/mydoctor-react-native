import {useState} from 'react';

export const useForm = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    value,
    (type, params) => {
      return setValue({...value, [type]: params});
    },
  ];
};
