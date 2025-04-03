/**
 *  User type
 *
 */
export interface User {
  user_id: number;
  username: string;
  email?: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  verified: boolean;
  created_at: string;
  last_active: string;
  session_token?: string;
  device_fingerprint?: string;
}

/**
 *  array of users to simulate database
 *
 */
export const users: User[] = [
  {
    user_id: 12845,
    username: 'mountainexplorer42',
    email: 'sarah.jenkins@example.com',
    password_hash: 'test',
    first_name: 'Sarah',
    last_name: 'Jenkins',
    verified: true,
    created_at: '2024-08-15T09:23:47Z',
    last_active: '2025-03-25T16:42:19Z',
    session_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjg0NSwiaWF0IjoxNjc5NjE0MzQ1LCJleHAiOjE2ODIyMDYzNDZ9',
    device_fingerprint:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36#1920x1080#en-US',
  },
];
