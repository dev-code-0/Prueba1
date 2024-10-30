import { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();

    // Validar que la URL sea de TikTok
    const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok\.com\/|vm\.tiktok\.com\/).*$/;

    if (!tiktokRegex.test(url)) {
      toast.error('Ingresa un enlace de TikTok no seas imbécil, ¿No sabes leer?', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: {background: '#ff2770'},
        icon: <svg viewBox="0 0 24 24" width="100%" height="100%" fill="#ff2770"><path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path></svg>,
        style: {
          fontFamily: 'Cascadia Code, sans-serif',
          background: '#333',
          boxShadow: '0 8px 20px #ff2770',
          border: '2px solid #ff2770',
          color: '#fff',
          fontSize: '1rem',
          padding: '15px',
          borderRadius: '10px'
        },
      });
      return;
    }

    setIsDownloading(true);
    toast.info('Descargando audio...', {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressStyle: {background: '#ff2770'},
      icon:<svg viewBox="0 0 24 24" width="100%" height="100%" fill="#ff2770"><path d="M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"></path></svg>,
      style: {
        fontFamily: 'Cascadia Code, sans-serif',
        background: '#333',
        boxShadow: '0 8px 20px #ff2770',
        border: '2px solid #ff2770',
        color: '#fff',
        fontSize: '1rem',
        padding: '15px',
        borderRadius: '10px'
      },
    });

    try {
      const response = await fetch('https://tiktok-audio-backend.onrender.com/download', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'audio.mp3';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          a.remove();
          window.URL.revokeObjectURL(downloadUrl);
        }, 1000);
        setMessage('¡Descarga completada!');
        toast.dismiss();
        toast.success('¡Descarga completada!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressStyle: {background: '#ff2770'},
          icon: <svg viewBox="0 0 24 24" width="100%" height="100%" fill="#ff2770"><path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path></svg>,
          style: {
            fontFamily: 'Cascadia Code, sans-serif',
            background: '#333',
            boxShadow: '0 8px 20px #ff2770',
            border: '2px solid #ff2770',
            color: '#fff',
            fontSize: '1rem',
            padding: '15px',
            borderRadius: '10px'
          },
        });
      } else {
        setMessage('Error al descargar el audio');
        toast.dismiss();
        toast.error('Error al descargar el audio', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressStyle: {background: '#ff2770'},
          style: {
            fontFamily: 'Cascadia Code, sans-serif',
            background: '#333',
            boxShadow: '0 8px 20px #ff2770',
            border: '2px solid #ff2770',
            color: '#fff',
            fontSize: '1rem',
            padding: '15px',
            borderRadius: '10px'
          },
        });
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
      toast.dismiss();
      toast.error('Error al conectar con el servidor', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: {background: '#ff2770'},
        icon:<svg viewBox="0 0 24 24" width="100%" height="100%" fill="#ff2770"><path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path></svg>,
        style: {
          fontFamily: 'Cascadia Code, sans-serif',
          background: '#333',
          boxShadow: '0 8px 20px #ff2770',
          border: '2px solid #ff2770',
          color: '#fff',
          fontSize: '1rem',
          padding: '15px',
          borderRadius: '10px'
        },
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setMessage('');
    setIsDownloading(false);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      setMessage('Error al pegar el enlace');
    }
  };

  return (
    <div className="app-container">
      <h1>Descargar  tu puto audio de TikTok...</h1>
      <form onSubmit={handleDownload} className="form-container" >
        <input 
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Pega el enlace de TikTok aquí"
          className="input-field"
          required
        />
        <div className="button-group">
          <button type="button" onClick={handlePaste} className="button" >Pegar</button>
          <button type="submit" className="button" disabled={isDownloading} >
            {isDownloading ? 'Descargando...' : 'Descargar Audio'}
          </button>
        </div>
      </form>
      
      <button onClick={handleReset} className="button reset-button">Reiniciar</button>
      <ToastContainer />
    </div>
  );
}

export default App;