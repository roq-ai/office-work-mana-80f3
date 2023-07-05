const mapping: Record<string, string> = {
  calendars: 'calendar',
  organizations: 'organization',
  projects: 'project',
  tasks: 'task',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
