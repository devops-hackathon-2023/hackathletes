import {Deployment, DeploymentUnit} from '@/types';
import {useQueryClient} from 'react-query';
import {useFinishDeploymentMutation, useStartDeploymentMutation} from '@/mutations';
import {useFetchDeploymentUnitVersion} from '@/queries';
import {Button, Skeleton} from '@mui/material';
import {Replay} from '@mui/icons-material';
import {useAtom} from 'jotai';
import {loggedUserAtom} from '@/state/atoms';
import {useLocales} from '@/locales';
import StopIcon from "@mui/icons-material/Stop";

interface ActionButtonProps {
    deployment: Deployment;
    deploymentUnit: DeploymentUnit;
    handleOpenSnackbar: any;
}

export const ActionButton = ({deployment, deploymentUnit, handleOpenSnackbar}: ActionButtonProps) => {
    const [loggedUser] = useAtom(loggedUserAtom);

    const {t} = useLocales();

    const queryClient = useQueryClient();

    const {mutate: mutateStartDeployment} = useStartDeploymentMutation();
    const {data: deploymentUnitVersion, isLoading} = useFetchDeploymentUnitVersion(deployment.versionId);
    const {mutate: mutateFinishDeployment} = useFinishDeploymentMutation();

    if (!deploymentUnit || !deployment || !deploymentUnitVersion || isLoading) {
        return <Skeleton variant="rounded" height={40} width={70}/>;
    }

    const {environment, changeTicketId, platform, status} = deployment;
    const {name: deploymentUnitName} = deploymentUnit;

    return (
        <Button
            onClick={() => {
                if (status === 'STARTED') {
                    mutateFinishDeployment(
                        {
                            deploymentId: deployment.id,
                            status,
                        },
                        {
                            onSuccess: () => {
                                queryClient.invalidateQueries(['deployments']);
                                handleOpenSnackbar(true, 'Deployment finished successfully');
                            },
                            onError: (error: TypeError) => {
                                const errorMsg = error.message || 'An unknown error occurred';
                                handleOpenSnackbar(false, errorMsg);
                            },
                        }
                    );
                } else {
                    mutateStartDeployment(
                        {
                            environment,
                            version: deploymentUnitVersion?.version,
                            deploymentUnitName,
                            changeTicketId,
                            deployer: loggedUser?.name ?? t('unkown'),
                            platform,
                        },
                        {
                            onSuccess: () => {
                                queryClient.invalidateQueries(['deployments']);
                                handleOpenSnackbar(true, 'Deployment started successfully');
                            },
                            onError: (error: TypeError) => {
                                const errorMsg = error.message || 'An unknown error occurred';
                                handleOpenSnackbar(false, errorMsg);
                            },
                        }
                    );
                }
            }}
            startIcon={status === 'STARTED' ? <StopIcon/> : <Replay/>}
            sx={{
                color: status === 'STARTED' ? 'red' : 'black',
            }}
        >
            {status === 'STARTED' ? 'Stop' : 'Redeploy'}
        </Button>
    );
};
