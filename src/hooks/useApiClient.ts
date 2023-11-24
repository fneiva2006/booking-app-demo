import { useContext } from 'react';
import { ApiClientContext } from '../contexts/apiClientContext';

export const useApiClient = () => {
  const ctx = useContext(ApiClientContext);

  if (!ctx) {
    throw new Error('Api client provider context was not provided');
  }

  return ctx;
};
