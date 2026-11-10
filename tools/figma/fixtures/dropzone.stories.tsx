import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ChangeEvent, ComponentProps, ReactNode } from 'react'
import { useEffect, useRef } from 'react'

import { Dropzone } from '../../../src/components/dropzone'
import { useDropzone } from '../../../src/components/dropzone/dropzone.utils'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Dropzone' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Dropzone' }
const button = (kind: 'Trigger' | 'Clear' | 'Confirm', state = 'Default') => ({
  size: 'medium',
  State: state,
  tone: kind === 'Clear' ? 'error' : 'brand',
  variant: kind === 'Trigger' ? 'link' : kind === 'Clear' ? 'outline' : 'fill',
})

function Seed({ state }: { state: string }) {
  const { handleFiles } = useDropzone()
  const seeded = useRef(false)
  useEffect(() => {
    if (seeded.current) return
    seeded.current = true
    if (state !== 'Selected' && state !== 'Invalid') return
    const transfer = new DataTransfer()
    transfer.items.add(
      new File([new Uint8Array(2048)], state === 'Invalid' ? 'project.exe' : 'project.pdf', {
        type: state === 'Invalid' ? 'application/octet-stream' : 'application/pdf',
      }),
    )
    handleFiles({ target: { files: transfer.files } } as ChangeEvent<HTMLInputElement>)
  }, [handleFiles, state])
  return null
}
function Context({
  children,
  state = 'Default',
  rootSlot = false,
}: {
  children: ReactNode
  state?: string
  rootSlot?: boolean
}) {
  return (
    <Dropzone
      accept=".pdf,.png"
      multiple
      maxFiles={3}
      maxFileSize={5_000_000}
      disabled={state === 'Disabled'}
      aria-label="Upload project files"
      ref={(node) => {
        if (node) {
          node.style.width = '480px'
          if (rootSlot) node.setAttribute('data-figma-slot', 'sections')
        }
      }}
    >
      <Seed state={state} />
      {children}
    </Dropzone>
  )
}

export const Heading: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Heading',
      order: 430,
      description: 'Visible upload instructions.',
      properties: { heading: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Dropzone.Heading {...target(index)} {...text('heading')}>
          Drop project files here
        </Dropzone.Heading>
      )}
    />
  ),
}
export const Subtitle: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Subtitle',
      order: 431,
      description: 'Supporting upload instructions.',
      properties: { subtitle: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Dropzone.Subtitle {...target(index)} {...text('subtitle')}>
          PDF or PNG, up to 5 MB each
        </Dropzone.Subtitle>
      )}
    />
  ),
}
export const IconPart: Story = {
  name: 'Icon',
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Icon',
      order: 432,
      description: 'Upload icon container with a swappable Icon instance.',
      properties: { icon: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Dropzone.Icon {...target(index)}>
          <Icon aria-hidden="true" name="upload" {...swap('icon')} />
        </Dropzone.Icon>
      )}
    />
  ),
}
export const Formats: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Formats',
      order: 433,
      description: 'Accepted formats from Dropzone.accept.',
      properties: { formats: 'accept' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <Dropzone.Formats {...target(index)} {...text('formats')} />
        </Context>
      )}
    />
  ),
}
export const FileSizeLimit: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/File Size Limit',
      order: 434,
      description: 'Formatted maximum size from maxFileSize.',
      properties: { limit: 'maxFileSize' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <Dropzone.FileSizeLimit {...target(index)} {...text('limit')}>
            Maximum:{' '}
          </Dropzone.FileSizeLimit>
        </Context>
      )}
    />
  ),
}
export const FileLimit: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/File Limit',
      order: 435,
      description:
        'Selected file count and maxFiles. Renders nothing when maxFiles is unspecified.',
      properties: { count: 'files.length / maxFiles' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context state="Selected">
          <Dropzone.FileLimit {...target(index)} {...text('count')} />
        </Context>
      )}
    />
  ),
}
export const Error: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Error',
      order: 436,
      description: 'Live upload error message; absent when no error or children is provided.',
      annotate: [{ selector: '[data-figma-target] svg', attrs: { swap: 'icon' } }],
      properties: { message: 'children / fileError' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <Dropzone.Error {...target(index)}>
            <span {...text('message')}>Select a PDF or PNG file.</span>
          </Dropzone.Error>
        </Context>
      )}
    />
  ),
}
export const Trigger: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Trigger',
      order: 437,
      states: ['Default', 'Disabled'],
      description: 'Keyboard-accessible file picker trigger, backed by Button.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context state={combo.State}>
          <div {...target(index)} className="flex w-fit">
            <Dropzone.Trigger
              {...part('Button', button('Trigger', combo.State))}
              {...text('label')}
              disabled={combo.State === 'Disabled'}
            >
              Choose files
            </Dropzone.Trigger>
          </div>
          <Dropzone.Container className="sr-only">
            <Dropzone.Heading>Upload project files</Dropzone.Heading>
          </Dropzone.Container>
        </Context>
      )}
    />
  ),
}
export const Clear: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Clear',
      order: 438,
      states: ['Default', 'Disabled'],
      description: 'Clear selected files; disabled when the file list is empty.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context state={combo.State === 'Disabled' ? 'Default' : 'Selected'}>
          <div {...target(index)} className="flex" style={{ width: 200 }}>
            <Dropzone.Clear {...part('Button', button('Clear', combo.State))} {...text('label')}>
              Clear files
            </Dropzone.Clear>
          </div>
        </Context>
      )}
    />
  ),
}
export const Confirm: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Confirm',
      order: 439,
      states: ['Default', 'Disabled'],
      description: 'Confirm selected files; disabled when the file list is empty.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context state={combo.State === 'Disabled' ? 'Default' : 'Selected'}>
          <div {...target(index)} className="flex" style={{ width: 200 }}>
            <Dropzone.Confirm
              {...part('Button', button('Confirm', combo.State))}
              {...text('label')}
            >
              Upload files
            </Dropzone.Confirm>
          </div>
        </Context>
      )}
    />
  ),
}

