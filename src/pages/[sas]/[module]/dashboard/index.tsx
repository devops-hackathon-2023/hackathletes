import React from 'react';
import { Layout } from '@/components/module-details/Layout';
import { Grid, Stack, Typography } from '@mui/material';
import { useFetchAppModuleDeploymentUnits, useGetCurrentModuleId } from '@/queries';
import { CodeMetricsSummary, DeploymentCard, GithubBugs, RecentActivity } from '@/components';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentUnits } = useFetchAppModuleDeploymentUnits(moduleId);
  return (
    <Layout>
      <Stack>
        <Grid container spacing={10} mb={2}>
          {deploymentUnits?.page?.map((deploymentUnit: any) => (
            <Grid item sm={6} md={5} lg={3} key={deploymentUnit.id}>
              <DeploymentCard deploymentUnit={deploymentUnit} />
            </Grid>
          ))}
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Bugs by priority</Typography>
            <GithubBugs />
          </Grid>
        </Grid>
        <Grid container alignItems="flex-start" justifyContent="flex-start" columnSpacing={10} mt={2}>
          <Grid item xs={12} md={6}>
            <Stack>
              <Typography variant="h4">Recent activity</Typography>
              <RecentActivity />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <Typography variant="h4">Code quality tests</Typography>
              <CodeMetricsSummary />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Layout>
  );
};

export default DashboardPage;
