import React from 'react';
import { UnitLayout } from '@/components/unit-details/UnitLayout';
import { DeploymentsHistory } from '@/components';
import { Typography } from '@mui/material';
import { useFetchDeploymentUnits } from '@/queries';
import { useRouter } from 'next/router';

const DashboardPage = () => {
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
    <UnitLayout tab="deployments">
      <Typography variant="h3">Deployments</Typography>
      {isUnitLoading ? (
        <div>Loading...</div>
      ) : (
        <DeploymentsHistory showTitle={false} showUnitSelect={false} unitId={unitData.id} />
      )}
    </UnitLayout>
  );
};

export default DashboardPage;
