/* eslint-disable */
// @ts-nocheck
import { useState } from 'react'
import Resizer from 'react-image-file-resizer'

const imageResolution = {
  quality: 100,
  maxWidth: 1000,
  maxHeight: 1000,
  format: 'base64'
}

export const UploadTest = () => {
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)

  const resizeFile = (
    file // https://www.npmjs.com/package/react-image-file-resizer - ДОКА
  ) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        imageResolution.maxWidth,
        imageResolution.maxHeight,
        'JPEG',
        imageResolution.quality,
        0,
        (uri) => {
          resolve(uri)
        },
        imageResolution.format
      )
    })

  const byteCount = (s) => {
    return encodeURI(s).split(/%..|./).length - 1
  }

  const onChange = async (event) => {
    try {
      const file = event.target.files[0]
      setLoading(true)
      const image = await resizeFile(file)
      setLoading(false)
      setImage(image)
      console.log('Image size in MB: ', byteCount(image) * 0.000001)
      console.log('Base64 length', image.length)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '38% auto',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <h1>Upload File</h1>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        style={{ textAlignLast: 'center' }}
      ></input>
      {loading ? <h3>Loading...</h3> : <img src={image} />}
    </div>
  )
}
