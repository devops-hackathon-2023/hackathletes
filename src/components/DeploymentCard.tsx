import { useFetchLatestSuccessfulDeploymentForEachEnvironmentByDeploymentUnit } from '@/queries';
import { Card as MuiCard, CardContent, IconButton, Skeleton, Stack, styled, Typography } from '@mui/material';
import SmallChip from '@/components/SmallChip';
import { GitHub } from '@mui/icons-material';
import { StatusDot } from '@/components/StatusDot';
import { capitalizeFirstLetter, resolvePlatform, toRelativeTimeShort } from '@/utils';
import { Deployment } from '@/types';
import DeploymentVersionChip from '@/components/DeploymentVersionChip';
import { useRouter } from 'next/router';
import Link from 'next/link';

const GitHubButton = styled(IconButton)({
  textTransform: 'none',
  backgroundColor: 'transparent',
  color: 'black',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const Card = styled(MuiCard)({
  width: '300px',
});

export const DeploymentCard = ({ deploymentUnit }: any) => {
  const router = useRouter();
  const { sas, module: moduleName } = router.query;
  const { data: latestSuccessfulDeployments, isLoading } =
    useFetchLatestSuccessfulDeploymentForEachEnvironmentByDeploymentUnit(deploymentUnit.id);

  const { name, repositoryUrl, language } = deploymentUnit;

  const handleClick = () => {
    window.open(repositoryUrl, '_blank');
  };

  return (
    <Link
      href={`/${sas}/${moduleName}/${deploymentUnit?.name || '-'}/deployments`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <GitHubButton size="large" onClick={handleClick}>
                <GitHub />
              </GitHubButton>
              <Typography variant="h4">{name}</Typography>
            </Stack>
            <Typography color="grey">|</Typography>
            <Typography color="primary.main">{capitalizeFirstLetter(language.toLowerCase())}</Typography>
          </Stack>
          <Stack spacing={isLoading ? 0 : 1} my={isLoading ? '-40px' : undefined}>
            {isLoading ? (
              <Skeleton animation="wave" width="100%" height="220px" />
            ) : (
              latestSuccessfulDeployments?.map((deployment: Deployment) => {
                const { environment, status, platform } = deployment;
                return (
                  <Stack key={environment} direction="row" spacing={2} alignItems="center">
                    <StatusDot status={status} />
                    <Typography fontWeight="bold">{environment.toLowerCase()}</Typography>
                    <DeploymentVersionChip deployment={deployment} />
                    <SmallChip label={resolvePlatform(platform)} />
                  </Stack>
                );
              })
            )}
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};
