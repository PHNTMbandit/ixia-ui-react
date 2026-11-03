const menuItemToneClasses = {
    accent:
      'text-accent-default data-highlighted:text-accent-on-container data-highlighted:before:bg-accent-container-high',
    brand:
      'text-brand-default data-highlighted:text-brand-on-container data-highlighted:before:bg-brand-container-high',
    error:
      'text-error-default data-highlighted:text-error-on-container data-highlighted:before:bg-error-container-high',
    info: 'text-info-default data-highlighted:text-info-on-container data-highlighted:before:bg-info-container-high',
    neutral:
      'text-on-surface data-highlighted:text-neutral-on-container data-highlighted:before:bg-neutral-container-high',
    success:
      'text-success-default data-highlighted:text-success-on-container data-highlighted:before:bg-success-container-high',
    warning:
      'text-warning-default data-highlighted:text-warning-on-container data-highlighted:before:bg-warning-container-high',
  },
  menuSubmenuToneClasses = {
    accent:
      'text-accent-default data-highlighted:text-accent-on-container data-highlighted:before:bg-accent-container-high data-popup-open:text-accent-on-container data-popup-open:before:bg-accent-container-high data-highlighted:data-popup-open:before:bg-accent-container-high',
    brand:
      'text-brand-default data-highlighted:text-brand-on-container data-highlighted:before:bg-brand-container-high data-popup-open:text-brand-on-container data-popup-open:before:bg-brand-container-high data-highlighted:data-popup-open:before:bg-brand-container-high',
    error:
      'text-error-default data-highlighted:text-error-on-container data-highlighted:before:bg-error-container-high data-popup-open:text-error-on-container data-popup-open:before:bg-error-container-high data-highlighted:data-popup-open:before:bg-error-container-high',
    info: 'text-info-default data-highlighted:text-info-on-container data-highlighted:before:bg-info-container-high data-popup-open:text-info-on-container data-popup-open:before:bg-info-container-high data-highlighted:data-popup-open:before:bg-info-container-high',
    neutral:
      'text-on-surface data-highlighted:text-neutral-on-container data-highlighted:before:bg-neutral-container-high data-popup-open:text-neutral-on-container data-popup-open:before:bg-neutral-container-high data-highlighted:data-popup-open:before:bg-neutral-container-high',
    success:
      'text-success-default data-highlighted:text-success-on-container data-highlighted:before:bg-success-container-high data-popup-open:text-success-on-container data-popup-open:before:bg-success-container-high data-highlighted:data-popup-open:before:bg-success-container-high',
    warning:
      'text-warning-default data-highlighted:text-warning-on-container data-highlighted:before:bg-warning-container-high data-popup-open:text-warning-on-container data-popup-open:before:bg-warning-container-high data-highlighted:data-popup-open:before:bg-warning-container-high',
  }

export { menuItemToneClasses, menuSubmenuToneClasses }
