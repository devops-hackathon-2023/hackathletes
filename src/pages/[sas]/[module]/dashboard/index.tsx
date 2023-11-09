import React from 'react';
import { Layout } from '@/components/module-details/Layout';
import { Grid, Stack, Typography } from '@mui/material';
import { useFetchAppModuleDeploymentUnits, useGetCurrentModuleId } from '@/queries';
import { DeploymentCard, GithubBugs, RecentActivity } from '@/components';
import { CodeMetricsSummary } from '@/components/dashboard/CodeMetricsSummary';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentUnits } = useFetchAppModuleDeploymentUnits(moduleId);

  const deploymentUnitsArr = deploymentUnits?.page;

  return (
    <Layout>
      <Stack>
        <Grid container spacing={10} mb={2}>
          {deploymentUnitsArr?.map((deploymentUnit: any) => (
            <Grid item sm={6} md={5} lg={deploymentUnitsArr.length === 1 ? 6 : 3} key={deploymentUnit.id}>
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
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              mt: { xs: 2, md: 0 }, // applies margin-top of 2 on xs screens and resets it to 0 on md screens and up
            }}
          >
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
