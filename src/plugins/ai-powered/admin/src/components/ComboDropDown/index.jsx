import React, { useState, useEffect } from "react";
import { Combobox, ComboboxOption, Box } from "@strapi/design-system";

export default function ComboDropDown({
  name,
  label,
  value,
  options,
  callback,
  disabled,
}) {
  const [option, setOption] = useState(value || options[0].value);

  useEffect(() => {
    callback && callback(option);
  }, [option]);

  return (
    <Box paddingBottom={4}>
      <Combobox
        name={name}
        label={label}
        value={option}
        onChange={setOption}
        disabled={disabled}
      >
        {options &&
          options.map((option, index) => (
            <ComboboxOption key={index} value={option.value}>
              {option.text}
            </ComboboxOption>
          ))}
      </Combobox>
    </Box>
  );
}