function InfoParts() {
  return (
    <>
      <Dropzone.Heading {...part('Dropzone/Heading', {})} {...text('heading')}>
        Drop project files here
      </Dropzone.Heading>
      <Dropzone.Subtitle
        {...part('Dropzone/Subtitle', {})}
        {...show('showSubtitle')}
        {...text('subtitle')}
      >
        PDF or PNG, up to 5 MB each
      </Dropzone.Subtitle>
      <Dropzone.Formats
        {...part('Dropzone/Formats', {})}
        {...show('showFormats', false)}
        {...text('formats')}
      />
      <Dropzone.FileSizeLimit
        {...part('Dropzone/File Size Limit', {})}
        {...show('showSizeLimit', false)}
        {...text('limit')}
      >
        Maximum:{' '}
      </Dropzone.FileSizeLimit>
    </>
  )
}
export const Info: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Info',
      order: 440,
      description: 'Centered upload instructions and optional constraints.',
      slots: {
        content: {
          description: 'Upload information.',
          preferred: [
            'Dropzone/Heading',
            'Dropzone/Subtitle',
            'Dropzone/Formats',
            'Dropzone/File Size Limit',
          ],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <Dropzone.Info {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('content')}>
              <InfoParts />
            </div>
          </Dropzone.Info>
        </Context>
      )}
    />
  ),
}
export const Actions: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Actions',
      order: 441,
      states: ['Default', 'Disabled'],
      description: 'Upload action collection.',
      slots: {
        actions: {
          description: 'Clear, confirm or custom actions.',
          preferred: ['Dropzone/Clear', 'Dropzone/Confirm', 'Button'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context state={combo.State === 'Disabled' ? 'Default' : 'Selected'}>
          <Dropzone.Actions {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('actions')}>
              <ActionParts state={combo.State} />
            </div>
          </Dropzone.Actions>
        </Context>
      )}
    />
  ),
}
function ActionParts({ state = 'Default' }: { state?: string }) {
  return (
    <>
      <div className="flex w-full" {...part('Dropzone/Clear', { State: state })}>
        <Dropzone.Clear {...part('Button', button('Clear', state))} {...text('label')}>
          Clear files
        </Dropzone.Clear>
      </div>
      <div className="flex w-full" {...part('Dropzone/Confirm', { State: state })}>
        <Dropzone.Confirm {...part('Button', button('Confirm', state))} {...text('label')}>
          Upload files
        </Dropzone.Confirm>
      </div>
    </>
  )
}
export const FilesTitle: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Files Title',
      order: 442,
      description: 'Selected file collection title.',
      properties: { title: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Dropzone.FilesTitle {...target(index)} {...text('title')}>
          Selected files
        </Dropzone.FilesTitle>
      )}
    />
  ),
}
export const FilesHeader: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Files Header',
      order: 443,
      description: 'File collection title and count.',
      slots: {
        content: {
          description: 'Collection heading content.',
          preferred: ['Dropzone/Files Title', 'Dropzone/File Limit'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context state="Selected">
          <Dropzone.FilesHeader {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('content')}>
              <Dropzone.FilesTitle {...part('Dropzone/Files Title', {})} {...text('title')}>
                Selected files
              </Dropzone.FilesTitle>
              <Dropzone.FileLimit {...part('Dropzone/File Limit', {})} {...text('count')} />
            </div>
          </Dropzone.FilesHeader>
        </Context>
      )}
    />
  ),
}

