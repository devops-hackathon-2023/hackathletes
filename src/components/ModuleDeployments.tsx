import { useFetchDeploymentsByVersionId, useFetchLatestDeploymentUnitVersion } from '@/queries';
import { Skeleton, Stack, Typography } from '@mui/material';
import { Deployment } from '@/types';
import SmallChip from '@/components/SmallChip';

const resolveBadgeColor = (deployments: Deployment[] | undefined) => {
  if (deployments?.every((deployment: Deployment) => deployment.status === 'SUCCESS')) {
    return 'success';
  }
  if (deployments?.every((deployment: Deployment) => deployment.status === 'FAILED')) {
    return 'error';
  }
  return 'warning';
};
const ModuleDeployments = ({ deploymentUnit }: any) => {
  const latestDeploymentUnitVersion = useFetchLatestDeploymentUnitVersion(deploymentUnit.id);
  const { data: latestDeployments, isLoading } = useFetchDeploymentsByVersionId(latestDeploymentUnitVersion?.id);
  const chipColor = resolveBadgeColor(latestDeployments);

  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" flexGrow={1}>
      <Typography variant="body2" color="text.secondary">
        {deploymentUnit.name}
      </Typography>
      {isLoading ? (
        <Skeleton variant="text" width={37} height={29} />
      ) : (
        <SmallChip color={chipColor} label={latestDeploymentUnitVersion?.version} />
      )}
    </Stack>
  );
};

export default ModuleDeployments;
