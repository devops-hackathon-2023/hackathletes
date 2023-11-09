import React from 'react';
import { styled, Dialog } from '@mui/material';

const StyledPre = styled('pre')({
  backgroundColor: '#000',
  color: '#fff',
  padding: '16px',
  borderRadius: '4px',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  margin: 0,
});

interface TerminalProps {
  output: string;
}

const Terminal = ({ output }: TerminalProps) => {
  const formattedOutput = output.replace(/\r\n/g, '\n');
  const outputLines = formattedOutput.split('\n');
  return (
    <StyledPre id="terminal">
      {outputLines.map((line: string, index: number) => (
        <div key={index}>{line}</div>
      ))}
    </StyledPre>
  );
};

interface TerminalDialogPr {
  output: string;
  open: boolean;
  onClose: () => void;
  onExited: () => void;
}
const TerminalDialog = ({ output, open, onClose, onExited }: TerminalDialogPr) => (
  <Dialog
    TransitionProps={{
      onExited,
    }}
    onClose={onClose}
    open={open}
    maxWidth="md"
    fullWidth
  >
    <Terminal output={output} />
  </Dialog>
);

export default TerminalDialog;
