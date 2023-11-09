import React, { useEffect, useMemo, useState } from 'react';
import { UnitLayout } from '@/components/unit-details/UnitLayout';
import {
  Box,
  Divider,
  Grid,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { QualityMetricsTable } from '@/components';
import {
  useFetchDeploymentUnitVersionsByDeploymentUnitId,
  useFetchDeploymentUnits,
  useFetchLatestSuccessfulDeploymentForEachEnvironmentByDeploymentUnit,
  useFetchQualityGatesByDeploymentUnitVersionId,
} from '@/queries';
import { useRouter } from 'next/router';
import { Deployment, DeploymentUnit, DeploymentUnitVersion } from '@/types';
import DeploymentVersionChip from '@/components/DeploymentVersionChip';

interface VersionSelectProps {
  deploymentUnit: DeploymentUnit;
}

const VersionSelect = ({ deploymentUnit }: VersionSelectProps) => {
  const { data: deploymentUnitVersions } = useFetchDeploymentUnitVersionsByDeploymentUnitId(deploymentUnit.id);

  // Version filter
  const [selectedVersion, setSelectedVersion] = useState(deploymentUnitVersions?.page?.[0]?.id || '');
  const handleVersionChange = (val: string) => {
    setSelectedVersion(val);
  };

  // Version per environment
  const { data: latestSuccessfulDeployments } =
    useFetchLatestSuccessfulDeploymentForEachEnvironmentByDeploymentUnit(deploymentUnit.id);

  const {
    data: qualityGate,
    isLoading: qualityGateIsLoading,
    isSuccess: qualityGateIsSuccess,
  } = useFetchQualityGatesByDeploymentUnitVersionId(selectedVersion);

  useEffect(() => {
    if (deploymentUnitVersions?.page && deploymentUnitVersions.page.length > 0 && selectedVersion === '') {
      setSelectedVersion(deploymentUnitVersions.page[0].id);
    }
  }, [deploymentUnitVersions, selectedVersion]);


  const numberOfNotPassedGates = useMemo(() => {
    if (qualityGate?.page?.length === 0) return 0;
    return qualityGate?.page?.filter((metric: any) => metric.result !== 'PASSED').length;
  }, [qualityGate?.page]);

  const qualityAllPassed = numberOfNotPassedGates === 0;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2}>
        {qualityGateIsLoading ? (
          <Skeleton animation="wave" width="100%" height="6rem" sx={{ my: -3.7 }} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'start',
              backgroundColor: qualityAllPassed ? '#2DC6AA' : '#C62D80',
              p: 4,
            }}
          >
            <Typography variant="h6" color="white">
              {qualityAllPassed ? 'Passed' : 'Failed'}
            </Typography>
            <Typography color="white">
              {qualityAllPassed ? 'All quality gates passed' : `${numberOfNotPassedGates} quality gates failed`}
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={7}>
        {qualityGateIsSuccess && <QualityMetricsTable qualityGates={qualityGate?.page} />}

        {qualityGateIsLoading &&
          Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton key={idx} animation="wave" width="100%" height="6rem" sx={{ my: -3.7 }} />
          ))}
      </Grid>
      <Grid item xs={12} md={3} flexShrink={0} pl={4}>
        <ToggleButtonGroup
          orientation="vertical"
          value={selectedVersion}
          exclusive
          onChange={(e, val) => handleVersionChange(val)}
          sx={{ overflowX: 'auto', width: '100%' }}
        >
          {latestSuccessfulDeployments?.map((deployment: Deployment) => {
            const { environment } = deployment;
            return (
              <ToggleButton
                key={environment}
                value={deployment.versionId}
                sx={{ border: 'none', alignItems: 'start', justifyContent: 'start' }}
              >
                <Typography sx={{ textTransform: 'none' }} textAlign="left" noWrap mr={2}>
                  {environment.toLowerCase()}
                </Typography>
                <DeploymentVersionChip deployment={deployment} />
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
        <Divider sx={{ backgroundColor: (theme) => theme.palette.grey[200], marginTop: 3, marginBottom: 3 }} />
        <ToggleButtonGroup
          orientation="vertical"
          value={selectedVersion}
          exclusive
          onChange={(e, val) => handleVersionChange(val)}
          sx={{ overflowX: 'auto', width: '100%' }}
        >
          {deploymentUnitVersions?.page?.map((deploymentUnitVersion: DeploymentUnitVersion) => (
            <ToggleButton
              key={deploymentUnitVersion.id}
              value={deploymentUnitVersion.id}
              sx={{ border: 'none', alignItems: 'start', justifyContent: 'start' }}
            >
              <Typography sx={{ textTransform: 'capitalize' }} noWrap>
                {deploymentUnitVersion.version}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Stack />
      </Grid>
    </Grid>
  );
};

const DashboardPage = () => {
  const router = useRouter();
  const { unit } = router.query;
  const {
    data: unitsData,
  } = useFetchDeploymentUnits({
    name: unit as string,
  });

  const unitData = unitsData?.page[0];

  return (
    <UnitLayout tab="metrics">
      <Typography variant="h3">Metrics</Typography>
      {unitData && <VersionSelect key={unitData.id} deploymentUnit={unitData} />}
    </UnitLayout>
  );
};

export default DashboardPage;
