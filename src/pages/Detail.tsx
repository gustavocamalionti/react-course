import { useParams, useSearchParams } from 'react-router';

import { PageLayout } from '../shared/layout/page-layout/PageLayout';
import { useEffect, useState } from 'react';
import { TodoAPI, type ITodo } from '../shared/services/api/TodoAPI';

export const Detail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [todo, setTodo] = useState<ITodo[]>([]);

  useEffect(() => {
    TodoAPI.findById(id).then((data) => {
      setTodo(data);
    });
  }, []);
  return (
    <PageLayout title="Detalhes">
      Detail{id} {searchParams.get('filter')}
    </PageLayout>
  );
};
