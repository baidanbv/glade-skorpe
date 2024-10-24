import sendMessage from './sendMessage';
import fetchMessages from './fetchMessages';
import updateMessageById from './updateMessageById';
import deleteMessageById from './deleteMessageById';

export const messagesAPI = { sendMessage, fetchMessages, updateMessageById, deleteMessageById };
