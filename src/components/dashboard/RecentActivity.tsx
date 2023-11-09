import { useFetchAppModuleDeploymentUnits, useFetchDeploymentsByAppModuleId, useGetCurrentModuleId } from '@/queries';
import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Skeleton } from '@mui/material';
import { Deployment } from '@/types';
import { StatusDot } from '@/components/StatusDot';
import DeploymentResultText from '@/components/DeploymentResultText';
import { BranchAndTime, EnvironmentAndPlatform } from '@/components/DeploymentsHistory';
import React from 'react';

export const RecentActivity = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentsRes, isLoading } = useFetchDeploymentsByAppModuleId(moduleId);
  const { data: deploymentUnits } = useFetchAppModuleDeploymentUnits(moduleId);

  const deployments = deploymentsRes?.page?.slice(0, 3);
  return (
    <TableContainer sx={{ maxHeight: '43vh', overflow: 'hidden', width: '100%' }}>
      <Table>
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} width="100%" height="7rem" sx={{ my: -3.7 }} />
              ))
            : deployments?.map((deployment: Deployment) => (
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
