import { useFetchAppModuleDeploymentUnits } from '@/queries';
import { Typography } from '@mui/material';

const NumberOfAppsIndicator = ({ moduleId }: any) => {
  const { data, isLoading } = useFetchAppModuleDeploymentUnits(moduleId);
  return (
    <Typography color={(theme) => theme.palette.grey[600]} fontSize={14} sx={{ whiteSpace: 'nowrap' }}>
      {isLoading ? 'loading' : `${data.page.length} modules`}
    </Typography>
  );
};
export default NumberOfAppsIndicator;
