'use client'


import { uploadFile } from "actions/storageActions"
import { queryClient } from "config/ReactQueryClientProvider"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Spinner } from "@material-tailwind/react"

export default function FileDragDropZone(){
  const fileRef = useRef(null)
  const uploadImageMutation = useMutation({
    mutationFn : uploadFile,
    onSuccess : ()=>{
      queryClient.invalidateQueries({
        queryKey : ['images'],
      })
    }
  })

  const onDrop = useCallback(async (acceptedFiles)=>{
      if (acceptedFiles.length >0) {
        const formData = new FormData()

        acceptedFiles.forEach(file => {
          formData.append(file.name, file)
        });
        
        const result = await uploadImageMutation.mutate(formData)
        console.log(result)
      }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple : true})

  return (
    <div 
    {...getRootProps()}
    
    className="w-full py-20 border-4 bordered-dotted border-indigo-700 flex flex-col items-center justify-center cursor-pointer">
      <input {...getInputProps()} />
      {
        uploadImageMutation.isPending ? (
          <Spinner />
        ) : (
          isDragActive ? (
            <p>Drop the files here</p>
          ) : (
            <p>Drag the files here OR click here to upload files</p>
          )
        )
      }
    </div>
  )
}