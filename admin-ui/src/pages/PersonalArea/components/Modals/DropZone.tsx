import { FC, useCallback, memo } from 'react'
import { useDropzone } from 'react-dropzone'

import classes from './DropZone.module.scss'

type TProps = {
  setFile: any
}

const DropZone: FC<TProps> = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      console.log('file.name', file.name)
      const reader = new FileReader()
      reader.onload = () => {
        const binaryStr = reader.result
        console.log(binaryStr)
        setFile({ isSelected: true, imgName: file.name, imgUrl: binaryStr })
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className={classes.chooseFileContainer}>
      <input {...getInputProps()} />
      <p>Перенесите вашу фотографию в область или</p> <br />
      <h4>Выберите файл</h4>
    </div>
  )
}

export default memo(DropZone)
