import { useParams, useSearchParams } from 'react-router';

import { PageLayout } from '../shared/layout/page-layout/PageLayout';
import { useEffect, useState } from 'react';
import { TodoAPI, type ITodo } from '../shared/services/api/TodoAPI';

export const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const [todo, setTodo] = useState<ITodo>();

  useEffect(() => {
    if (!id) return;

    TodoAPI.findById(id).then((data) => {
      setTodo(data);
    });
  }, []);
  return (
    <PageLayout title="Detalhes">
      {id} - {searchParams.get('filter')}
      {todo?.label} <br />
      {todo?.complete ? 'Concluído' : 'Não Concluído'} <br />
    </PageLayout>
  );
};
