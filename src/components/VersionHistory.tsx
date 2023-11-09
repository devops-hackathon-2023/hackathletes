import {
  useFetchAppModuleDeploymentUnits,
  useFetchDeployments,
  useFetchDeploymentUnitVersion,
  useFetchDeploymentUnitVersionsByDeploymentUnitId,
  useGetCurrentModuleId,
} from '@/queries';
import { useMemo, useState } from 'react';
import { Deployment, DeploymentUnit } from '@/types';
import {
  Avatar,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { StatusDot } from '@/components/StatusDot';
import { Storage } from '@mui/icons-material';
import SmallChip from '@/components/SmallChip';
import { resolvePlatform, toRelativeTime } from '@/utils';
import GitBranch from '@/icons/GitBranch';
import DeploymentResultText from '@/components/DeploymentResultText';

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

type VersionsHistoryProps = {
  unitId: string;
};
export const VersionsHistory = ({ unitId }: VersionsHistoryProps) => {
  const { data: deploymentUnitVersions } = useFetchDeploymentUnitVersionsByDeploymentUnitId(unitId);

  return (
    <div>
      <TableContainer sx={{ maxHeight: '73vh', overflow: 'auto' }} component={Paper}>
        <Table>
          <TableBody>
            {deploymentUnitVersions?.page?.map((version) => (
              <TableRow key={version.id}>
                <TableCell>
                  <Stack direction="column">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography fontWeight="bold">{version?.version}</Typography>

                      <Typography color="text.secondary">{version.createdAt || '2 days ago'}</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  {' '}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <GitBranch />
                    <Typography color="text.secondary">{version?.gitBranch}</Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
