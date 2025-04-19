import {
  user,
  user_card,
  money_pool,
  money_pool_transactions,
  pool_enrollment,
  pool_invitation,
} from './schema';

/**
 * Collection of user accounts in the system
 * @type {user[]}
 */
export const users: user[] = [
  {
    user_id: 1001,
    username: 'alex_smith',
    email: 'alex.smith@example.com',
    password_hash: 'test',
    first_name: 'Alex',
    last_name: 'Smith',
    verified: true,
    created_at: '2024-12-01T09:23:15Z',
    last_active: '2025-04-02T16:45:22Z',
    session_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDAxfQ',
    device_fingerprint: 'fkw920fj20j9s0f2j0s2f',
    using_biometrics: true,
  },
  {
    user_id: 1002,
    username: 'taylor_jones',
    email: 'taylor.jones@example.com',
    password_hash: '$2a$12$6jf49Kjsd8fKJHDFGHu567JHGFtyr56kjhgsdfg65jhgDFG',
    first_name: 'Taylor',
    last_name: 'Jones',
    verified: true,
    created_at: '2024-11-15T14:30:00Z',
    last_active: '2025-04-01T19:20:45Z',
    session_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDAyfQ',
    device_fingerprint: 'ghj567kjh78lkj12nm34',
    using_biometrics: true,
  },
  {
    user_id: 1003,
    username: 'jordan_garcia',
    email: 'jordan.garcia@example.com',
    password_hash: '$2a$12$POIdfg45JKLjkhg56jhgJHKghj78HJKLGHjkl78JHGjk45lkj',
    first_name: 'Jordan',
    last_name: 'Garcia',
    verified: true,
    created_at: '2025-01-10T08:45:12Z',
    last_active: '2025-03-30T21:15:30Z',
    session_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDAzfQ',
    device_fingerprint: 'lkj645jhg78klo09mnb12',
    using_biometrics: true,
  },
];

/**
 * Collection of payment cards associated with users
 * @type {user_card[]}
 */
export const userCards: user_card[] = [
  {
    card_id: 2001,
    user_id: 1001,
    card_type: 'VISA',
    last_four_digits: '4242',
    cardholder_name: 'Alex Smith',
    expiry_month: 5,
    expiry_year: 2027,
    is_default: true,
    created_at: '2024-12-02T10:15:00Z',
    updated_at: '2024-12-02T10:15:00Z',
  },
  {
    card_id: 2002,
    user_id: 1002,
    card_type: 'MASTERCARD',
    last_four_digits: '5678',
    cardholder_name: 'Taylor Jones',
    expiry_month: 9,
    expiry_year: 2026,
    is_default: true,
    created_at: '2024-11-16T11:20:30Z',
    updated_at: '2024-11-16T11:20:30Z',
  },
  {
    card_id: 2003,
    user_id: 1003,
    card_type: 'AMEX',
    last_four_digits: '9876',
    cardholder_name: 'Jordan Garcia',
    expiry_month: 12,
    expiry_year: 2025,
    is_default: true,
    created_at: '2025-01-12T15:45:00Z',
    updated_at: '2025-01-12T15:45:00Z',
  },
];

/**
 * Shared money pool for group vacation
 * @type {money_pool}
 * Fund for group trip to Costa Rica with a target amount of $3000
 */
export const moneyPool: money_pool = {
  pool_id: 3001,
  pool_name: 'Summer Vacation 2025',
  description:
    'Fund for our group trip to Costa Rica in July 2025. Target: $3000 for accommodations and activities.',
  color: 'red',
  host_user_id: 1001, // Alex is the host
  target_amount: 3000,
  current_amount: 1750, // Sum of completed contributions
  currency: 'USD',
  status: 'ACTIVE',
  created_at: '2025-02-01T12:00:00Z',
  updated_at: '2025-04-01T14:30:15Z',
};

/**
 * Collection of user enrollments in the vacation money pool
 * @type {pool_enrollment[]}
 */
