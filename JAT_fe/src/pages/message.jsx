import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

import { Button } from "./ui/Button";
import { Loader } from "./ui/Loader";
import { HiOutlinePaperAirplane, HiOutlineSearch } from 'react-icons/hi';

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [msgs, allUsers] = await Promise.all([
          messageService.getAll(user.id),
          userService.getAll(),
        ]);
        setMessages(msgs);
        setUsers(allUsers.filter((u) => u.id !== user.id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUser]);

  const getConversations = () => {
    const partners = new Map();
    messages.forEach((msg) => {
      const partnerId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
      if (!partners.has(partnerId) || new Date(msg.timestamp) > new Date(partners.get(partnerId).timestamp)) {
        partners.set(partnerId, msg);
      }
    });
    return Array.from(partners.entries())
      .map(([partnerId, lastMsg]) => {
        const partner = users.find((u) => u.id === partnerId);
        const unread = messages.filter(
          (m) => m.senderId === partnerId && m.receiverId === user.id && !m.read
        ).length;
        return { partner, lastMsg, unread };
      })
      .filter((c) => c.partner)
      .sort((a, b) => new Date(b.lastMsg.timestamp) - new Date(a.lastMsg.timestamp));
  };

  const getChatMessages = () => {
    if (!selectedUser) return [];
    return messages
      .filter(
        (m) =>
          (m.senderId === user.id && m.receiverId === selectedUser.id) ||
          (m.senderId === selectedUser.id && m.receiverId === user.id)
      )
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const handleSelectUser = async (partner) => {
    setSelectedUser(partner);
    await messageService.markRead(user.id, partner.id);
    setMessages((prev) =>
      prev.map((m) =>
        m.senderId === partner.id && m.receiverId === user.id ? { ...m, read: true } : m
      )
    );
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;
    setSending(true);
    try {
      const msg = await messageService.send({
        senderId: user.id,
        receiverId: selectedUser.id,
        content: newMessage.trim(),
      });
      setMessages((prev) => [...prev, msg]);
      setNewMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const conversations = getConversations();
  const chatMessages = getChatMessages();
  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase())
  );
 if (loading) return <Loader />;

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="w-full sm:w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Messages</h2>
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {conversations.length === 0 && !search ? (
            <p className="text-sm text-gray-400 text-center py-8">No conversations yet</p>
          ) : (
            conversations.map(({ partner, lastMsg, unread }) => (
              <button
                key={partner.id}
                onClick={() => handleSelectUser(partner)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedUser?.id === partner.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center shrink-0">
                  <span className="text-primary-700 dark:text-primary-300 text-sm font-semibold">
                    {partner.firstName[0]}{partner.lastName[0]}
                  </span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {partner.firstName} {partner.lastName}
                    </p>
                    {unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                        {unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{lastMsg.content}</p>
                </div>
              </button>
            ))
          )}

          {search && (
            <div className="border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-400 px-4 py-2">Start new conversation</p>
              {filteredUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleSelectUser(u)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {u.firstName[0]}{u.lastName[0]}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {u.firstName} {u.lastName}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden sm:flex flex-1 flex-col">
        {selectedUser ? (
          <>
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <span className="text-primary-700 dark:text-primary-300 text-sm font-semibold">
                  {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{selectedUser.role === 'superuser' ? 'Admin' : 'User'}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
              {chatMessages.map((msg) => {
                const isMine = msg.senderId === user.id;
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                        isMine
                          ? 'bg-primary-600 text-white rounded-br-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${isMine ? 'text-primary-200' : 'text-gray-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button type="submit" disabled={sending || !newMessage.trim()}>
                <HiOutlinePaperAirplane size={18} />
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;