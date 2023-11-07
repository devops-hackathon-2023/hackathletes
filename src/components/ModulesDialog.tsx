import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { useFetchAllSasses, useFetchSasModules } from '@/queries';
import ModuleCard from '@/components/ModuleCard';

interface ModulesModalProps {
  open: boolean;
  onClose: () => void;
}

const ModulesDialog = ({ open, onClose }: ModulesModalProps) => {
  const router = useRouter();
  const { sas: currentSas } = router.query;
  const { data: sasses } = useFetchAllSasses();
  const currentSasId = sasses?.page?.find((sas: any) => sas.name === currentSas)?.id;
  const { data: sasModules } = useFetchSasModules(currentSasId);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredModules = sasModules?.page?.filter((module: any) =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToSamePage = (moduleName: string) => {
    const pathSegments = router.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1] || 'dashboard';
    router.push(`/${currentSas}/${moduleName}/${lastSegment}`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{currentSas} modules</DialogTitle>
      <div style={{ padding: '10px' }}>
        <TextField
          fullWidth
          label="Search"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: (theme) => theme.palette.grey[600] }} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <DialogContent dividers style={{ height: 'calc(400px - 68px)', overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {filteredModules?.map((module: any) => (
            <Grid item key={module.id} xs={12} sm={6} md={4} lg={3}>
              <ModuleCard
                module={module}
                onClick={() => {
                  navigateToSamePage(module.name);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModulesDialog;
