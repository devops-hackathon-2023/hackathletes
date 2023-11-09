import { useFetchAppModuleDeploymentUnits, useGetCurrentModuleId } from '@/queries';
import { Stack } from '@mui/material';
import { CodeMetricsCard } from '@/components';
import React from 'react';

export const CodeMetricsSummary = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentUnits } = useFetchAppModuleDeploymentUnits(moduleId);
  return (
    <Stack direction="row" spacing={2}>
      {deploymentUnits?.page?.map((deploymentUnit: any) => (
        <CodeMetricsCard key={deploymentUnit.id} deploymentUnit={deploymentUnit} />
      ))}
    </Stack>
  );
};
