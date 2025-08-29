// This is a mock session service.
// In a real application, you would implement a proper session management system.

import {User} from '@/payload-types';

export const useSession = (): {user: User | null} => {
  // Return a stable mock user object (no new Date each render)
  const user: User = {
    id: '64b7b7b7b7b7b7b7b7b7b7b7',
    email: 'test@example.com',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  };
  return {user};
};
