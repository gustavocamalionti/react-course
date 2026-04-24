import { useParams } from 'react-router';

import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';
import { useForm } from 'react-hook-form';
import { TodoAPI } from '../../../shared/services/api/TodoAPI';
import TodoDetailStyles from './TodoDetail.module.css';
export const TodoDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      label: 'Default',
      description: 'Default',
      complete: false,
    },
  });

  TodoAPI.findById(id).then((data) => {
    console.log(data);
  });
  return (
    <PageLayout title="Detalhes">
      <form className={TodoDetailStyles.Form} onSubmit={handleSubmit((data) => console.log(data))}>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label className={TodoDetailStyles.FormLabel} htmlFor="label">
            Título
          </label>
          <input className={TodoDetailStyles.FormInput} {...register('label')} />
          <span className={TodoDetailStyles.FormHelpText}>Título identificador do item</span>
        </div>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label className={TodoDetailStyles.FormLabel} htmlFor="description">
            Descrição
          </label>
          <input className={TodoDetailStyles.FormInput} {...register('description')} />
          <span className={TodoDetailStyles.FormHelpText}>Descreva em mais detalhes</span>
        </div>
        <div className={TodoDetailStyles.FormLabelContainer}>
          <label className={TodoDetailStyles.FormLabel} htmlFor="complete">
            Finalizado
          </label>
          <input className={TodoDetailStyles.FormInput} type="checkbox" {...register('complete')} />
          <span className={TodoDetailStyles.FormHelpText}>Status da tarefa</span>
        </div>
        <button className={TodoDetailStyles.FormButton} type="submit">
          Salvar
        </button>
      </form>
    </PageLayout>
  );
};
