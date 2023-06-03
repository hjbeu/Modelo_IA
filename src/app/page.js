"use client"
import fundo from './pxfuel.png'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [file, setFile] = useState(null);

  const submitFile = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const [data, setData] = useState({});
  // const [prob, setProb] = useState({});
  // eu faria um [data, setData] pra por os 2 juntos, eles vem do mesmo endpoint mesmo

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('http://localhost:8000/result');
  //     const data = await response.json();
  //     setData(data)

  //   })();
  // }, []);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('http://localhost:8000/predict');
  //     const prob = await response.json();
  //     setData(prob)

  //   })();
  // }, []);

  const [previewImage, setPreviewImage] = useState('https://img.elo7.com.br/product/original/308E224/placa-decorativa-mdf-cerveja-vc-deve-beber-padawan-star-wars-jason-voorhees.jpg')
  const handleFileChange = (event) => {
    handleFileUpload(event)
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
          <div className='flex flex-col items-center justify-center gap-4'>
            <img src={previewImage} alt="Picture of the author" width={400} height={400} />
          </div>
          <div className='flex flex-col  justify-center gap-4'>
            <p className='text-xl'>Resultado: {data.resu}</p>
            {/* <p className='text-xl'>Probabilidade: {data.prob}</p> */}
            {data.prob && Object.entries(data.prob).map(([key, value]) => (
              <div key={key}>
                <p className='text-lg'>Classe: {key}</p>
                <p className='text-lg'>Probabilidade: {value[0]}</p>
              </div>
            ))}
            <form onSubmit={submitFile} >
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-center justify-center">
                  <input id="predict" className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm rounded-md border border-blue-700 hover:bg-blue-700 cursor-pointer" type="file" onChange={(e) => handleFileChange(e)} />
                </div>
                <button type="submit" className='bg-green-800 hover:bg-green-700  p-3 rounded-lg w-full'>Upload</button>
              </div>
            </form></div>
        </div>
      </div>
    </main>
  )
}
