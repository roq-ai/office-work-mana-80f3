import { ProjectInterface } from 'interfaces/project';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TaskInterface {
  id?: string;
  name: string;
  status: string;
  project_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  project?: ProjectInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TaskGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  status?: string;
  project_id?: string;
  user_id?: string;
}
