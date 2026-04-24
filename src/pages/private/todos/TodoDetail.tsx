import { useParams } from 'react-router';

import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';

export const TodoDetail = () => {
  const { id } = useParams<{ id: string }>();

  return <PageLayout title="Detalhes">Detail {id}</PageLayout>;
};
