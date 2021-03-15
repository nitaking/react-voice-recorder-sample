import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react';


export default function Home() {
  const [audio, setAudio] = useState()
  const [isNowRecording, setIsNowRecording] = useState(false)

  let recorder

  function onStart() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      recorder = new MediaRecorder(stream)

      recorder.addEventListener('dataavailable', e => {
        // e.data にデータが入っているのでデータ処理はこちらから
        setAudio(e.data)

      })

      recorder.start()
      // setIsNowRecording(true)
    }).catch((e) => {
      throw new Error('録音に失敗しました')
    })
  }
  function onPause() {
    recorder?.pause()
  }
  function onResume() {
    recorder?.resume()
  }
  function onStop() {
    recorder?.stop()
    // setIsNowRecording(false)
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
            <audio src={audio && URL.createObjectURL(audio)} controls />
          </div>


          {isNowRecording ? <p>録音中</p> : <p>録音可能</p>}
          <div className={styles.card}>
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
