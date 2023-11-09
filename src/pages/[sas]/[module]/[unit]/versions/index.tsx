import React from 'react';
import { Layout } from '@/components/module-details/Layout';
import { UnitLayout } from '@/components/unit-details/UnitLayout';
import { DeploymentsHistory } from '@/components';
import { Typography } from '@mui/material';
import { useFetchDeploymentUnits } from '@/queries';
import { useRouter } from 'next/router';
import { VersionsHistory } from '@/components/VersionHistory';

const VersionsPage = () => {
  const router = useRouter();
  const { unit } = router.query;
  const {
    isLoading: isUnitLoading,
    data: unitsData,
    error: unitError,
  } = useFetchDeploymentUnits({
    name: unit as string,
  });

  const unitData = unitsData?.page[0];

  if (unitError) {
    return <div>Something went wrong</div>;
  }

  return (
    <UnitLayout tab="versions">
      <Typography variant="h3">Versions</Typography>
      {isUnitLoading ? <div>Loading...</div> : <VersionsHistory unitId={unitData.id} />}
    </UnitLayout>
  );
};

export default VersionsPage;
