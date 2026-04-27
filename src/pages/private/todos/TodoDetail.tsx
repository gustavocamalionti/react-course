import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { parseISO, isValid } from 'date-fns';
import { TodoAPI, type ITodoWithoutId } from '../../../shared/services/api/TodoAPI';
import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';

const todoSchema = z
  .object({
    complete: z.boolean(),
    label: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
    description: z.string().min(3, 'Deve ter pelo menos 3 caracteres').optional(),

    // yyyy-mm-dd
    completeAt: z
      .string()
      .optional()
      .refine((datetimeLocal) => {
        if (!datetimeLocal) return true;

        const parsedDate = parseISO(datetimeLocal);
        return isValid(parsedDate);
      }, 'A data não está correta'),
  })
  .refine(
    (data) => {
      if (data.complete && !data.completeAt) return false;
      return true;
    },
    { path: ['completeAt'], error: 'A data precisa ser informada' },
  )
  .transform((data) => {
    if (!data.complete) {
      return {
        ...data,
        completeAt: undefined,
      };
    }

    return data;
  });

export const TodoDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ITodoWithoutId>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      label: '',
      description: '',
      complete: false,
      completeAt: '',
    },
  });

  const complete = watch('complete');

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
    completeAt,
  }) => {
    if (!id || id === 'adicionar') {
      await TodoAPI.create({
        label,
        description,
        complete,
        completeAt,
      });
    } else {
      await TodoAPI.updateById(id, {
        label,
        description,
        complete,
        completeAt,
      });
    }

    navigate('/todos');
  };

  return (
    <PageLayout title={id === 'adicionar' ? 'Nova Tarefa' : 'Editar Tarefa'}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="card flex flex-col">
        {/* Título */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="label" htmlFor="label">
            Título
          </label>

          <input className="input" {...register('label')} disabled={isSubmitting || isLoading} />

          {errors.label?.message ? (
            <span className="text-xs text-red-500">{errors.label.message}</span>
          ) : (
            <span className="text-xs text-[var(--color-muted)]">Título identificador do item</span>
          )}
        </div>

        {/* Descrição */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="label" htmlFor="description">
            Descrição
          </label>

          <textarea
            className="textarea"
            {...register('description')}
            disabled={isSubmitting || isLoading}
          />

          {errors.description?.message ? (
            <span className="text-xs text-red-500">{errors.description.message}</span>
          ) : (
            <span className="text-xs text-[var(--color-muted)]">Descreva em mais detalhes</span>
          )}
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            {...register('complete')}
            disabled={isSubmitting || isLoading}
          />

          <label className="label" htmlFor="complete">
            Finalizado
          </label>
        </div>

        {/* Data */}
        {complete && (
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="label" htmlFor="completeAt">
              Data de Finalização
            </label>

            <input
              type="datetime-local"
              className="input"
              {...register('completeAt')}
              disabled={isSubmitting || isLoading}
            />

            {errors.completeAt?.message ? (
              <span className="text-xs text-red-500">{errors.completeAt.message}</span>
            ) : (
              <span className="text-xs text-[var(--color-muted)]">
                Data em que o item foi finalizado
              </span>
            )}
          </div>
        )}

        {/* Botão */}
        <button type="submit" className="btn mt-2 w-[120px]" disabled={isSubmitting || isLoading}>
          Salvar
        </button>
      </form>
    </PageLayout>
  );
};
