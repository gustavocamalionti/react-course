import { useNavigate, useParams } from 'react-router';

import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { TodoAPI, type ITodoWithoutId } from '../../../shared/services/api/TodoAPI';
import TodoDetailStyles from './TodoDetail.module.css';
import { useEffect, useState } from 'react';
export const TodoDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ITodoWithoutId>({
    defaultValues: {
      label: '',
      description: '',
      complete: false,
    },
  });

  useEffect(() => {
    if (!id || id === 'adicionar') {
      reset();
      return;
    }

    setIsLoading(true);
    TodoAPI.findById(id).then((data) => {
      reset(data);
      setIsLoading(false);
    });
  }, [id]);

  const handleOnSubmit: SubmitHandler<ITodoWithoutId> = async ({
    label,
    description,
    complete,
  }) => {
    if (!id || id === 'adicionar') {
      await TodoAPI.create({
        label,
        description,
        complete,
      });
    } else {
      await TodoAPI.updateById(id, {
        label,
        description,
        complete,
      });
    }

    navigate('/todos');
  };

  return (
    <PageLayout title={id === 'adicionar' ? 'Nova Tarefa' : 'Editar Tarefa'}>
      <form className={TodoDetailStyles.Form} onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label className={TodoDetailStyles.FormLabel} htmlFor="label">
            Título
          </label>
          <input
            className={TodoDetailStyles.FormInput}
            {...register('label')}
            disabled={isSubmitting || isLoading}
          />
          <span className={TodoDetailStyles.FormHelpText}>Título identificador do item</span>
        </div>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label className={TodoDetailStyles.FormLabel} htmlFor="description">
            Descrição
          </label>
          <input
            className={TodoDetailStyles.FormInput}
            {...register('description')}
            disabled={isSubmitting || isLoading}
          />
          <span className={TodoDetailStyles.FormHelpText}>Descreva em mais detalhes</span>
        </div>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label className={TodoDetailStyles.FormLabel} htmlFor="complete">
            Finalizado
          </label>
          <input
            type="checkbox"
            className={TodoDetailStyles.FormInput}
            {...register('complete')}
            disabled={isSubmitting || isLoading}
          />
          <span className={TodoDetailStyles.FormHelpText}>Status da tarefa</span>
        </div>
        <button
          type="submit"
          className={TodoDetailStyles.FormButton}
          disabled={isSubmitting || isLoading}
        >
          Salvar
        </button>
      </form>
    </PageLayout>
  );
};
