import { useFetchLatestDeployments, useFetchLatestDeploymentUnitVersion } from '@/queries';
import { Chip, Skeleton, Stack, Typography } from '@mui/material';
import { Deployment } from '@/types';

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
  const { data: latestDeployments, isLoading } = useFetchLatestDeployments(latestDeploymentUnitVersion?.id);
  const chipColor = resolveBadgeColor(latestDeployments);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexGrow={1}>
        <Typography variant="body2" color="text.secondary">
          {deploymentUnit.name}
        </Typography>
        {isLoading ? (
          <Skeleton variant="text" width={37} height={29} />
        ) : (
          <Chip
            sx={{
              height: '20px',
              fontSize: '0.7rem',
              '& .MuiChip-label': {
                padding: '0 8px',
              },
            }}
            size="small"
            color={chipColor}
            label={latestDeploymentUnitVersion?.version}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default ModuleDeployments;
