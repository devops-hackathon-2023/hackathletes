import { Layout } from '@/components/module-details/Layout';
import { useFetchAppModuleLatestDeploymentUnits, useGetCurrentModuleId } from '@/queries';
import { Skeleton, Stack } from '@mui/material';
import { DeploymentCard, DeploymentsHistory } from '@/components';

const DeploymentsPage = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentUnitVersions, isLoading } = useFetchAppModuleLatestDeploymentUnits(moduleId);
  return (
    <Layout>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Stack spacing={2}>
          {isLoading ? (
            <Skeleton animation="wave" width="300px" height="500px" sx={{ marginTop: '-100px !important' }} />
          ) : (
            deploymentUnitVersions?.map((deploymentUnit: any) => (
              <DeploymentCard key={deploymentUnit.id} deploymentUnitVersion={deploymentUnit} />
            ))
          )}
        </Stack>
        <Stack direction="column" flexGrow={1}>
          <DeploymentsHistory />
        </Stack>
      </Stack>
    </Layout>
  );
};
export default DeploymentsPage;
