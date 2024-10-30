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
      <h1>Descarga tu puto audio de TikTok <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#ff2770" d="m17.139 9.891l-.287.693zM15.8 15.5h-.75zm-1.011 3.333l-.624-.416zm-2.693 2.21l-.287-.693zm-3.467.342l.147-.736zm-3.072-1.642l.53-.53zM3.915 16.67l.736-.147zm.342-3.467l.693.287zm2.21-2.693l-.417-.623zm2 2.994l-.417-.624zm-.884 1.077l.693.287zm-.137 1.386l-.735.146zm.657 1.23l-.53.53zm2.615.52l.287.692zm1.078-.885l.623.417zM12.2 15.5h-.75zm3.935-11.316l.693-.287zm2.381 2.381l-.287.693zm1.285.317l.068-.747zm0 3.608l.037-.75zM9.4 13.133l-.124-.74zm6.399-3.21h-.75zM12.2 2.9h.75zm3.618 0l-.747.068zM9.4 9.512l-.05-.748zm7.452 1.07a8.8 8.8 0 0 0 2.91.656l.076-1.498a7.3 7.3 0 0 1-2.413-.543zm-.767-.36q.374.199.767.36l.573-1.385a7 7 0 0 1-.634-.3zm-1.035-.3V15.5h1.5V9.924zm.362 9.327a6.75 6.75 0 0 0 1.138-3.75h-1.5a5.25 5.25 0 0 1-.885 2.917zm-3.029 2.486a6.75 6.75 0 0 0 3.03-2.486l-1.248-.833a5.25 5.25 0 0 1-2.356 1.933zm-3.9.384a6.75 6.75 0 0 0 3.9-.384l-.574-1.386a5.25 5.25 0 0 1-3.033.3zm-3.456-1.847a6.75 6.75 0 0 0 3.456 1.847l.293-1.47a5.25 5.25 0 0 1-2.688-1.438zM3.18 16.817a6.75 6.75 0 0 0 1.847 3.456l1.06-1.06a5.25 5.25 0 0 1-1.436-2.689zm.384-3.9a6.75 6.75 0 0 0-.384 3.9l1.47-.293a5.25 5.25 0 0 1 .3-3.033zm2.486-3.03a6.75 6.75 0 0 0-2.486 3.03l1.386.574a5.25 5.25 0 0 1 1.933-2.356zm3.3-1.122a6.75 6.75 0 0 0-3.3 1.123l.833 1.247a5.25 5.25 0 0 1 2.567-.873zm1.2 3.935V9.9h-1.5v2.8zm-1.667 1.428a1.65 1.65 0 0 1 .643-.255l-.249-1.48a3.15 3.15 0 0 0-1.227.488zm-.607.74a1.65 1.65 0 0 1 .607-.74l-.833-1.247a3.15 3.15 0 0 0-1.16 1.413zm-.094.954a1.65 1.65 0 0 1 .094-.953l-1.386-.575a3.15 3.15 0 0 0-.18 1.82zm.451.845a1.65 1.65 0 0 1-.451-.845l-1.471.293a3.15 3.15 0 0 0 .862 1.612zm.845.451a1.65 1.65 0 0 1-.845-.451l-1.06 1.06c.44.44 1.001.74 1.612.863zm.953-.094a1.65 1.65 0 0 1-.953.094l-.293 1.472a3.15 3.15 0 0 0 1.82-.18zm.74-.607a1.65 1.65 0 0 1-.74.607l.574 1.386a3.15 3.15 0 0 0 1.414-1.16zm.279-.917c0 .326-.097.645-.278.917l1.247.833a3.15 3.15 0 0 0 .531-1.75zm1.5 0V2.9h-1.5v12.6zM12.6 3.25h2.8v-1.5h-2.8zm4.228.647a3.7 3.7 0 0 1-.263-1.066l-1.494.137c.047.516.172 1.022.371 1.503zm.791 1.184a3.7 3.7 0 0 1-.791-1.184l-1.386.574a5.2 5.2 0 0 0 1.116 1.67zm1.184.791a3.7 3.7 0 0 1-1.184-.791l-1.06 1.06a5.2 5.2 0 0 0 1.67 1.117zm1.066.263a3.7 3.7 0 0 1-1.066-.263l-.574 1.386c.48.199.987.324 1.503.37zM20.95 10.1V7.3h-1.5v2.8zm-1.218-2.471a.32.32 0 0 1-.282-.329h1.5c0-.65-.518-1.114-1.081-1.165zm.03 3.61A1.135 1.135 0 0 0 20.95 10.1h-1.5c0-.183.155-.37.388-.36zM9.05 12.7c0-.102.044-.183.089-.23a.25.25 0 0 1 .138-.076l.25 1.479c.501-.085 1.023-.513 1.023-1.173zm7.74-3.802c-.729-.388-1.74.084-1.74 1.026h1.5c0 .143-.086.25-.17.297a.31.31 0 0 1-.295.001zM12.95 2.9a.35.35 0 0 1-.35.35v-1.5a1.15 1.15 0 0 0-1.15 1.15zm2.45.35a.32.32 0 0 1-.329-.282l1.494-.137c-.051-.563-.514-1.081-1.165-1.081zm-5.95 7.012a.37.37 0 0 1-.4-.362h1.5c0-.62-.513-1.18-1.2-1.135z"></path></svg></h1>
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
          <button type="button" onClick={handlePaste} className="button" >Pegar <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M3.626 3.533a.25.25 0 0 0-.126.217v9.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.126-.217a.75.75 0 0 1 .752-1.298c.541.313.874.89.874 1.515v9.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-9.5c0-.625.333-1.202.874-1.515a.75.75 0 0 1 .752 1.298M5.75 1h4.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 4.75v-3A.75.75 0 0 1 5.75 1m.75 3h3V2.5h-3Z"></path></svg> </button>
          <button type="submit" className="button" disabled={isDownloading} >
            {isDownloading ? 'Descargando...' : 'Descargar Audio'}
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"></path></svg>
          </button>
        </div>
      </form>
      
      <button onClick={handleReset} className="button reset-button">Reiniciar <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3.578 6.487A8 8 0 1 1 2.5 10.5"></path><path d="M7.5 6.5h-4v-4"></path></g></svg></button>
      <ToastContainer />
    </div>
  );
}

export default App;