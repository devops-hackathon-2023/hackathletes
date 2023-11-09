import { Deployment } from '@/types';
import { useFetchDeploymentUnitVersion } from '@/queries';
import SmallChip from '@/components/SmallChip';
import { Skeleton } from '@mui/material';
import { formatVersion } from '@/utils';

const DeploymentVersionChip = ({ deployment }: { deployment: Deployment }) => {
  const { data: deploymentUnitVersion, isLoading } = useFetchDeploymentUnitVersion(deployment.versionId);
  return isLoading ? (
    <Skeleton width="35px" />
  ) : (
    <SmallChip variant="outlined" label={formatVersion(deploymentUnitVersion?.version)} />
  );
};

export default DeploymentVersionChip;
