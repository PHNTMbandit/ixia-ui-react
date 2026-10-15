import { cn } from '@/utils/cn'

import type { useTableContext as useRegisteredTableContext } from './table-context'
import { useTableContext } from './table-feature-context'
import type { TableFooterProps } from './table.types'

export function TableFooter({ className, children, ref, ...props }: TableFooterProps) {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const table = useTableContext() as ReturnType<typeof useRegisteredTableContext>

  return (
    <tfoot className={cn('', className)} ref={ref} {...props}>
      {children}
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <table.AppFooter header={header} key={header.id}>
              {(footer) => (
                // oxlint-disable-next-line jsx-a11y/control-has-associated-label
                <td
                  style={{
                    width: footer.getSize(),
                  }}
                  colSpan={footer.colSpan}
                >
                  <table.FlexRender footer={footer} />
                </td>
              )}
            </table.AppFooter>
          ))}
        </tr>
      ))}
    </tfoot>
  )
}
