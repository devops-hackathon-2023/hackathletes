import { Box, Container, Stack, Tab, Tabs } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, useState } from 'react';
import { useRouter } from 'next/router';
import { AppBar } from './AppBar';

type AvailableTab = 'dashboard' | 'deployments' | 'metrics' | 'versions';

export const UnitLayout = ({
  children,
  tab,
}: PropsWithChildren<{
  tab: AvailableTab;
}>) => {
  const router = useRouter();
  const handleTabChange = (t: AvailableTab) => {
    router.push(`/${router.query.sas}/${router.query.module}/${router.query.unit}/${t}`);
  };
  return (
    <>
      <AppBar />
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: 3,
          backgroundColor: (theme) => theme.palette.primary.dark,
          color: (theme) => theme.palette.common.white,
        }}
      >
        <Tabs
          sx={{
            backgroundColor: (theme) => theme.palette.primary.dark,
          }}
          textColor="inherit"
          value={tab}
          onChange={(e, t) => {
            handleTabChange(t as AvailableTab);
          }}
          aria-label="basic tabs example"
        >
          {/* <Tab label="Dashboard" color="white" value="dashboard" /> */}
          <Tab label="Deployments" value="deployments" />
          <Tab label="Metrics" value="metrics" />
          <Tab label="Versions" value="versions" />
        </Tabs>
      </Box>
      <Stack paddingX={{ xs: 5, md: 15 }} spacing={2} paddingTop={2} paddingBottom={5}>
        {children}
      </Stack>
    </>
  );
};
