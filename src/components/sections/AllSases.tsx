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

    const scrollAndSetSelectedSasId = (id: string) => {
        scrollToElement()
        setSelectedSasId(id)
    }
    return (
        <>
            <Typography ref={targetElementRef} fontWeight="bold">Všechny moduly</Typography>
            <SasesSearchBox placeholder="Vyhledávání modulů" onSearchChange={setSearchTerm}
                            onTextFieldClick={scrollToElement}/>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} height="700px">
                <Menubar setSelectedSasId={scrollAndSetSelectedSasId} selectedSasId={selectedSasId}/>
                <AllItemsGrid selectedSasId={selectedSasId} searchTerm={searchTerm}/>
            </Stack>
        </>
    );
};

export default AllSases;
