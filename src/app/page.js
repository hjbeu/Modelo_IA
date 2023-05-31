"use client"
import fundo from './pxfuel.jpg'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const data ={ 
    resultado: "Gato",
    prob: "0.99"}
const [previewImage, setPreviewImage] = useState('https://img.elo7.com.br/product/original/308E224/placa-decorativa-mdf-cerveja-vc-deve-beber-padawan-star-wars-jason-voorhees.jpg')
const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];

  const reader = new FileReader();
  reader.onload = function (e) {
    setPreviewImage(e.target.result);
  };
  reader.readAsDataURL(selectedFile);
};


  return (
    <main className=" flex min-h-screen flex-col items-center justify-center p-2" >
      <Image className="absolute z-0 w-full h-full object-cover" src={fundo} alt="fundo" />
      <div className="flex bg-opacity-70  backdrop-blur-lg shadow-lg flex-col items-center justify-around rounded-lg mb-4 p-6">
        <h1 className='text-justify text-4xl p-4 pb-10'>Modelo de classificação de imagem com a base CIFR10</h1>
        <div className='flex items-center justify-between gap-4'>
        <img src={previewImage} alt="Picture of the author" width={400} height={400} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <p>Resultado: {data.resultado}</p>
          <p>Probabilidades: {data.prob}</p>
          <input className="rounded-lg text-sm focus:outline-none" type="file"  name="file" onChange={handleFileChange} value="" />
        </div>
        </div>
        
      </div>
    </main>
  )
}
