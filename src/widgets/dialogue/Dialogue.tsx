import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { MicOutline, PauseCircle } from '@/src/shared/assets/componentsIcons'
import { useConnectMessengerSocket } from '@/src/shared/hooks/useConnectMessengerSocket'
import { useGetMessagesByUserQuery } from '@/src/shared/model/api/messengerApi'
import { MessengerSocketApi } from '@/src/shared/model/api/messengerSocketApi'
import { useCreateImageForPostMutation } from '@/src/shared/model/api/postsApi'
import { useGetUserProfileByIdQuery } from '@/src/shared/model/api/usersApi'
import { selectUserId } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Input } from '@/src/shared/ui/input'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Message } from '@/src/widgets/dialogue/message/Message'
import Link from 'next/link'

import s from './dialogue.module.scss'

type Props = {
  userId: number
}

export const Dialogue = ({ userId }: Props) => {
  useConnectMessengerSocket()
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<any>(null)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })

        setAudioBlob(audioBlob)
      }

      mediaRecorder.start()
      setIsRecording(true)
      startTimer()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const startTimer = () => {
    setRecordingTime(0)
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      stopTimer()
    }
  }

  const stopTimer = () => {
    clearInterval(timerRef.current)
  }

  const sendAudio = () => {
    if (audioBlob) {
      handleSendAudio(audioBlob)
      setAudioBlob(null)
      setRecordingTime(0)
    }
  }

  const handleSendAudio = async (audioBlob: Blob) => {
    try {
      console.log(audioChunksRef)
      MessengerSocketApi.sendText(userId, audioChunksRef.current)
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
    // MessengerSocketApi.sendText(userId, base64Audio)
  }

  const cancelRecording = () => {
    stopRecording()
    setAudioBlob(null)
    setRecordingTime(0)
  }

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        stopRecording()
      }
    }
  }, [])

  const [messageText, setMessageText] = useState('')
  const { data: partner } = useGetUserProfileByIdQuery(userId)
  const { data: messages } = useGetMessagesByUserQuery({ dialoguePartnerId: userId })

  const myId = useAppSelector(selectUserId)
  const avatarUrl = partner?.avatars?.[0]?.url

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages?.items])

  if (!partner) {
    return null
  }

  const hasContent = messageText.trim()

  const handleSendMessage = () => {
    if (!hasContent) {
      return
    }
    MessengerSocketApi.sendText(userId, messageText.trim())
    setMessageText('')
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hasContent) {
      handleSendMessage()
    }
  }

  return (
    <div className={s.dialogue}>
      <header className={s.header}>
        <Link className={s.dialogueLink} href={`/profile/${userId}`}>
          <AvatarBox size={'s'} src={avatarUrl} />
          <Typography option={'regular_text16'}>{partner.userName}</Typography>
        </Link>
      </header>
      <div className={s.dialogueBody}>
        {messages?.items
          ?.slice()
          .reverse()
          .map(msg => (
            <Message
              isMy={msg.ownerId === myId}
              key={msg.id}
              text={msg.messageText}
              time={msg.createdAt}
              userAvatar={avatarUrl}
            />
          ))}
        <div ref={bottomRef} />
      </div>
      <div className={s.footer}>
        {isRecording && (
          <div>
            <span>Recording... {recordingTime}s</span>
            <Button className={s.micIcon} onClick={stopRecording} variant={'transparent'}>
              <PauseCircle />
            </Button>
          </div>
        )}

        {audioBlob && !isRecording ? (
          <div className={'audio-preview'}>
            <audio controls src={URL.createObjectURL(audioBlob)} />
            <div className={'preview-actions'}>
              <button onClick={sendAudio} type={'button'}>
                Send
              </button>
              <button onClick={cancelRecording} type={'button'}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <Input
            className={s.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={'Type Message'}
            value={messageText}
          />
        )}
        {!isRecording && !audioBlob && (
          <Button className={s.micIcon} onClick={startRecording} variant={'transparent'}>
            <MicOutline />
          </Button>
        )}

        {hasContent && (
          <Button
            className={s.bth}
            disabled={!hasContent}
            onClick={handleSendMessage}
            variant={'transparent'}
          >
            Send message
          </Button>
        )}
      </div>
    </div>
  )
}
