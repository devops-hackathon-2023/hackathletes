import { Deployment, DeploymentUnit } from '@/types';
import { useQueryClient } from 'react-query';
import { useFinishDeploymentMutation, useStartDeploymentMutation } from '@/mutations';
import { useFetchDeploymentUnitVersion } from '@/queries';
import { IconButton, Skeleton } from '@mui/material';
import { Pause, Replay } from '@mui/icons-material';

interface ActionButtonProps {
  deployment: Deployment;
  deploymentUnit: DeploymentUnit;
  handleOpenSnackbar: any;
}

export const ActionButton = ({ deployment, deploymentUnit, handleOpenSnackbar }: ActionButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate: mutateStartDeployment } = useStartDeploymentMutation();
  const { data: deploymentUnitVersion, isLoading } = useFetchDeploymentUnitVersion(deployment.versionId);
  const { mutate: mutateFinishDeployment } = useFinishDeploymentMutation();

  if (!deploymentUnit || !deployment || !deploymentUnitVersion || isLoading) {
    return <Skeleton variant="circular" height={40} width={40} />;
  }

  const { environment, changeTicketId, deployer, platform, status } = deployment;
  const { name: deploymentUnitName } = deploymentUnit;

  return (
    <IconButton
      onClick={() => {
        if (status === 'STARTED') {
          mutateFinishDeployment(
            {
              deploymentId: deployment.id,
              status,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(['deployments']);
                handleOpenSnackbar(true, 'Deployment finished successfully');
              },
              onError: (error: TypeError) => {
                const errorMsg = error.message || 'An unknown error occurred';
                handleOpenSnackbar(false, errorMsg);
              },
            }
          );
        } else {
          mutateStartDeployment(
            {
              environment,
              version: deploymentUnitVersion?.version,
              deploymentUnitName,
              changeTicketId,
              deployer: 'Dominik Vít',
              platform,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(['deployments']);
                handleOpenSnackbar(true, 'Deployment started successfully');
              },
              onError: (error: TypeError) => {
                const errorMsg = error.message || 'An unknown error occurred';
                handleOpenSnackbar(false, errorMsg);
              },
            }
          );
        }
      }}
    >
      {status === 'STARTED' ? <Pause /> : <Replay />}
    </IconButton>
  );
};
