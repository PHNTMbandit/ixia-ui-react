// Mirrors SelectItem so every menu-like list renders items identically.
const menuItemHighlightClasses =
    'data-highlighted:bg-neutral-container-high data-highlighted:text-neutral-on-container',
  menuItemBaseClasses =
    'min-h-[calc(var(--spacing-lg)+var(--spacing-3xs)*2)] cursor-default items-center gap-xs rounded-lg px-2xs py-3xs style-text-default-0 transition-colors duration-hover outline-none select-none hover:cursor-pointer [&_svg]:size-md',
  menuItemToneClasses = {
    accent:
      'text-accent-default data-highlighted:text-accent-on-container data-highlighted:bg-accent-container',
    brand:
      'text-brand-default data-highlighted:text-brand-on-container data-highlighted:bg-brand-container',
    error:
      'text-error-on-surface data-highlighted:text-error-on-container data-highlighted:bg-error-container',
    info: 'text-info-default data-highlighted:text-info-on-container data-highlighted:bg-info-container',
    neutral:
      'text-on-surface data-highlighted:text-neutral-on-container data-highlighted:bg-neutral-container-high',
    success:
      'text-success-default data-highlighted:text-success-on-container data-highlighted:bg-success-container',
    warning:
      'text-warning-default data-highlighted:text-warning-on-container data-highlighted:bg-warning-container',
  },
  menuSubmenuToneClasses = {
    accent:
      'text-accent-default data-highlighted:text-accent-on-container data-highlighted:bg-accent-container data-popup-open:text-accent-on-container data-popup-open:bg-accent-container data-highlighted:data-popup-open:bg-accent-container',
    brand:
      'text-brand-default data-highlighted:text-brand-on-container data-highlighted:bg-brand-container data-popup-open:text-brand-on-container data-popup-open:bg-brand-container data-highlighted:data-popup-open:bg-brand-container',
    error:
      'text-error-on-surface data-highlighted:text-error-on-container data-highlighted:bg-error-container data-popup-open:text-error-on-container data-popup-open:bg-error-container data-highlighted:data-popup-open:bg-error-container',
    info: 'text-info-default data-highlighted:text-info-on-container data-highlighted:bg-info-container data-popup-open:text-info-on-container data-popup-open:bg-info-container data-highlighted:data-popup-open:bg-info-container',
    neutral:
      'text-on-surface data-highlighted:text-neutral-on-container data-highlighted:bg-neutral-container-high data-popup-open:text-neutral-on-container data-popup-open:bg-neutral-container-high data-highlighted:data-popup-open:bg-neutral-container-high',
    success:
      'text-success-default data-highlighted:text-success-on-container data-highlighted:bg-success-container data-popup-open:text-success-on-container data-popup-open:bg-success-container data-highlighted:data-popup-open:bg-success-container',
    warning:
      'text-warning-default data-highlighted:text-warning-on-container data-highlighted:bg-warning-container data-popup-open:text-warning-on-container data-popup-open:bg-warning-container data-highlighted:data-popup-open:bg-warning-container',
  }

export {
  menuItemBaseClasses,
  menuItemHighlightClasses,
  menuItemToneClasses,
  menuSubmenuToneClasses,
}
