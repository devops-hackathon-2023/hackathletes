import { MOCK_API_URL, useFetchAppModuleDeploymentUnits, useGetCurrentModuleId } from '@/queries';
import { Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { useQueries } from 'react-query';
import { DeploymentUnit } from '@/types';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import React from 'react';

export interface Bug {
  id: string;
  priority: string;
  stage: string;
  status: string;
  name: string;
}

interface BugData {
  deploymentUnitId: string;
  bugs: Bug[];
}

interface BugPriorityCount {
  [key: string]: number;
}

export const GithubBugs = () => {
  const moduleId = useGetCurrentModuleId();
  const { data: deploymentUnits, isLoading } = useFetchAppModuleDeploymentUnits(moduleId);
  const theme = useTheme();
  const bugQueries = useQueries(
    deploymentUnits?.page?.map((unit: DeploymentUnit) => ({
      queryKey: ['githubBugs', unit.id],
      queryFn: () => axios.get<BugData>(`${MOCK_API_URL}/github/bugs/${unit.id}`).then((res) => res.data),
    })) || []
  );

  const allBugsLoaded = bugQueries.every((query) => query.isSuccess);

  if (!allBugsLoaded) {
    return <div>Loading...</div>;
  }

  const allBugs = bugQueries.reduce<Bug[]>((acc, query) => {
    // Assert that query.data is of type BugData
    const data = query.data as BugData;
    if (data?.bugs) {
      acc = acc.concat(data.bugs);
    }
    return acc;
  }, []);

  const bugPriorities = allBugs.reduce<BugPriorityCount>((acc, bug) => {
    acc[bug.priority] = (acc[bug.priority] || 0) + 1;
    return acc;
  }, {});

  const totalBugs: any = Object.values(bugPriorities).reduce((sum: any, count: any) => sum + count, 0);

  // Now `data` contains aggregated data from all deployment units
  const data = {
    labels: Object.keys(bugPriorities),
    datasets: [
      {
        label: 'Bug Priorities',
        data: Object.values(bugPriorities),
        backgroundColor: [
          theme.palette.info.main, // color for low priority
          theme.palette.warning.main, // color for medium priority
          theme.palette.error.main, // color for high priority
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return isLoading ? (
    <Skeleton width={250} height={290} sx={{ my: '-20px' }} />
  ) : (
    <Stack style={{ width: '280px', height: '250px', alignSelf: 'flex-start', position: 'relative' }}>
      <Doughnut data={data} options={options} />
      <Stack
        sx={{
          position: 'absolute',
          top: '53%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%', // Ensuring that the Stack takes the full width of the parent
          alignItems: 'center', // Centering the content horizontally
          justifyContent: 'center', // Centering the content vertically
        }}
      >
        <Typography variant="h3">{totalBugs}</Typography>
        <Typography>Total bugs</Typography>
      </Stack>
    </Stack>
  );
};
