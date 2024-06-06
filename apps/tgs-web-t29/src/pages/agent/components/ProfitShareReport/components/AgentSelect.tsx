import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { media } from '@/theme/breakpoints';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column-reverse;
  gap: 10px;
  overflow: visible;
  
  .MuiFormLabel-root {
    color: #23507D;
  }

  ${media.sm} {
    flex-direction: row;
  }
`;

const Text = styled.div`
  background: #E7F1FB;
  color: #535867;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.sm} {
    max-width: 80px;
  }
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
  const renderSelect = () => {
    if(options.length > 1) {
      return (<FormControl sx={{overflow: 'visible'}}>
          <InputLabel id="simple-select-label">{children}</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={value}
            label="simple-select-label"
            onChange={onChange}
          >
            {
              options.map((option) => 
                <MenuItem value={option} key={option}>
                  {option}%
                </MenuItem>
              )
            }
          </Select>
      </FormControl>)
    }

    if(options.length === 1) {
      return (<Text>{options[0]}%</Text>)
    }

    return null;
  }

  return (
    <Wrapper>
      {renderSelect()}
      {children}
    </Wrapper>
  )
}