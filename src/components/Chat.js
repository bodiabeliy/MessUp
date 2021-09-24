import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import PauseIcon from '@material-ui/icons/Pause';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InputAdornment from '@material-ui/core/InputAdornment'
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase';

import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../index';

import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { DropzoneDialog } from 'material-ui-dropzone';
import Chip from '@material-ui/core/Chip'
import {Theaters} from '@material-ui/icons'
import {GraphicEqIcon} from '@material-ui/icons/GraphicEq';
import {Description} from '@material-ui/icons'
import {PictureAsPdf} from '@material-ui/icons'
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import {store} from '../firebase'


// настройка распознания речи 
const speechRecord = window.SpeechRecognition || window.webkitSpeechRecognition
const microphone = new speechRecord()
microphone.continuous = true
microphone.interimResults = false
microphone.lang = 'ru'

function Chat() {
 const {authorization, firestore} = useContext(Context)
 const [user] = useAuthState(authorization)
 const [values, setValue] = useState('')
 const [messages =[]] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )
  const [isListening, setListening] = useState(false)
  const [note, setNotes] = useState('')
  const [clip, setClip] = useState(false);
  const [saveFile, setSaveFile] = useState(null)
  const [progress, setProgress] = useState(0)


 // ф-я отправки сообщений
  async function SendMessage () {
    if (values != '') {
      firestore.collection('messages').add({
        uid: user.uid,
        displayName: user.displayName,
        photoAvatar: user.photoURL,
        text: values,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        clipDocument:saveFile
       })
       setValue('')
    }
    else {
      alert('Error!')
    }
 }



 function DeleteMessage() {
    firestore.collection('messages')
    .get()
    .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
        doc.ref.delete()
        });
    });
 }

  useEffect(() => {
    HandleListening()

  }, [isListening])


  const HandleListening = () => {
    if(isListening) {
      microphone.start()
      microphone.onend = () => {
        console.log('continue...');
        microphone.start()
      }
    }
    else {
      microphone.stop()
      microphone.onend = () => {
        console.log('Micro stop worked');
      }
    }
    microphone.onstart = () => {
      console.log('Micro on');
    }
    microphone.onresult = (event) => {
      const transcription = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')
      setNotes(transcription)
      console.log("Voice:",transcription);
      microphone.onerror = (event) => {
        console.log(event.error);
      }
    }
  }
  // определитель типа файлов
  const TypeChangeIcon = (fileObject) => {
    const {type} = fileObject.file
    switch (type) {
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Description />
      case "application/pdf":
        return <PictureAsPdf />
      case "video/mpeg":
          return <GraphicEqIcon />
      case "application/mp4":
          return <Theaters />
      default:
        return <Description />
    }
  }
  // const HandleSave = () => {
  //   setSaveText([...saveText, note])
  //   setNotes('')
  // }


 return (
  <div>
   <Container>
    <Grid
     container 
     style={{height: window.innerHeight - 50}}
     justify={'center'}
     >
      <div className='chat__field'>
        {messages.map(message => 
        
          <div className="chat__sendMessage"
          style={{
            background: user.uid === message.uid ? '#e1e1e1' : '#caa3ff',
            marginLeft: user.uid === message.uid ? '0' : '15%'
           }}
          >
            <Grid>
             <div className="line">
             <Avatar 
                style={{marginRight:'8px'}}
                src={message.photoAvatar}
              />
              <div className="chat__textBody">
              <span className='chat__SendTime' style={{fontSize: '12px', textAlign: 'right', marginLeft: '82%'}}> {message.createdAt.toDate().toString().substring(16,21)}</span> <br />
                <div className="chat__textArea">
                  <div className="chat__text">
                  <span className='chat__personName'> {message.displayName}</span> <br />
                    {message.text}
                  </div>
                  { saveFile != null ?
                   <div className="chat__clipFiles">
                   <NoteAddIcon />
                  { progress !=100 ? 
                    <div className="chat__download">
                       <CircularProgress value={progress} />
                       <i> Процесс загрузки документа:</i> <b> {progress}</b> <i>%</i>
                    </div>
                    :
                    saveFile[0].path
                  }
                 </div>
                 : ''
                  }
                </div>
              </div>
             </div>
            </Grid>
          </div>
        )}
      </div>
      <Grid
         container
         direction={'column'}
         alignItems={'center'}
         style={{width: '80%',}}
        >
         <Grid container spacing={1} alignItems="center">         
          <Grid item>

         <div className="text-field ">
         <TextField
          onChange={e => setValue(e.target.value)}
          variant='outlined'
          InputProps={{
            endAdornment: 
            <InputAdornment>
             <SendIcon 
                onClick={SendMessage}
              />
            </InputAdornment>,
          }}
          />
           {isListening ?
           <Button onClick={() => setListening(prevState => !prevState)} >
            <RecordVoiceOverIcon />
          </Button>
           : 
           <Button onClick={() => setListening(prevState => !prevState)}>
              <PauseIcon />
          </Button>
           }
           <Button>
           <AttachFileIcon  onClick={() => setClip(true)}/>
           </Button>
            <DropzoneDialog
              acceptedFiles={['image/*, .mpeg*, .mp3, .mp4', '.doc', '.docx', '.pdf', '.exe', '.rar', '.zip', '.iso']}
              cancelButtonText={"Отмена"}
              filesLimit={200}
              submitButtonText={"Прикрепить"}
              dropzoneText={"Переместите и/или загрузите файлы сюда"}
              dialogTitle={"Контейнер файлов"}
              getFileLimitExceedMessage={() => "Превышен лимит загрузки. Максимальное количество файлов: 200"}
              getFileAddedMessage={() => "Файл успешно добавлен!"}
              getFileRemovedMessage={() => "Файл успешно удален!"}
              getDropRejectMessage={() => "Ошибка! Не поддерживаемый формат файла."}
              getPreviewIcon={TypeChangeIcon}
              maxFileSize={100000000000}
              open={clip}
              onClose={() => setClip(false)}
              onSave={(files) => {
                console.log('Files:', files);
                const UploadDocuments = () => {
                  // преобразование к массиву объектов для возможности отправки
                  const upload = files.map((obj)=> { return Object.assign({}, obj)});
                  setSaveFile(upload)
                  // поочередная загрузка
                  for (let file of files) {
                    console.log(file);
                    const UploadDocuments = store.ref(`store/${file.name}`).put(file)
                    UploadDocuments.on(
                      "state_changed",
                      // расчет загрузки
                      snapshot => {
                        
                        const progreessUploading = Math.round(
                          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        )
                        console.log(`Прогресс загрузки: ${progreessUploading} %`);
                        setProgress(progreessUploading)
                      },
                      error => {
                        console.log(error);
                      }
                    )
                  }
                  console.log('Текущий файл:', saveFile);
                }
                UploadDocuments()

              }}
              showPreviews={true}
              showFileNamesInPreview={true}
            />

         </div>

          </Grid>
          <Grid item>
              {note ?
                <Tooltip title=" Кликните, чтобы скопировать выделенный текст" arrow>
                <Chip  onClick={() =>  navigator.clipboard.writeText(`${note}`)} size="small" label={note} variant="outlined" />
              </Tooltip>
              :''}

          </Grid>
            <Button
            style={{marginTop: '20px'}}
              onClick={DeleteMessage}
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
             Удалить переписку
            </Button>
            {/* <h2>Save Record Text (test)</h2>
            {/* {setsaveFile.map(message => (
              <p key={message}>{message}</p>
            ))} */} 
        </Grid>
      </Grid>
    </Grid>
   </Container>
  </div>
 );
}

export default Chat;