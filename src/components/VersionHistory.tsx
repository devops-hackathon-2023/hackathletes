import {
    useFetchDeploymentUnitVersionsByDeploymentUnitId,
    useFetchLatestSuccessfulDeploymentForEachEnvironmentByDeploymentUnit,
} from '@/queries';
import {Deployment} from '@/types';
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import SmallChip from '@/components/SmallChip';
import GitBranch from '@/icons/GitBranch';

type VersionsHistoryProps = {
    unitId: string;
};
export const VersionsHistory = ({unitId}: VersionsHistoryProps) => {
    const {data: deploymentUnitVersions} =
        useFetchDeploymentUnitVersionsByDeploymentUnitId(unitId);

    // Version per environment
    const {data: latestSuccessfulDeployments} =
        useFetchLatestSuccessfulDeploymentForEachEnvironmentByDeploymentUnit(unitId);

    const findLatestDeployment = (versionId: string) =>
        latestSuccessfulDeployments?.find((deployment: Deployment) => deployment.versionId === versionId);

    return (
        <div>
            <TableContainer sx={{maxHeight: '73vh', overflow: 'auto'}} component={Paper}>
                <Table>
                    <TableBody>
                        {deploymentUnitVersions?.page?.map((version) => (
                            <TableRow key={version.id}>
                                <TableCell>
                                    <Stack direction="column">
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Typography fontWeight="bold">{version?.version}</Typography>

                                            <Typography
                                                color="text.secondary">{version.createdAt || '2 days ago'}</Typography>
                                            {findLatestDeployment(version.id) && (
                                                <SmallChip label={findLatestDeployment(version.id)?.environment}/>
                                            )}
                                        </Stack>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    {' '}
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <GitBranch/>
                                        <Typography color="text.secondary">{version?.gitBranch}</Typography>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
