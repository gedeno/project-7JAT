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
