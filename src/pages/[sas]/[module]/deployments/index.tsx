import { Layout } from '@/components/module-details/Layout';
import { useFetchAppModuleLatestDeploymentUnits, useGetCurrentModuleId } from '@/queries';
import { Stack } from '@mui/material';
import { DeploymentCard, DeploymentsHistory } from '@/components';

const DeploymentsPage = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentUnitVersions } = useFetchAppModuleLatestDeploymentUnits(moduleId);
  return (
    <Layout>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Stack spacing={2}>
          {deploymentUnitVersions?.map((deploymentUnit: any) => (
            <DeploymentCard key={deploymentUnit.id} deploymentUnitVersion={deploymentUnit} />
          ))}
        </Stack>
        <Stack direction="column" flexGrow={1}>
          <DeploymentsHistory />
        </Stack>
      </Stack>
    </Layout>
  );
};
export default DeploymentsPage;
