import {useFetchAppModuleDeploymentUnits} from "@/queries";
import {Typography} from "@mui/material";

const NumberOfAppsIndicator = ({moduleId}: any) => {
    const {data, isLoading} = useFetchAppModuleDeploymentUnits(moduleId)
    return <Typography>{isLoading ? 'loading' : `${data.page.length} Apps`}</Typography>
}
export default NumberOfAppsIndicator