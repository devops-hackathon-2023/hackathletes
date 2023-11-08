import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { QualityGate } from '@/types';
import React from 'react';
import { styled } from '@mui/material/styles';
import QualityGateTableRow from '@/components/metrics/QualityGateTableRow';

const ScrollableTableContainer = styled('div')({
  overflowX: 'auto',
});

interface QualityMetricsTableProps {
  qualityGates: QualityGate[];
}

const THeadCell = styled(TableCell)({
  fontWeight: 'bold',
});

export const QualityMetricsTable = ({ qualityGates }: QualityMetricsTableProps) => (
  <ScrollableTableContainer>
    <Table stickyHeader sx={{tableLayout: 'fixed'}}>
      <TableHead>
        <TableRow>
          <THeadCell>Test</THeadCell>
          <THeadCell>Result</THeadCell>
          <THeadCell>Mark</THeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {qualityGates?.map((gate: QualityGate) => <QualityGateTableRow key={gate.type} gate={gate} />)}
      </TableBody>
    </Table>
  </ScrollableTableContainer>
);
