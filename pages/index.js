import Head from 'next/head'
import { useReactMediaRecorder} from 'react-media-recorder';
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from 'react';


export default function Home() {

  const {
    status,
    startRecording,
    stopRecording,
    resumeRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  const [audio, setAudio] = useState()
  const [isNowRecording, setIsNowRecording] = useState(false)

  let recorder

  function onStart() {
    startRecording()
    setIsNowRecording(true)
  }
  function onPause() {
    pauseRecording()
  }
  function onResume() {
    resumeRecording()
  }
  function onStop() {
    stopRecording()
    setIsNowRecording(false)
  }


  return (
    <div className={styles.container}>
      <Head>
        <script>
          {
            () => {
              // CSRでscriptを実行するために行う
              if (!window.MediaRecorder) {
                document.write(
                  decodeURI('%3Cscript defer src="/polyfill.js">%3C/script>')
                )
              }
            }
          }
        </script>

        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>


        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <button onClick={onStart} type="button" className="m-1">Record</button>
            <button onClick={onPause} type="button" className="m-1">Pause</button>
            <button onClick={onResume} type="button" className="m-1">Resume</button>
            <button onClick={onStop} type="button" className="m-1">Stop</button>
          </div>
          <div className={styles.card}>
            {/*<p>{status}</p>*/}
            {/*<button onClick={startRecording}>Start Recording</button>*/}
            {/*<button onClick={stopRecording}>Stop Recording</button>*/}

            <audio src={mediaBlobUrl} controls />
          </div>



          <div className={styles.card}>
            {isNowRecording ? <p>録音中</p> : <p>録音可能</p>}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
