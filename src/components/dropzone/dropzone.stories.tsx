import { FileArrowUpIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Dropzone } from './index'

export default {
  args: {
    accept: '.jpg,.png,.pdf',
    maxFileSize: 200000000,
    maxFiles: 3,
    multiple: true,
    onConfirm: (files) => {
      alert(`Confirmed ${files.length} file${files.length === 1 ? '' : 's'}.`)
    },
  },
  component: Dropzone,
  render: (args) => (
    <Dropzone {...args} className="w-[900px]">
      <Dropzone.Container>
        <Dropzone.Icon>
          <FileArrowUpIcon />
        </Dropzone.Icon>
        <Dropzone.Info>
          <Dropzone.Heading>
            <Dropzone.Trigger>Click here</Dropzone.Trigger> to upload your files or drag and drop
            them into this area.
          </Dropzone.Heading>
          <Dropzone.Subtitle>
            Accepted formats: <Dropzone.Formats /> (<Dropzone.FileSizeLimit /> each)
          </Dropzone.Subtitle>
        </Dropzone.Info>
      </Dropzone.Container>
      <Dropzone.Error />
      <Dropzone.Files>
        <Dropzone.FilesHeader>
          <Dropzone.FilesTitle>Uploaded Files</Dropzone.FilesTitle>
          <Dropzone.FileLimit />
        </Dropzone.FilesHeader>
        <Dropzone.FilesList />
      </Dropzone.Files>
      <Dropzone.Actions>
        <Dropzone.Clear>Clear</Dropzone.Clear>
        <Dropzone.Confirm>Confirm</Dropzone.Confirm>
      </Dropzone.Actions>
    </Dropzone>
  ),
  title: 'Components/Dropzone',
} as Meta<typeof Dropzone>

type Story = StoryObj<typeof Dropzone>

export const Playground: Story = {}
export const SingleFile: Story = {
  args: {
    maxFiles: 1,
    multiple: false,
  },
}

export const CustomErrorMessages: Story = {
  args: {
    maxFileSizeErrorLabel: (fileName, maxFileSize) =>
      `The file "${fileName}" exceeds the maximum size of ${maxFileSize}.`,
    maxFilesErrorLabel: (maxFiles) => `You can only upload up to ${maxFiles} files.`,
  },
}

export const UploadProgress: Story = {
  args: {
    onUpload: (_file, onProgress) => {
      let percent = 0
      const interval = setInterval(() => {
        percent += 20
        onProgress(percent)

        if (percent >= 100) {
          clearInterval(interval)
        }
      }, 300)
    },
  },
}
