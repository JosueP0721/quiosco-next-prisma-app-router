'use client'
import { CldUploadWidget } from 'next-cloudinary'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'
import Image from 'next/image'
import { get } from 'http'
import { getImagePath } from '@/src/utils'

export default function ImageUpload({image} : {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result, {widget}) => {
                if(result.event === 'success') {
                    widget.close()
                    // @ts-ignore
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset='fxyeqe0d'
            options={{
                maxFiles: 1,
            }}
        >
            {({open}) => (
                <>
                    <div className=' space-y-2'>
                        <label 
                            htmlFor="" 
                            className=' text-slate-800'
                        >
                            Imagen Producto
                        </label>
                        <div 
                            className=' relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex felx-col justify-center items-center gap-4 text-neutral-600 bg-slate-100'
                            onClick={() => open()}
                        >
                            { imageUrl ? (
                                <div
                                    className=' absolute inset-0 w-full h-full'
                                >
                                    <Image 
                                        fill
                                        style={{objectFit: 'contain'}}
                                        src={imageUrl}
                                        alt='Imagen del producto'
                                    />
                                </div>
                            ) : (
                                <>
                                    <TbPhotoPlus 
                                        size={50}
                                    />
                                    <p
                                        className=' text-lg font-semibold'
                                    >
                                        Agregar Imagen
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    {image && !imageUrl && (
                        <div className=' space-y-2'>
                            <label> Imagen Actual:</label>
                            <div className=' relative w-64 h-64'>
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt='Imagen del producto'
                                    style={{objectFit: 'contain'}}
                                />
                            </div>
                        </div>
                    )}
                    <input 
                        type="hidden"
                        name='image'
                        defaultValue={imageUrl ? imageUrl : image}
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
