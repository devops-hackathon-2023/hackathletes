import { useFetchAppModuleDeploymentUnits, useFetchDeploymentsByAppModuleId, useGetCurrentModuleId } from '@/queries';
import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { Deployment } from '@/types';
import { StatusDot } from '@/components/StatusDot';
import DeploymentResultText from '@/components/DeploymentResultText';
import { BranchAndTime, EnvironmentAndPlatform } from '@/components/DeploymentsHistory';
import React from 'react';

export const RecentActivity = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deployments } = useFetchDeploymentsByAppModuleId(moduleId, 3);
  const { data: deploymentUnits } = useFetchAppModuleDeploymentUnits(moduleId);
  return (
    <TableContainer sx={{ maxHeight: '43vh', overflow: 'hidden', width: '100%' }}>
      <Table>
        <TableBody>
          {deployments?.page?.map((deployment: Deployment) => (
            <TableRow key={deployment.id}>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography fontWeight="bold">
                    {
                      deploymentUnits?.page?.find(
                        (deploymentUnit: any) => deploymentUnit.id === deployment.deploymentUnitId
                      )?.name
                    }
                  </Typography>
                  <StatusDot status={deployment.status} />
                </Stack>
                <DeploymentResultText deployment={deployment} />
              </TableCell>
              <TableCell>
                <EnvironmentAndPlatform deployment={deployment} />
              </TableCell>
              <TableCell>
                <BranchAndTime deployment={deployment} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
