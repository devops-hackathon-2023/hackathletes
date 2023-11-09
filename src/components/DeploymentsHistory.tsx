import {
  useFetchAppModuleDeploymentUnits,
  useFetchDeployments,
  useFetchDeploymentUnitVersion,
  useGetCurrentModuleId,
} from '@/queries';
import { useMemo, useState } from 'react';
import { Deployment, DeploymentUnit } from '@/types';
import {
  Alert,
  Avatar,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Snackbar,
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
import { ActionButton } from '@/components/ActionButton';

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

export const DeploymentsHistory = ({ showUnitSelect = true, showTitle = true, unitId }) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [message, setMessage] = useState('');
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
  const handleOpenSnackbar = (isSuccess: boolean, messageParam: string = '') => {
    if (isSuccess) {
      setOpenSuccessSnackbar(true);
    } else {
      setOpenErrorSnackbar(true);
    }
    setMessage(messageParam);
  };

  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

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
      <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

      <Divider sx={{ my: 2 }} />
      <TableContainer sx={{ maxHeight: '73vh', overflow: 'auto' }} component={Paper}>
        <Table>
          <TableBody>
            {(filteredDeployments || [])?.map((deployment: Deployment) => {
              const deploymentUnit = deploymentUnits?.page?.find(
                (unit: DeploymentUnit) => unit.id === deployment.deploymentUnitId
              );
              const { status, id: deploymentId, deployer } = deployment;
              return (
                <TableRow key={deploymentId}>
                  <TableCell>
                    <Stack direction="column">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography fontWeight="bold">{deploymentUnit?.name}</Typography>
                        <StatusDot status={status} />
                        <Typography color="text.secondary">{capitalizeFirstLetter(status.toLowerCase())}</Typography>
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
                        <Typography>{deployer}</Typography>
                      </Stack>
                      <Avatar src={deployer} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <ActionButton
                      deployment={deployment}
                      deploymentUnit={deploymentUnit}
                      handleOpenSnackbar={handleOpenSnackbar}
                    />
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
