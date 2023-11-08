import { Layout } from '@/components/module-details/Layout';
import { useFetchAppModuleLatestDeploymentUnits, useGetCurrentModuleId } from '@/queries';
import { Skeleton, Stack } from '@mui/material';
import { DeploymentCard, DeploymentsHistory } from '@/components';

const DeploymentsPage = () => {
  const moduleId = useGetCurrentModuleId();

  const { data: deploymentUnitVersions, isLoading } = useFetchAppModuleLatestDeploymentUnits(moduleId);

  return (
    <Layout>
      <Stack direction="row" spacing={2} sx={{ mb: 3, overflowY: 'auto', p: 0.5 }}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx: number) => (
              <Skeleton key={idx} animation="wave" width="300px" height="550px" sx={{ my: '-100px !important' }} />
            ))
          : deploymentUnitVersions.map((deploymentUnit: any) => (
              <DeploymentCard key={deploymentUnit.id} deploymentUnitVersion={deploymentUnit} />
            ))}
      </Stack>

      <DeploymentsHistory />
    </Layout>
  );
};

export default DeploymentsPage;
