export const SIDEBAR_MENU_BUTTON_CLASSES = {
  base: 'relative inline-flex h-xl cursor-pointer items-center justify-start gap-2xs overflow-hidden rounded-full border border-transparent style-text-default-0 whitespace-nowrap transition-all duration-hover select-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:shrink-0',
  collapsed: 'w-xl pl-[calc((var(--spacing-xl)-1em)/2-1px)]',
  expanded: 'w-full pl-sm',
  fromCollapsed: 'starting:w-xl starting:pl-[calc((var(--spacing-xl)-1em)/2-1px)]',
  fromExpanded: 'starting:w-full starting:pl-sm',
  idle: 'text-neutral-default hover:bg-neutral-container hover:text-neutral-on-container',
}
