import { cn } from '@/utils/cn'

type FormProps = React.ComponentProps<'form'>

export function Form({ className, ref, ...props }: FormProps) {
  return <form className={cn('flex flex-col gap-sm', className)} ref={ref} {...props} />
}
