import { Deployment } from '@/types';
import { useFetchDeploymentOutput } from '@/queries';
import { IconButton } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';

interface OutputButtonProps {
  deployment: Deployment;
  onClick: () => void;
  onOutputFetch: (output: string) => void;
}

const OutputButton = ({ deployment, onClick, onOutputFetch }: OutputButtonProps) => {
  const { data } = useFetchDeploymentOutput(deployment.status);
  return (
    <IconButton
      onClick={() => {
        onClick();
        onOutputFetch(data?.output);
      }}
    >
      <TerminalIcon />
    </IconButton>
  );
};

export default OutputButton;
