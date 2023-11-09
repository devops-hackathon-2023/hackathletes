import { useFetchAppModuleDeploymentUnits, useGetCurrentModuleId } from '@/queries';
import { Skeleton, Stack } from '@mui/material';
import { CodeMetricsCard } from '@/components/dashboard/CodeMetricsCard';
import React from 'react';

export const CodeMetricsSummary = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentUnits, isLoading } = useFetchAppModuleDeploymentUnits(moduleId);
  return (
    <Stack direction="row" spacing={2}>
      {isLoading ? (
        <Skeleton animation="wave" width="200px" height="220px" />
      ) : (
        deploymentUnits?.page?.map((deploymentUnit: any) => (
          <CodeMetricsCard key={deploymentUnit.id} deploymentUnit={deploymentUnit} />
        ))
      )}
    </Stack>
  );
};
