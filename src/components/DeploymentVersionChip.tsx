import { Deployment } from '@/types';
import { useFetchDeploymentUnitVersion } from '@/queries';
import SmallChip from '@/components/SmallChip';

const DeploymentVersionChip = ({ deployment }: { deployment: Deployment }) => {
  const { data: deploymentUnitVersion } = useFetchDeploymentUnitVersion(deployment.versionId);
  return <SmallChip variant="outlined" label={deploymentUnitVersion?.version} />;
};

export default DeploymentVersionChip;
