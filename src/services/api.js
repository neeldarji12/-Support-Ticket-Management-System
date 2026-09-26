import initialUsers from '../data/users.json';
import initialTickets from '../data/tickets.json';
import initialComments from '../data/comments.json';


export const initData = () => {
  if (!localStorage.getItem('tickets_users')) {
    localStorage.setItem('tickets_users', JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem('tickets_list')) {
    localStorage.setItem('tickets_list', JSON.stringify(initialTickets));
  }
  if (!localStorage.getItem('tickets_comments')) {
    localStorage.setItem('tickets_comments', JSON.stringify(initialComments));
  }
};


initData();


const getUsersFromStorage = () => {
  return JSON.parse(localStorage.getItem('tickets_users') || '[]');
};

const getTicketsFromStorage = () => {
  return JSON.parse(localStorage.getItem('tickets_list') || '[]');
};

const saveTicketsToStorage = (tickets) => {
  localStorage.setItem('tickets_list', JSON.stringify(tickets));
};

const getCommentsFromStorage = () => {
  return JSON.parse(localStorage.getItem('tickets_comments') || '[]');
};

const saveCommentsToStorage = (comments) => {
  localStorage.setItem('tickets_comments', JSON.stringify(comments));
};

export const api = {
  // Login user
  login: async (email, password) => {
    const users = getUsersFromStorage();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password.trim()
    );
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    return foundUser;
  },

  getUsers: async () => {
    return getUsersFromStorage();
  },

  getTickets: async () => {
    return getTicketsFromStorage();
  },

  getTicketById: async (id) => {
    const tickets = getTicketsFromStorage();
    const ticket = tickets.find((t) => String(t.id) === String(id));
    return ticket || null;
  },

  createTicket: async (ticketData) => {
    const tickets = getTicketsFromStorage();

    const newId = tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1;
    const ticketCode = `TCK-${1020 + newId}`;

    const newTicket = {
      id: newId,
      ticket_id: ticketCode,
      subject: ticketData.subject,
      description: ticketData.description,
      priority: ticketData.priority || 'Medium',
      status: 'Open', // default status is always Open
      assigned_to: ticketData.assigned_to ? Number(ticketData.assigned_to) : null,
      created_by: ticketData.created_by || 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updatedTickets = [newTicket, ...tickets];
    saveTicketsToStorage(updatedTickets);
    return newTicket;
  },

  updateTicket: async (id, updateData) => {
    const tickets = getTicketsFromStorage();
    const index = tickets.findIndex((t) => String(t.id) === String(id));

    if (index === -1) {
      throw new Error('Ticket not found');
    }

    const updatedTicket = {
      ...tickets[index],
      ...updateData,
      assigned_to: updateData.assigned_to ? Number(updateData.assigned_to) : null,
      updated_at: new Date().toISOString(),
    };

    tickets[index] = updatedTicket;
    saveTicketsToStorage(tickets);
    return updatedTicket;
  },

  getComments: async (ticketId) => {
    const allComments = getCommentsFromStorage();
    return allComments.filter((c) => String(c.ticket_id) === String(ticketId));
  },

  addComment: async (ticketId, commentText, userId) => {
    const comments = getCommentsFromStorage();
    const newComment = {
      id: Date.now(),
      ticket_id: Number(ticketId),
      user_id: Number(userId),
      comment: commentText,
      created_at: new Date().toISOString(),
    };

    comments.push(newComment);
    saveCommentsToStorage(comments);
    return newComment;
  },
};
