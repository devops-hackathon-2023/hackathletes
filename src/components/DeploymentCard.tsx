import { useFetchLatestServersDeployments } from '@/queries';
import { Button, Card as MuiCard, CardContent, Divider as MuiDivider, Stack, styled, Typography } from '@mui/material';
import SmallChip from '@/components/SmallChip';
import { GitHub } from '@mui/icons-material';
import { StatusDot } from '@/components/StatusDot';
import { resolvePlatform, toRelativeTimeShort } from '@/utils';
import { Deployment } from '@/types';
import DeploymentVersionChip from '@/components/DeploymentVersionChip';

const GitHubButton = styled(Button)({
  textTransform: 'none',
  backgroundColor: 'transparent',
  color: 'black',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const Divider = styled(MuiDivider)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
}));

const Card = styled(MuiCard)({
  width: '300px',
});

export const DeploymentCard = ({ deploymentUnitVersion }: any) => {
  const { data: latestDeployments } = useFetchLatestServersDeployments(deploymentUnitVersion.deploymentUnitId);
  const { name, gitBranch, repositoryUrl } = deploymentUnitVersion;

  const handleClick = () => {
    window.open(repositoryUrl, '_blank');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" mb={1}>
          {name}
        </Typography>

        <Stack spacing={1}>
          {latestDeployments?.map((deployment: Deployment) => {
            const { environment, status, platform, startedAt } = deployment;
            return (
              <Stack key={environment} direction="row" spacing={2} alignItems="center">
                <StatusDot status={status} />
                <Typography fontWeight="bold">{environment.toLowerCase()}</Typography>
                <DeploymentVersionChip deployment={deployment} />
                <SmallChip label={resolvePlatform(platform)} />
                <Typography color="text.secondary">{toRelativeTimeShort(startedAt)}</Typography>
              </Stack>
            );
          })}
        </Stack>
        <Divider />
        <GitHubButton size="large" startIcon={<GitHub />} onClick={handleClick}>
          {gitBranch}
        </GitHubButton>
      </CardContent>
    </Card>
  );
};
