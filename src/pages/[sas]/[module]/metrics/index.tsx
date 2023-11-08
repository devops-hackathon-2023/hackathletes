import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/module-details/Layout';
import {
  useFetchAppModuleDeploymentUnits,
  useFetchDeploymentUnitVersionsByDeploymentUnitId,
  useFetchQualityGatesByDeploymentUnitVersionId,
  useGetCurrentModuleId,
} from '@/queries';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select as MuiSelect,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { DeploymentUnit, DeploymentUnitVersion } from '@/types';
import { styled } from '@mui/material/styles';
import { QualityMetricsTable } from '@/components';

interface VersionSelectProps {
  deploymentUnit: DeploymentUnit;
}

const Select = styled(MuiSelect)({
  width: '300px',
});

const VersionSelect = ({ deploymentUnit }: VersionSelectProps) => {
  const { data: deploymentUnitVersions } = useFetchDeploymentUnitVersionsByDeploymentUnitId(deploymentUnit.id);

  const [selectedVersion, setSelectedVersion] = useState(deploymentUnitVersions?.page?.[0]?.version || '');

  const selectedDeploymentUnitVersionId = useMemo(() => {
    const selectedDeploymentUnitVersion = deploymentUnitVersions?.page?.find(
      (deploymentUnitVersion: DeploymentUnitVersion) => deploymentUnitVersion.version === selectedVersion
    );
    return selectedDeploymentUnitVersion?.id;
  }, [deploymentUnitVersions?.page, selectedVersion]);

  const {
    data: qualityGate,
    isLoading: qualityGateIsLoading,
    isSuccess: qualityGateIsSuccess,
  } = useFetchQualityGatesByDeploymentUnitVersionId(selectedDeploymentUnitVersionId);

  useEffect(() => {
    if (deploymentUnitVersions?.page?.length > 0 && selectedVersion === '') {
      setSelectedVersion(deploymentUnitVersions.page[0].version);
    }
  }, [deploymentUnitVersions, selectedVersion]);

  const handleVersionChange = (event: any) => {
    setSelectedVersion(event.target.value as string);
  };

  return (
    <Grid item xs={12} md={6}>
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

          {qualityGateIsLoading && (
              Array.from({ length: 8 }).map((_, idx) => (
                <Skeleton key={idx} animation="wave" width="100%" height="6rem" sx={{ my: -3.7 }} />
              ))
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

const MetricsPage = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentUnits } = useFetchAppModuleDeploymentUnits(moduleId);
  return (
    <Layout>
      <Grid container spacing={2}>
        {deploymentUnits?.page?.map((deploymentUnit: DeploymentUnit) => (
          <VersionSelect key={deploymentUnit.id} deploymentUnit={deploymentUnit} />
        ))}
      </Grid>
    </Layout>
  );
};
export default MetricsPage;
