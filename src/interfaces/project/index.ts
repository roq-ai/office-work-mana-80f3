import { CalendarInterface } from 'interfaces/calendar';
import { TaskInterface } from 'interfaces/task';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  calendar?: CalendarInterface[];
  task?: TaskInterface[];
  organization?: OrganizationInterface;
  _count?: {
    calendar?: number;
    task?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
