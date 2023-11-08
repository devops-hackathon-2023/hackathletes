import {useFetchAppModuleDeploymentUnits} from "@/queries";
import {Stack, Typography} from "@mui/material";

const NumberOfAppsIndicator = ({moduleId}: any) => {
    const {data, isLoading} = useFetchAppModuleDeploymentUnits(moduleId)

    return (
        <Stack>
            <Typography noWrap fontSize={{'xs': 10, 'sm': '1rem'}}>{isLoading ? 'loading' : `${data.page.length} Apps`}</Typography>
        </Stack>
    )
}
export default NumberOfAppsIndicator