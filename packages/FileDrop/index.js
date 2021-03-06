import React, { forwardRef, useEffect, useState } from 'react'
import { bool, func, node, number, object, oneOf, oneOfType, string } from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { CrossIcon } from '@welcome-ui/icons.cross'
import { PencilIcon } from '@welcome-ui/icons.pencil'
import { Button } from '@welcome-ui/button'
import { Group } from '@welcome-ui/group'
import { createEvent, validateFileSize, validateMimeType } from '@welcome-ui/utils'

// FileDrop
import * as S from './styles'
import { Preview } from './Preview'
import { getPreviewUrl, isAnImage } from './utils'

const DEFAULT_MAX_FILE_SIZE = 2000000
const ERROR_INVALID_TYPE = 'ERROR_INVALID_TYPE'
const ERROR_INVALID_SIZE = 'ERROR_INVALID_SIZE'

export const FileDrop = forwardRef(
  (
    {
      accept = 'image/*',
      children = Preview,
      dataTestId,
      disabled,
      isEditable,
      isClearable,
      maxSize = DEFAULT_MAX_FILE_SIZE,
      multiple,
      name,
      onAddFile,
      onBlur,
      onChange,
      onError,
      onRemoveFile,
      value,
      forceFileType,
      ...rest
    },
    ref
  ) => {
    const [file, setFile] = useState(value)
    const [error, setError] = useState()

    useEffect(() => {
      setFile(value)
    }, [value])

    // Clean up URL
    useEffect(() => {
      return () => file && URL.revokeObjectURL(file.preview)
    }, [file])

    const handleDropAccepted = files => {
      const [file] = files
      file.preview = URL.createObjectURL(file)
      setFile(file)
      setError(null)

      const event = createEvent({ name, value: file })
      onChange && onChange(event)
      onAddFile && onAddFile(event)
    }

    const handleDropRejected = files => {
      const [file] = files
      let error
      const event = createEvent({ name, value: file })

      if (!validateMimeType(file, accept)) {
        error = ERROR_INVALID_TYPE
      } else if (!validateFileSize(file, maxSize)) {
        error = ERROR_INVALID_SIZE
      }

      setFile(null)
      setError(error)

      onError && onError(error)
      onChange && onChange(event)
      onBlur && onBlur() // Trigger field touch
    }

    const handleRemoveFile = e => {
      e.preventDefault()
      setFile(null)
      setError(null)

      const event = createEvent({ name, value: null })
      onChange && onChange(event)
      onRemoveFile && onRemoveFile(event)
    }

    const {
      getInputProps,
      getRootProps,
      inputRef,
      isDragAccept,
      isDragActive,
      isDragReject,
      open,
      rootRef
    } = useDropzone({
      onDropAccepted: handleDropAccepted,
      onDropRejected: handleDropRejected,
      noClick: true,
      multiple,
      accept,
      disabled,
      maxSize,
      children
    })

    return (
      <S.FileDrop
        {...getRootProps({
          'data-testid': dataTestId,
          handleRemoveFile,
          isEditable,
          isDragActive,
          isDragAccept,
          isDragReject,
          isClearable,
          ref
        })}
        {...rest}
      >
        <input
          {...getInputProps({ disabled, multiple, name, onError })}
          // for extern validator we need to have access to this input
          style={{ display: 'block', opacity: 0, height: 0 }}
        />
        <S.FilePreview>
          {children({
            error,
            file,
            forceFileType,
            isAnImage: forceFileType === 'image' || isAnImage(file),
            fileUrl: file && getPreviewUrl(file),
            isDefault: !file && !isDragActive,
            isHoverAccept: isDragAccept,
            isHoverReject: isDragReject,
            openFile: open,
            inputRef,
            rootRef,
            disabled
          })}
          {!!file && (error || isEditable || isClearable) && (
            <S.Actions>
              <Group>
                {(error || isEditable) && (
                  <Button onClick={open} shape="square" size="sm" type="button" variant="secondary">
                    <PencilIcon />
                  </Button>
                )}
                {isClearable && (
                  <Button
                    onClick={handleRemoveFile}
                    shape="square"
                    size="sm"
                    type="button"
                    variant="primary-danger"
                  >
                    <CrossIcon />
                  </Button>
                )}
              </Group>
            </S.Actions>
          )}
        </S.FilePreview>
      </S.FileDrop>
    )
  }
)

FileDrop.type = 'FileDrop'
FileDrop.displayName = 'FileDrop'

FileDrop.propTypes = /* remove-proptypes */ {
  /** Pass a comma-separated string of file types e.g. "image/png" or "image/png,image/jpeg"  */
  accept: string,
  children: func,
  disabled: bool,
  forceFileType: oneOf(['image', 'audio', 'video']),
  isClearable: bool,
  isEditable: bool,
  maxSize: number,
  multiple: bool,
  name: string.isRequired,
  onAddFile: func,
  onBlur: func,
  onChange: func,
  onError: func,
  onFocus: func,
  onRemoveFile: func,
  title: oneOfType([string, node]),
  value: oneOfType([string, object])
}

// Export `ImagePreview` from styles
export const ImagePreview = S.ImagePreview
