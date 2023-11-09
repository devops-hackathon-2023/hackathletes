import {
  useFetchAppModuleDeploymentUnits,
  useFetchDeployments,
  useFetchDeploymentUnitVersion,
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

const DeploymentGitBranch = ({ deployment }: { deployment: Deployment }) => {
  const { data: deploymentUnitVersion } = useFetchDeploymentUnitVersion(deployment.versionId);
  return <Typography color="text.secondary">{deploymentUnitVersion?.gitBranch}</Typography>;
};

const DeployedByText = styled(Typography)({
  fontSize: '13px',
});

export const EnvironmentAndPlatform = ({ deployment }: { deployment: Deployment }) => (
  <>
    <Stack direction="row" spacing={1} mb={0.5}>
      <Storage />
      <Typography>{deployment.environment.toLowerCase()}</Typography>
    </Stack>
    <SmallChip label={resolvePlatform(deployment.platform)} />
  </>
);

export const BranchAndTime = ({ deployment }: { deployment: Deployment }) => (
  <>
    <Stack direction="row" alignItems="center" spacing={1}>
      <GitBranch />
      <DeploymentGitBranch deployment={deployment} />
    </Stack>
    <Typography>{toRelativeTime(deployment.startedAt)}</Typography>
  </>
);

type DeploymentsHistoryProps = {
  unitId?: string;
  showUnitSelect?: boolean;
  showTitle?: boolean;
};
export const DeploymentsHistory = ({ showUnitSelect = true, showTitle = true, unitId }: DeploymentsHistoryProps) => {
  const moduleId = useGetCurrentModuleId();
  const { data: deployments } = useFetchDeployments({
    appModuleId: moduleId,
  });
  const { data: deploymentUnits } = useFetchAppModuleDeploymentUnits(moduleId);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const handleUnitChange = (event: any) => {
    setSelectedUnitId(event.target.value === '' ? null : (event.target.value as string));
  };

  const unitIdToFilter = unitId || selectedUnitId;

  const filteredDeployments = useMemo(
    () =>
      unitIdToFilter
        ? deployments?.page.filter((deployment: Deployment) => deployment.deploymentUnitId === unitIdToFilter)
        : deployments?.page,
    [unitIdToFilter, deployments]
  );

  return (
    <div>
      {showTitle && (
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h4">Recent activity</Typography>
          {showUnitSelect && (
            <FormControl>
              <Select
                size="small"
                sx={{ width: 300 }}
                value={unitIdToFilter ?? ''}
                displayEmpty
                onChange={handleUnitChange}
                renderValue={(selected) => {
                  if (!selected) return <em>All Units</em>;
                  const selectedUnit = deploymentUnits?.page.find((unit: DeploymentUnit) => unit.id === selected);
                  return selectedUnit ? selectedUnit.name : <em>All Units</em>;
                }}
              >
                <MenuItem value="">
                  <em>All Units</em>
                </MenuItem>
                {deploymentUnits?.page.map((unit: DeploymentUnit) => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
      )}
      <Divider sx={{ my: 2 }} />
      <TableContainer sx={{ maxHeight: '73vh', overflow: 'auto' }} component={Paper}>
        <Table>
          <TableBody>
            {filteredDeployments?.map((deployment: Deployment) => {
              const deploymentUnit = deploymentUnits?.page.find(
                (unit: DeploymentUnit) => unit.id === deployment.deploymentUnitId
              );
              return (
                <TableRow key={deployment.id}>
                  <TableCell>
                    <Stack direction="column">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography fontWeight="bold">{deploymentUnit?.name}</Typography>
                        <StatusDot status={deployment.status} />
                        <Typography color="text.secondary">
                          {capitalizeFirstLetter(deployment.status.toLowerCase())}
                        </Typography>
                      </Stack>
                      <DeploymentResultText deployment={deployment} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <EnvironmentAndPlatform deployment={deployment} />
                  </TableCell>
                  <TableCell>
                    <BranchAndTime deployment={deployment} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Stack>
                        <DeployedByText color="text.secondary">Deployed by</DeployedByText>
                        <Typography>{deployment.deployer}</Typography>
                      </Stack>
                      <Avatar src={deployment.deployer} />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
