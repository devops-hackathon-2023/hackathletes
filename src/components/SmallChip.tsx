import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const SmallChip = styled(Chip)(({ theme }) => ({
  height: '20px',
  fontSize: '0.7rem',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

SmallChip.defaultProps = {
  size: 'small',
};

export default SmallChip;
