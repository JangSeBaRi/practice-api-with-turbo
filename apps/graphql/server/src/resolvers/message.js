import { v4 } from 'uuid'
import { writeDB } from '../dbController.js'

const setMsgs = data => writeDB('messages', data)

/* 
parent: parent 객체. 거의 사용X
args: Query에 필요한 필드에 제공되는 인수(parameter)
context: 로그인한 사용자. DB Access 등의 중요한 정보들
*/

const messageResolver = {
  Query: {
    messages: (parent, { cursor = '' }, { db: { messages } }) => {
      const fromIndex = messages.findIndex(msg => msg.id === cursor) + 1
      return messages.slice(fromIndex, fromIndex + 15) || []
    },
    message: (parent, { id = '' }, { db: messages }) => {
      return messages.find(msg => msg.id === id)
    },
  },
  Mutation: {
    createMessage: (parent, { text, userId }, { db: { messages } }) => {
      if (!userId) throw Error('사용자가 없습니다.')
      const newMsg = {
        id: v4(),
        text,
        userId,
        timestamp: Date.now(),
      }
      messages.unshift(newMsg)
      setMsgs(messages)
      return newMsg
    },
    updateMessage: (parent, { id, text, userId }, { db: { messages } }) => {
      const targetIndex = messages.findIndex(msg => msg.id === id)
      if (targetIndex < 0) throw Error('메시지가 없습니다.')
      if (messages[targetIndex].userId !== userId) throw Error('사용자가 다릅니다.')

      const newMsg = { ...messages[targetIndex], text }
      messages.splice(targetIndex, 1, newMsg)
      setMsgs(messages)
      return newMsg
    },
    deleteMessage: (parent, { id, userId }, { db: { messages } }) => {
      const targetIndex = messages.findIndex(msg => msg.id === id)
      if (targetIndex < 0) throw '메시지가 없습니다.'
      if (messages[targetIndex].userId !== userId) throw '사용자가 다릅니다.'
      messages.splice(targetIndex, 1)
      setMsgs(messages)
      return id
    },
  },
  Message: {
    user: (msg, args, { db: { users } }) => users[msg.userId],
  },
}

export default messageResolver
