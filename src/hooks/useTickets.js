import { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../services/api';

export const useTickets = (initialFilters = {}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    priority: 'All',
    assignedTo: 'All',
    ...initialFilters,
  });

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTickets(filters);
      setTickets(data);
    } catch (err) {
      setError(err.message || 'Unable to load tickets');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      status: 'All',
      priority: 'All',
      assignedTo: 'All',
    });
  }, []);

  const handleCreate = async (ticketData) => {
    const created = await api.createTicket(ticketData);
    await fetchTickets();
    return created;
  };

  const handleUpdate = async (id, updates, changedBy) => {
    const updated = await api.updateTicket(id, updates, changedBy);
    setTickets((prev) => prev.map((t) => (t.id === Number(id) ? updated : t)));
    return updated;
  };

  const handleDelete = async (id) => {
    await api.deleteTicket(id);
    setTickets((prev) => prev.filter((t) => t.id !== Number(id)));
  };

  const ticketStats = useMemo(() => {
    return {
      total: tickets.length,
      open: tickets.filter((t) => t.status === 'Open').length,
      inProgress: tickets.filter((t) => t.status === 'In Progress').length,
      resolved: tickets.filter((t) => t.status === 'Resolved').length,
      closed: tickets.filter((t) => t.status === 'Closed').length,
      highPriority: tickets.filter((t) => t.priority === 'High').length,
    };
  }, [tickets]);

  return {
    tickets,
    loading,
    error,
    filters,
    stats: ticketStats,
    setFilter: updateFilter,
    resetFilters,
    refreshTickets: fetchTickets,
    createTicket: handleCreate,
    updateTicket: handleUpdate,
    deleteTicket: handleDelete,
  };
};
