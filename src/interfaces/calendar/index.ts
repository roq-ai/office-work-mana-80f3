import { ProjectInterface } from 'interfaces/project';
import { GetQueryInterface } from 'interfaces';

export interface CalendarInterface {
  id?: string;
  project_id?: string;
  created_at?: any;
  updated_at?: any;

  project?: ProjectInterface;
  _count?: {};
}

export interface CalendarGetQueryInterface extends GetQueryInterface {
  id?: string;
  project_id?: string;
}
