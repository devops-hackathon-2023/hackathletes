import { DeploymentUnit } from '@/types';
import {
  useFetchLatestDeploymentUnitVersionByDeploymentUnitId,
  useFetchQualityGatesByDeploymentUnitVersionId,
} from '@/queries';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ErrorOutline } from '@mui/icons-material';
import React from 'react';

export const CodeMetricsCard = ({ deploymentUnit }: { deploymentUnit: DeploymentUnit }) => {
  const { data: latestDeploymentUnitVersion } = useFetchLatestDeploymentUnitVersionByDeploymentUnitId(
    deploymentUnit.id
  );
  const { data: qualityGate } = useFetchQualityGatesByDeploymentUnitVersionId(latestDeploymentUnitVersion?.id);
  const numberOfPassedTests = qualityGate?.page?.filter((gate: any) => gate.result === 'PASSED').length;
  const numberOfFailedTests = qualityGate?.page?.filter((gate: any) => gate.result === 'FAILED').length;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{deploymentUnit.name}</Typography>
        <Stack direction="row" alignItems="center" spacing={2} mt={1}>
          <Stack alignItems="center">
            <CheckCircleOutlineIcon sx={{ color: 'success.main' }} />
            <Typography variant="h4">{numberOfPassedTests}</Typography>
            <Typography>passed</Typography>
          </Stack>
          <Stack alignItems="center">
            <ErrorOutline sx={{ color: 'error.main' }} />
            <Typography variant="h4">{numberOfFailedTests}</Typography>
            <Typography>failed</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
