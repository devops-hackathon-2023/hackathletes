import {useRef, useState} from 'react';
import {Stack, Typography} from '@mui/material';
import AllItemsGrid from '@/components/AllItemsGrid';
import Menubar from '@/components/main-page/Menubar';
import {SasesSearchBox} from './SasesSearchBox';

const AllSases = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSasId, setSelectedSasId] = useState('all');
    const targetElementRef = useRef(null);

    const scrollToElement = () => {
        if (targetElementRef.current) {
            // @ts-ignore
            targetElementRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <>
            <Typography ref={targetElementRef}>Všechny moduly</Typography>
            <SasesSearchBox placeholder="Vyhledávání modulů" onSearchChange={setSearchTerm}
                            onTextFieldClick={scrollToElement}/>
            <Stack direction="row" spacing={3} height="700px">
                <Menubar setSelectedSasId={setSelectedSasId} selectedSasId={selectedSasId}/>
                <AllItemsGrid selectedSasId={selectedSasId} searchTerm={searchTerm}/>
            </Stack>
        </>
    );
};

export default AllSases;