export const poolEnrollments: pool_enrollment[] = [
  {
    pool_id: 3001,
    user_id: 1001, // Alex (host)
    date_joined: '2025-02-01T12:00:00Z', // Same as pool creation date
  },
  {
    pool_id: 3001,
    user_id: 1002, // Taylor
    date_joined: '2025-02-02T09:15:30Z',
  },
  {
    pool_id: 3001,
    user_id: 1003, // Jordan
    date_joined: '2025-02-03T18:20:45Z',
  },
];

/**
 * Invitation to join the vacation money pool
 * @type {pool_invitation}
 * Invitation created by Alex (host) that expires after one month
 */
export const poolInvitation: pool_invitation = {
  invite_code: 'VACATION2025-XYZ',
  creator_id: 1001, // Created by Alex (the host)
  pool_id: 3001,
  created_at: '2025-03-15T10:30:00Z',
  expires_at: '2025-04-15T23:59:59Z',
  invite_type: 'EMAIL',
  uses_count: 0,
};

/**
 * Collection of financial transactions for the vacation money pool
 * @type {money_pool_transactions[]}
 *  Contains contributions from all members, platform fees, and pending transactions
 */
export const moneyPoolTransactions: money_pool_transactions[] = [
  // Alex's contribution
  {
    transaction_id: BigInt(4001),
    pool_id: 3001,
    user_id: 1001,
    anonymous_guest_id: 0, // Not anonymous
    transaction_type: 'CONTRIBUTION',
    amount: 800,
    fee_amount: 16, // 2% fee
    note: 'Initial contribution as host',
    status: 'COMPLETED',
    payment_method: 'CREDIT_CARD',
    transaction_date: '2025-02-01T12:15:00Z',
    external_reference_id: 'pmt_2c4f6g8h0j2k4m6n8p0',
  },
  // Taylor's contribution
  {
    transaction_id: BigInt(4002),
    pool_id: 3001,
    user_id: 1002,
    anonymous_guest_id: 0,
    transaction_type: 'CONTRIBUTION',
    amount: 500,
    fee_amount: 10, // 2% fee
    note: 'Looking forward to the beaches!',
    status: 'COMPLETED',
    payment_method: 'CREDIT_CARD',
    transaction_date: '2025-02-10T15:30:45Z',
    external_reference_id: 'pmt_3d5f7g9h1j3k5m7n9p1',
  },
  // Jordan's contribution
  {
    transaction_id: BigInt(4003),
    pool_id: 3001,
    user_id: 1003,
    anonymous_guest_id: 0,
    transaction_type: 'CONTRIBUTION',
    amount: 450,
    fee_amount: 9, // 2% fee
    note: 'For the zip-line excursion',
    status: 'COMPLETED',
    payment_method: 'CREDIT_CARD',
    transaction_date: '2025-02-20T18:45:30Z',
    external_reference_id: 'pmt_4e6f8g0h2j4k6m8n0p2',
  },
  // Platform fee collection
  {
    transaction_id: BigInt(4004),
    pool_id: 3001,
    user_id: 0, // System transaction
    anonymous_guest_id: 0,
    transaction_type: 'FEE',
    amount: 35, // Total fees collected
    fee_amount: 0,
    note: 'Platform fees',
    status: 'COMPLETED',
    payment_method: 'SYSTEM',
    transaction_date: '2025-02-28T23:59:59Z',
    external_reference_id: 'fee_5f7g9h1j3k5m7n9p1q3',
  },
  // Pending additional contribution from Taylor
  {
    transaction_id: BigInt(4005),
    pool_id: 3001,
    user_id: 1002,
    anonymous_guest_id: 0,
    transaction_type: 'CONTRIBUTION',
    amount: 250,
    fee_amount: 5, // 2% fee
    note: 'Additional contribution for activities',
    status: 'PENDING',
    payment_method: 'BANK_TRANSFER',
    transaction_date: '2025-04-01T09:15:00Z',
    external_reference_id: 'pmt_6g8h0j2k4m6n8p0q2r4',
  },
];
