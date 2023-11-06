import { useFetchDeploymentUnitVersions } from '@/queries';
import { Chip, Stack, Typography } from '@mui/material';

const ModuleDeployments = ({ deploymentUnit }: any) => {
  const { data } = useFetchDeploymentUnitVersions(deploymentUnit.id);
  const deploymentUnitVersions = data?.page;
  const latestDeploymentUnit = deploymentUnitVersions?.[deploymentUnitVersions.length - 1];

  // todo - fetchnout deploymenty podle id, a získat statusy environmentů z tama
  // barva badge by měla odrážet status všech environmentů
  // v případě, že všechny environmenty jsou SUCCESS, tak zelená
  // v případě, že jsou všechny environmenty failed, tak červená
  // v ostatních případech žlutá

  return (
    <Stack direction="row" spacing={2} alignItems={'center'}>
      <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} flexGrow={1}>
        <Typography variant={'body2'} color={'text.secondary'}>
          {deploymentUnit.name}
        </Typography>

        <Chip
          sx={{
            height: '20px',
            fontSize: '0.7rem',
            '& .MuiChip-label': {
              padding: '0 8px',
            },
          }}
          size="small"
          color={['success', 'error', 'warning'][Math.floor(Math.random() * 3)] as 'success' | 'error' | 'warning'}
          label={latestDeploymentUnit?.version}
        />
      </Stack>
    </Stack>
  );
};

export default ModuleDeployments;
