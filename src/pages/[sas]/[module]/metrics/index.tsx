import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/module-details/Layout';
import {
  useFetchAppModuleDeploymentUnits,
  useFetchDeploymentUnitVersionsByDeploymentUnitId,
  useFetchLatestSuccessfulDeploymentForEachEnvironmentByDeploymentUnit,
  useFetchQualityGates,
  useFetchQualityGatesByDeploymentUnitVersionId,
  useGetCurrentModuleId,
} from '@/queries';
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  LinearProgress,
  MenuItem,
  Select as MuiSelect,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { DeploymentUnit, DeploymentUnitVersion, QualityGate } from '@/types';
import { styled } from '@mui/material/styles';
import { ENVIRONMENTS, QUALITY_GATE_TYPES } from '@/constants';
import { formatQualityType } from '@/utils/qualityGate';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from 'next/link';
import { useRouter } from 'next/router';

<<<<<<< HEAD
const ScrollableTableContainer = styled('div')({
  overflowX: 'auto',
});

const SuccessIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  color: theme.palette.success.main,
}));
const ErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));
=======
interface VersionSelectProps {
  deploymentUnit: DeploymentUnit;
  fullWidthCard?: boolean;
}

const Select = styled(MuiSelect)({
  width: '300px',
});

const VersionSelect = ({ deploymentUnit, fullWidthCard }: VersionSelectProps) => {
  const { data: deploymentUnitVersions } = useFetchDeploymentUnitVersionsByDeploymentUnitId(deploymentUnit.id);
>>>>>>> 5c96ed40eed234be97180cbe746e7a415355c617

const resolveResultIcon = (result: string) => (result === 'PASSED' ? <SuccessIcon /> : <ErrorIcon />);

const QualityGateTableRow = ({
  qualityGateType,
  unit,
  environment,
}: {
  unit: DeploymentUnit;
  environment: (typeof ENVIRONMENTS)[number];
  qualityGateType: (typeof QUALITY_GATE_TYPES)[number];
}) => {
  const router = useRouter();
  const { sas, module: mod } = router.query;

  const { data: latestSuccessfulDeployments, isLoading } =
    useFetchLatestSuccessfulDeploymentForEachEnvironmentByDeploymentUnit(unit.id);

  const deploymentOnEnv = useMemo(
    () => latestSuccessfulDeployments?.find((deployment) => deployment.environment === environment),
    [latestSuccessfulDeployments, environment]
  );
  // Quality gates
  const {
    data: qualityGates,
    isLoading: qualityGateIsLoading,
    isSuccess: qualityGateIsSuccess,
  } = useFetchQualityGates({
    versionId: deploymentOnEnv?.versionId,
    appModuleId: unit.appModuleId,
    type: qualityGateType,
  });

  if (isLoading || qualityGateIsLoading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <Skeleton variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" />
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }

  return (
<<<<<<< HEAD
    <>
      {qualityGates?.page.map((qualityGate: QualityGate) => (
        <TableRow key={`${qualityGate.id}_${unit.id}`}>
          <TableCell>
            <Link href={`/${sas}/${mod}/${unit.name}/metrics`}>{unit.name}</Link>
          </TableCell>
          <TableCell>{resolveResultIcon(qualityGate.result)}</TableCell>
          <TableCell>
            {qualityGate.percent ? (
              <Stack direction="row" alignItems="center" spacing={2}>
                <LinearProgress sx={{ width: '150px' }} variant="determinate" value={qualityGate.percent} />
                <Typography whiteSpace="nowrap">{qualityGate.percent} %</Typography>
              </Stack>
            ) : (
              qualityGate.rating
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
=======
    <Grid item xs={12} md={fullWidthCard ? 12 : 6}>
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Typography variant="h4">{deploymentUnit?.name}</Typography>
            <FormControl>
              <Select size="small" onChange={handleVersionChange} value={selectedVersion}>
                {deploymentUnitVersions?.page?.map((deploymentUnitVersion: DeploymentUnitVersion) => (
                  <MenuItem key={deploymentUnitVersion.id} value={deploymentUnitVersion.version}>
                    {deploymentUnitVersion.version}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          {qualityGateIsSuccess && <QualityMetricsTable qualityGates={qualityGate?.page} />}
>>>>>>> 5c96ed40eed234be97180cbe746e7a415355c617

interface QualityMetricsTableProps {
  environment: (typeof ENVIRONMENTS)[number];
  qualityGateType: (typeof QUALITY_GATE_TYPES)[number];
}

const THeadCell = styled(TableCell)({
  fontWeight: 'bold',
});

export const QualityMetricsTable = ({ environment, qualityGateType }: QualityMetricsTableProps) => {
  // Units
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentUnits, isLoading } = useFetchAppModuleDeploymentUnits(moduleId);

  return (
    <ScrollableTableContainer>
      <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <THeadCell>Unit</THeadCell>
            <THeadCell>Result</THeadCell>
            <THeadCell>Mark</THeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <>
              {Array.from({ length: 8 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
          {deploymentUnits?.page.map((unit: DeploymentUnit) => (
            <QualityGateTableRow
              key={unit.id}
              unit={unit}
              environment={environment}
              qualityGateType={qualityGateType}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollableTableContainer>
  );
};

const MetricsPage = () => {
  const [selectedQualityGate, setSelectedQualityGate] = useState<(typeof QUALITY_GATE_TYPES)[number]>(
    QUALITY_GATE_TYPES[0]
  );
  const [selectedEnvironment, setSelectedEnvironment] = useState(ENVIRONMENTS[0]);

  return (
    <Layout>
      <Grid container spacing={2}>
<<<<<<< HEAD
        <Grid item xs={12} md={3}>
          <Stack spacing={2}>
            <ToggleButtonGroup
              orientation="vertical"
              value={selectedQualityGate}
              exclusive
              onChange={(e, val) => setSelectedQualityGate(val)}
              sx={{ overflowX: 'auto', width: '100%' }}
            >
              {QUALITY_GATE_TYPES?.map((qualityGateType: string) => (
                <ToggleButton
                  key={qualityGateType}
                  value={qualityGateType}
                  sx={{ border: 'none', alignItems: 'start', justifyContent: 'start' }}
                >
                  <Typography sx={{ textTransform: 'none' }} textAlign="left" noWrap mr={2}>
                    {formatQualityType(qualityGateType)}
                  </Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <Typography variant="h6">Environment</Typography>
            <ToggleButtonGroup
              orientation="vertical"
              value={selectedEnvironment}
              exclusive
              onChange={(e, val) => setSelectedEnvironment(val)}
              sx={{ overflowX: 'auto', width: '100%' }}
            >
              {ENVIRONMENTS?.map((environment: string) => (
                <ToggleButton
                  key={environment}
                  value={environment}
                  sx={{ border: 'none', alignItems: 'start', justifyContent: 'start' }}
                >
                  <Typography sx={{ textTransform: 'none' }} textAlign="left" noWrap mr={2}>
                    {environment}
                  </Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
        </Grid>
        <Grid item xs={12} md={9}>
          <QualityMetricsTable qualityGateType={selectedQualityGate} environment={selectedEnvironment} />
          {/* {qualityGateIsLoading &&
            Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton key={idx} animation="wave" width="100%" height="6rem" sx={{ my: -3.7 }} />
            ))} */}
        </Grid>
=======
        {deploymentUnits?.page?.map((deploymentUnit: DeploymentUnit) => (
          <VersionSelect
            key={deploymentUnit.id}
            deploymentUnit={deploymentUnit}
            fullWidthCard={deploymentUnits?.page?.length === 1}
          />
        ))}
>>>>>>> 5c96ed40eed234be97180cbe746e7a415355c617
      </Grid>
    </Layout>
  );
};
export default MetricsPage;
