import React from 'react'
import { SelectContent ,SelectItem } from './ui/select';

interface SelectContentAndItemProps {
    array: any[];
}

function SelectContentAndItem({array}: SelectContentAndItemProps) {
  return (
    <SelectContent>
        {array.map((item) => (
        <SelectItem key={item} value={item}>
            {item}
        </SelectItem>
        ))}
    </SelectContent>
)
}

export default SelectContentAndItem