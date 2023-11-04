import { CustomAvatar } from '../CustomAvatar';
import Image from 'next/image';
import { Stack } from '@mui/material';

export function Navbar() {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      bgcolor={'primary.dark'}
      padding={0.5}
      paddingLeft={15}
      color={'white'}
    >
      <Image alt="img" src="/ceska_sporitelna.png" width={114} height={51} />
      <CustomAvatar />
    </Stack>
  );
}
