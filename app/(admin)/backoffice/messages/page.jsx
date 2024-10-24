'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { messagesAPI } from '@/api';
import { useMessages, usePopup } from '@/store';
import { helpersFunctions } from '@/helpers';

import ModalPopup from '@/components/ui/ModalPopup/ModalPopup';
import AcceptMessage from '@/components/ui/AcceptMessage/AcceptMessage';
import ActionButton from '@/components/ui/Buttons/ActionButton';
import Loader from '@/components/layouts/Loader/Loader';

const Page = () => {
  const token = localStorage.getItem('token') || null;
  const messages = useMessages((state) => state.messages);
  const loadMessages = useMessages((state) => state.loadMessages);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const { id, deleteFormModal, openDeletePopup, closeDeletePopup } = usePopup();

  const sortedMessages = helpersFunctions.sortedByDate(messages);

  const handleDeleteById = async (id) => {
    try {
      console.log(token);
      setLoading(true);
      await messagesAPI.deleteMessageById(id, token);
      closeDeletePopup();
      loadMessages();
    } catch (err) {
      console.error('Could not delete message.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMessage = async (messageId) => {
    try {
      const updatedData = {
        id: messageId,
        status: true
      };

      await messagesAPI.updateMessageById(updatedData, token);

      const message = messages.find((msg) => msg._id === messageId);
      setSelectedMessage(message);
      loadMessages();
    } catch (error) {
      console.error('Error opening message:', error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      loadMessages();
    }, 10000);

    return () => clearInterval(pollingInterval);
  }, [loadMessages]);

  const handleClickOutside = (event) => {
    if (event.target.closest('.message-content') === null) {
      setSelectedMessage(null);
    }
  };

  useEffect(() => {
    if (selectedMessage) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedMessage]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <h1 className="capitalize font-kurale text-3xl mb-5 text-border text-secondary">Messages</h1>
      <div>
        <table className="table-auto border-collapse border w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedMessages.map((message) => (
              <tr key={message._id} className={`border-t ${!message.status ? 'font-bold' : ''}`}>
                <td className="border px-4 py-2">{message.name}</td>
                <td className="border px-4 py-2 text-center">{message.subject}</td>
                <td className="border px-4 py-2 text-center">{message.status ? 'Read' : 'Unread'}</td>
                <td className="border px-2 py-2">
                  <div className="flex gap-3 justify-center">
                    <ActionButton title="Open" handleClick={() => handleOpenMessage(message._id)} action="open" />
                    <ActionButton title="Delete" handleClick={() => openDeletePopup(message._id)} action="delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="p-4 border border-gray-300 rounded-md bg-white w-1/2 message-content">
            <h3 className="text-xl font-kurale">
              Kunde navn: <span className="capitalize">{selectedMessage.name}</span>
            </h3>
            <p className="text-xl font-kurale">Emne: {selectedMessage.subject}</p>
            <p className="text-xl font-kurale">Besked: {selectedMessage.description}</p>
          </div>
        </div>
      )}

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {deleteFormModal && (
          <ModalPopup handlePopup={closeDeletePopup}>
            <AcceptMessage
              message="Er du sikker på, at du vil slette dette message?"
              acceptButton={() => {
                handleDeleteById(id);
              }}
              cancelButton={closeDeletePopup}
            />
          </ModalPopup>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
