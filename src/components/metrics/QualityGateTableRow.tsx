import { QualityGate } from '@/types';
import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { formatQualityType } from '@/utils/qualityGate';

const SuccessIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  color: theme.palette.success.main,
}));
const ErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const resolveResultIcon = (result: string) => (result === 'PASSED' ? <SuccessIcon /> : <ErrorIcon />);

const QualityGateTableRow = ({ gate }: { gate: QualityGate }) => {
  const { type, result, rating, percent } = gate;

  return (
    <TableRow>
      <TableCell>{formatQualityType(type)}</TableCell>
      <TableCell>{resolveResultIcon(result)}</TableCell>
      <TableCell>
        {percent ? (
          <Stack direction="row" alignItems="center" spacing={2}>
            <LinearProgress sx={{ width: '150px' }} variant="determinate" value={percent} />
            <Typography whiteSpace="nowrap">{percent} %</Typography>
          </Stack>
        ) : (
          rating
        )}
      </TableCell>
    </TableRow>
  );
};

export default QualityGateTableRow;
