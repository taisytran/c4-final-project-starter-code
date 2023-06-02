import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// TODO(done): Implement businessLogic
const todoAccess = new TodosAccess()

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  return todoAccess.getTodos(userId)
}

export async function createTodo(userId: string, todoData: CreateTodoRequest): Promise<TodoItem> {
  const newTodo: TodoItem = {
    ...todoData,
    userId,
    todoId: uuid.v4(),
    createdAt: new Date().toISOString(),
    done: false,
  }

  return todoAccess.createTodo(newTodo)
}

export async function updateTodo(userId: string, todoId: string, updateData: UpdateTodoRequest): Promise<string> {
  return todoAccess.updateTodo(userId, todoId, updateData)
}

export async function deleteTodo(userId: string, todoId: string): Promise<string> {
  return todoAccess.deleteTodo(userId, todoId)
}

export async function updateAttachmentUrl(userId: string, todoId: string): Promise<string> {
  const bucketName = process.env.ATTACHMENT_S3_BUCKET
  const attachmentUrl =  `https://${bucketName}.s3.amazonaws.com/${todoId}`

  return todoAccess.updateAttachmentUrl(userId, todoId, attachmentUrl);
}

export async createAttachmentPresignedUrl(todoId: string): Promise<string> {
  return await AttachmentUtils.getPresignedAttachmentUrl(todoId)
}

