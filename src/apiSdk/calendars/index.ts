import axios from 'axios';
import queryString from 'query-string';
import { CalendarInterface, CalendarGetQueryInterface } from 'interfaces/calendar';
import { GetQueryInterface } from '../../interfaces';

export const getCalendars = async (query?: CalendarGetQueryInterface) => {
  const response = await axios.get(`/api/calendars${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCalendar = async (calendar: CalendarInterface) => {
  const response = await axios.post('/api/calendars', calendar);
  return response.data;
};

export const updateCalendarById = async (id: string, calendar: CalendarInterface) => {
  const response = await axios.put(`/api/calendars/${id}`, calendar);
  return response.data;
};

export const getCalendarById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/calendars/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCalendarById = async (id: string) => {
  const response = await axios.delete(`/api/calendars/${id}`);
  return response.data;
};
