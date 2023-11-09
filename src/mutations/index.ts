import { API_URL, apiConfig } from '@/queries';
import axios from 'axios';
import { useMutation } from 'react-query';

interface StartDeploymentRequest {
  environment: string;
  version: string;
  deploymentUnitName: string;
  changeTicketId: string;
  deployer: string;
  platform: string;
}

interface StartDeploymentResponse {
  id: string;
}

const startDeployment = async (requestData: StartDeploymentRequest): Promise<StartDeploymentResponse> => {
  const response = await axios.post(`${API_URL}/deployments/start`, requestData, apiConfig);
  return response.data;
};

export const useStartDeploymentMutation = () =>
  useMutation<StartDeploymentResponse, Error, StartDeploymentRequest>(startDeployment);

interface FinishDeploymentRequest {
  deploymentId: string;
  status: string;
}
export const finishDeployment = async ({ deploymentId, status }: FinishDeploymentRequest): Promise<void> => {
  const response = await axios.post(`${API_URL}/deployments/${deploymentId}/finish`, { status }, apiConfig);
  return response.data;
};

export const useFinishDeploymentMutation = () => useMutation<void, Error, FinishDeploymentRequest>(finishDeployment);
