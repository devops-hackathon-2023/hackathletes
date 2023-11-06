import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { useFetchAppModuleDeploymentUnits } from '@/queries';
import ModuleDeployments from '@/components/ModuleDeployments';
interface ModuleCardProps {
  module: any;
  onClick?: () => void;
}

// todo - udělat všechny karty stejné velikosti
const ModuleCard = ({ module, onClick }: ModuleCardProps) => {
  const { data: deploymentUnits } = useFetchAppModuleDeploymentUnits(module.id);
  return (
    <Card onClick={onClick} sx={{ cursor: 'pointer' }}>
      <CardMedia image={'/app-module-images/placeholder.png'} title={module.name} style={{ height: '100px' }} />
      <CardContent>
        <Typography variant={'h6'} gutterBottom>
          {module.name}
        </Typography>
        <Stack direction="column" spacing={1}>
          {deploymentUnits?.page?.map((deploymentUnit: any) => (
            <ModuleDeployments key={deploymentUnit.id} deploymentUnit={deploymentUnit} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
