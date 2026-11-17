# Input OTP

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Input OTP component provides a segmented input experience for collecting one-time passcodes. Choose elevated primary, secondary, ghost, or outline slot styling. It also supports numeric, alphanumeric, or custom validation, masked entry for sensitive codes, grouped layouts with separators, and auto-submission on completion.

## Import

```tsx
import { InputOTP } from 'ixia-ui-react/input-otp'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `autoSubmit`: Submits the owning form automatically when all slots are filled. Storybook-reported default: `false`.
- `disabled`: Disables input and interaction for all slots. Storybook-reported default: `false`.
- `length`: Number of OTP slots to render. Storybook-reported default: `6`.
- `mask`: Obscures entered characters like a password field. Storybook-reported default: `false`.
- `readOnly`: Makes all slots read-only. Storybook-reported default: `false`.
- `variant`: Controls the visual surface style of the OTP slots. Options: `primary`, `secondary`, `ghost`, `outline`. Storybook-reported default: `primary`.
- `required`: Marks the field as required for form validation. Storybook-reported default: `false`.
- `validationType`: Restricts allowed input characters. Options: `numeric`, `alphanumeric`, `none`. Storybook-reported default: `numeric`.

## Runtime exports

- `InputOTPSlot`
- `InputOtpSeparator`
- `InputOTP`

## Type exports

- `InputOTPProps`
- `InputOTPSlotProps`
- `InputOtpSeparatorProps`

## Compound parts

### InputOTP

- `InputOTP.Separator`
- `InputOTP.Slot`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/input-otp/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/input-otp/input-otp.stories.tsx)
- [Getting started](../guides/getting-started.md)
