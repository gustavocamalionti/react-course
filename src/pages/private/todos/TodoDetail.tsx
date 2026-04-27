import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { parseISO, isValid } from 'date-fns';
import { TodoAPI, type ITodoWithoutId } from '../../../shared/services/api/TodoAPI';
import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';
import { Label } from '@/components/ui/label';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const todoSchema = z
  .object({
    complete: z.boolean(),
    label: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
    description: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 3, {
        message: 'Deve ter pelo menos 3 caracteres',
      }),

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
        <FieldSet>
          {/* <FieldLegend>Profile</FieldLegend> */}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="label">Título</FieldLabel>

              <Input {...register('label')} disabled={isSubmitting || isLoading} />

              {errors.label?.message ? (
                <FieldError>{errors.label.message}</FieldError>
              ) : (
                <FieldDescription>Título identificador do item</FieldDescription>
              )}
            </Field>

            {/* Descrição */}
            <Field>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>

              <textarea
                className="textarea"
                {...register('description')}
                disabled={isSubmitting || isLoading}
              />

              {errors.description?.message ? (
                <FieldError>{errors.description.message}</FieldError>
              ) : (
                <FieldDescription>Descreva em mais detalhes</FieldDescription>
              )}
            </Field>

            {/* Checkbox */}
            <Field orientation="horizontal">
              <Input
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                {...register('complete')}
                disabled={isSubmitting || isLoading}
              />
              <Label htmlFor="complete">Finalizado</Label>
            </Field>

            {/* Data */}
            {complete && (
              <Field>
                <FieldLabel htmlFor="completeAt">Data de Finalização</FieldLabel>

                <Input
                  type="datetime-local"
                  {...register('completeAt')}
                  disabled={isSubmitting || isLoading}
                />

                {errors.completeAt?.message ? (
                  <FieldError>{errors.completeAt.message}</FieldError>
                ) : (
                  <FieldDescription>Data em que o item foi finalizado</FieldDescription>
                )}
              </Field>
            )}

            {/* Botão */}
            <Button type="submit" disabled={isSubmitting || isLoading}>
              Salvar
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </PageLayout>
  );
};
