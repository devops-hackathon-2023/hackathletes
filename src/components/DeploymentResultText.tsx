import { Deployment } from '@/types';
import { useFetchDeploymentUnitVersion } from '@/queries';
import { Typography } from '@mui/material';
import { formatVersion } from '@/utils';

const resolveDeploymentResultMesage = (version: string, deploymentResult: string, environment: string) => {
  if (deploymentResult === 'SUCCESS') {
    return `Build ${version} was deployed to ${environment}`;
  }
  if (deploymentResult === 'FAILED') {
    return `Build ${version} failed`;
  }
  return `Build ${version} is in progress`;
};

const DeploymentResultText = ({ deployment }: { deployment: Deployment }) => {
  const { data: deploymentUnitVersion } = useFetchDeploymentUnitVersion(deployment.versionId);
  const deploymentResult = deployment.status;
  return (
    <Typography color="primary.main">
      {resolveDeploymentResultMesage(
        formatVersion(deploymentUnitVersion?.version || ''),
        deploymentResult,
        deployment.environment.toLowerCase()
      )}
    </Typography>
  );
};

export default DeploymentResultText;