const fileAnnotations: FigmaSpec['annotate'] = [
  {
    selector: '[data-fixture-files] > li > div:nth-child(2) > span:first-child',
    attrs: { text: 'fileName' },
  },
  {
    selector: '[data-fixture-files] > li > div:nth-child(2) > span:nth-child(2)',
    attrs: { text: 'fileSize' },
  },
  { selector: '[data-fixture-files] > li > div:first-child svg', attrs: { swap: 'fileIcon' } },
  {
    selector: '[data-fixture-files] > li > button',
    attrs: {
      part: 'Button/Icon only',
      variant: JSON.stringify({
        size: 'medium',
        State: 'Default',
        tone: 'error',
        variant: 'ghost',
      }),
    },
  },
  { selector: '[data-fixture-files] > li > button svg', attrs: { swap: 'icon' } },
]

function FileList(props: ComponentProps<typeof Dropzone.FilesList>) {
  const { files } = useDropzone()
  const ref = useRef<HTMLUListElement>(null)
  useEffect(() => {
    ref.current
      ?.querySelectorAll('li > button')
      .forEach((element, index) =>
        element.setAttribute('aria-label', `Remove ${files[index]?.name ?? 'file'}`),
      )
  }, [files])
  return <Dropzone.FilesList ref={ref} data-fixture-files="" {...slot('files')} {...props} />
}
export const FilesList: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Files List',
      order: 444,
      annotate: fileAnnotations,
      description:
        'Actual selected-file rows with editable names, sizes and reusable removal buttons. Native collection slot allows adding or removing rows.',
      slots: {
        files: {
          description: 'Selected file rows (native list items); extra rows map to children.',
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context state="Selected">
          <div {...target(index)}>
            <FileList />
          </div>
        </Context>
      )}
    />
  ),
}
export const Files: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Files',
      order: 445,
      annotate: fileAnnotations,
      description: 'Selected-file collection with Header and List instances.',
      slots: {
        sections: {
          description: 'File collection sections.',
          preferred: ['Dropzone/Files Header', 'Dropzone/Files List'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context state="Selected">
          <Dropzone.Files {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('sections')}>
              <FilesParts />
            </div>
          </Dropzone.Files>
        </Context>
      )}
    />
  ),
}
function FilesParts() {
  return (
    <>
      <Dropzone.FilesHeader {...part('Dropzone/Files Header', {})}>
        <div style={{ display: 'contents' }} {...slot('content')}>
          <Dropzone.FilesTitle {...part('Dropzone/Files Title', {})} {...text('title')}>
            Selected files
          </Dropzone.FilesTitle>
          <Dropzone.FileLimit {...part('Dropzone/File Limit', {})} {...text('count')} />
        </div>
      </Dropzone.FilesHeader>
      <div {...part('Dropzone/Files List', {})}>
        <FileList />
      </div>
    </>
  )
}
export const Container: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone/Container',
      order: 446,
      states: ['Default', 'Disabled', 'Invalid'],
      description:
        'Native label/drop target linked to the hidden file input, with composable content.',
      slots: {
        content: {
          description: 'Icon and upload instructions.',
          preferred: ['Dropzone/Icon', 'Dropzone/Info'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context state={combo.State}>
          <Dropzone.Container {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('content')}>
              <ContainerParts />
            </div>
          </Dropzone.Container>
        </Context>
      )}
    />
  ),
}
function ContainerParts() {
  return (
    <>
      <Dropzone.Icon {...part('Dropzone/Icon', {})} {...show('showIcon')}>
        <Icon aria-hidden="true" name="upload" {...swap('icon')} />
      </Dropzone.Icon>
      <Dropzone.Info {...part('Dropzone/Info', {})}>
        <div style={{ display: 'contents' }} {...slot('content')}>
          <InfoParts />
        </div>
      </Dropzone.Info>
    </>
  )
}
export const Root: Story = {
  name: 'Dropzone',
  parameters: {
    figma: {
      ...base,
      component: 'Dropzone',
      order: 447,
      states: ['Default', 'Selected', 'Invalid', 'Disabled'],
      annotate: fileAnnotations,
      description:
        'File picker with native drop target, external keyboard trigger, optional selected files, error and actions. The root itself renders a styled div; input props belong to the hidden input.',
      slots: {
        sections: {
          description: 'Upload sections.',
          preferred: [
            'Dropzone/Container',
            'Dropzone/Trigger',
            'Dropzone/Error',
            'Dropzone/Files',
            'Dropzone/Actions',
          ],
        },
      },
      usage:
        '<Dropzone accept=".pdf,.png" multiple maxFiles={3}><Dropzone.Container><Dropzone.Icon>…</Dropzone.Icon><Dropzone.Info>…</Dropzone.Info></Dropzone.Container><Dropzone.Trigger>Choose files</Dropzone.Trigger><Dropzone.Error /><Dropzone.Files>…</Dropzone.Files><Dropzone.Actions>…</Dropzone.Actions></Dropzone>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div {...target(index)}>
          <Context state={combo.State} rootSlot>
            <Dropzone.Container
              {...part('Dropzone/Container', {
                State: combo.State === 'Selected' ? 'Default' : (combo.State ?? 'Default'),
              })}
            >
              <div style={{ display: 'contents' }} {...slot('content')}>
                <ContainerParts />
              </div>
            </Dropzone.Container>
            <div
              className="flex w-fit"
              {...part('Dropzone/Trigger', {
                State: combo.State === 'Disabled' ? 'Disabled' : 'Default',
              })}
            >
              <Dropzone.Trigger
                disabled={combo.State === 'Disabled'}
                {...part(
                  'Button',
                  button('Trigger', combo.State === 'Disabled' ? 'Disabled' : 'Default'),
                )}
                {...text('label')}
              >
                Choose files
              </Dropzone.Trigger>
            </div>
            {combo.State === 'Invalid' && (
              <Dropzone.Error {...part('Dropzone/Error', {})}>
                <span {...text('message')}>Select a PDF or PNG file.</span>
              </Dropzone.Error>
            )}
            {combo.State === 'Selected' && (
              <Dropzone.Files {...part('Dropzone/Files', {})}>
                <div style={{ display: 'contents' }} {...slot('sections')}>
                  <FilesParts />
                </div>
              </Dropzone.Files>
            )}
            <Dropzone.Actions
              {...part('Dropzone/Actions', {
                State: combo.State === 'Selected' ? 'Default' : 'Disabled',
              })}
            >
              <div style={{ display: 'contents' }} {...slot('actions')}>
                <ActionParts state={combo.State === 'Selected' ? 'Default' : 'Disabled'} />
              </div>
            </Dropzone.Actions>
          </Context>
        </div>
      )}
    />
  ),
}
