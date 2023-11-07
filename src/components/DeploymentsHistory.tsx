import {
  useFetchAppModuleDeploymentUnits,
  useFetchDeploymentsByAppModuleId,
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
import { ClearIcon } from '@mui/x-date-pickers';
import { StatusDot } from '@/components/StatusDot';
import { Storage } from '@mui/icons-material';
import SmallChip from '@/components/SmallChip';
import { resolvePlatform, toRelativeTime } from '@/utils';
import GitBranch from '@/icons/GitBranch';

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const resolveDeploymentResultMesage = (version: string, deploymentResult: string, environment: string) => {
  if (deploymentResult === 'SUCCESS') {
    return `Build ${version} was deployed to ${environment}`;
  }
  if (deploymentResult === 'FAILED') {
    return `Build ${version} failed`;
  }
  return `Build ${version} is in progress`;
};

const DeploymentResultText = ({ deployment }: { deployment: Deployment }) => {
  const { data: deploymentUnitVersion } = useFetchDeploymentUnitVersion(deployment.versionId);
  const deploymentResult = deployment.status;
  return (
    <Typography color="primary.main">
      {resolveDeploymentResultMesage(
        deploymentUnitVersion?.version || '',
        deploymentResult,
        deployment.environment.toLowerCase()
      )}
    </Typography>
  );
};

const DeploymentGitBranch = ({ deployment }: { deployment: Deployment }) => {
  const { data: deploymentUnitVersion } = useFetchDeploymentUnitVersion(deployment.versionId);
  return <Typography color="text.secondary">{deploymentUnitVersion?.gitBranch}</Typography>;
};

const DeployedByText = styled(Typography)({
  fontSize: '13px',
});

export const DeploymentsHistory = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deployments } = useFetchDeploymentsByAppModuleId(moduleId);
  const { data: deploymentUnits } = useFetchAppModuleDeploymentUnits(moduleId);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const handleUnitChange = (event: any) => {
    setSelectedUnitId(event.target.value === '' ? null : (event.target.value as string));
  };

  const filteredDeployments = useMemo(
    () =>
      selectedUnitId
        ? deployments?.page.filter((deployment: Deployment) => deployment.deploymentUnitId === selectedUnitId)
        : deployments?.page,
    [selectedUnitId, deployments]
  );

  return (
    <div>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4">Recent activity</Typography>
        <FormControl>
          <Select
            size="small"
            sx={{ width: 300 }}
            value={selectedUnitId ?? ''}
            displayEmpty
            onChange={handleUnitChange}
            renderValue={(selected) => {
              if (!selected) return <em>All Units</em>;
              const selectedUnit = deploymentUnits?.page.find((unit: DeploymentUnit) => unit.id === selected);
              return selectedUnit ? selectedUnit.name : <em>All Units</em>;
            }}
          >
            <MenuItem value="">
              <em>All Units</em> {/* Option to clear selection */}
            </MenuItem>
            {deploymentUnits?.page.map((unit: DeploymentUnit) => (
              <MenuItem key={unit.id} value={unit.id}>
                {unit.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
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
                    <Stack direction="row" spacing={1} mb={0.5}>
                      <Storage />
                      <Typography>{deployment.environment.toLowerCase()}</Typography>
                    </Stack>
                    <SmallChip label={resolvePlatform(deployment.platform)} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <GitBranch />
                      <DeploymentGitBranch deployment={deployment} />
                    </Stack>
                    <Typography>{toRelativeTime(deployment.startedAt)}</Typography>
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
