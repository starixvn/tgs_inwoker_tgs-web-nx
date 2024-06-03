import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: visible;
`;

type Props = {
  options: string[],
  onChange: (e: SelectChangeEvent) => void,
  value: string,
  children: ReactNode,
}

export const AgentSelect = ({
  options,
  onChange,
  value,
  children,
}: Props) => {
  return (
    <Wrapper>
      <FormControl sx={{overflow: 'visible'}}>
          <InputLabel id="simple-select-label">{children}</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={value}
            label="simple-select-label"
            onChange={onChange}
            disabled
          >
            {
              options.map((option) => 
                <MenuItem value={option} key={option}>
                  {option}%
                </MenuItem>
              )
            }
          </Select>
      </FormControl>
      {children}
    </Wrapper>
  )
}