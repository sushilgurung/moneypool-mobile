/**
 * Represents a user in the system
 * @property user_id - Unique identifier for the user
 * @property username - User's chosen username for login
 * @property email - User's email address (optional)
 * @property password_hash - Securely hashed password
 * @property first_name - User's first name (optional)
 * @property last_name - User's last name (optional)
 * @property verified - Whether user's identity has been verified
 * @property created_at - When the user account was created (ISO string)
 * @property last_active - When the user was last active on the platform (ISO string)
 * @property session_token - Current session authentication token (optional)
 * @property device_fingerprint - Identifier for user's device (optional)
 */
export type user = {
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
  using_biometrics: boolean;
};

/**
 * Represents a payment card associated with a user
 * @property card_id - Unique identifier for the card
 * @property user_id - Reference to the user who owns this card
 * @property card_type - Type of card (VISA, MASTERCARD, AMEX, etc.)
 * @property last_four_digits - Last four digits of the card number (PCI compliant)
 * @property cardholder_name - Name of the cardholder as it appears on the card
 * @property expiry_month - Card expiration month (1-12)
 * @property expiry_year - Card expiration year (YYYY format)
 * @property is_default - Whether this is the user's default payment method
 * @property created_at - When the card was added to the system (ISO string)
 * @property updated_at - When the card information was last updated (ISO string)
 */
export type user_card = {
  card_id: number;
  user_id: number;
  card_type: string;
  last_four_digits: string;
  cardholder_name: string;
  expiry_month: number;
  expiry_year: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * Represents a money pool for group funding
 * @property pool_id - Unique identifier for the money pool
 * @property pool_name - Display name for the pool
 * @property description - Detailed description of the pool's purpose
 * @property host_user_id - Reference to the user who created/hosts this pool
 * @property target_amount - Goal amount to be collected
 * @property current_amount - Current total collected amount
 * @property currency - Currency code for the pool (USD, EUR, GBP)
 * @property status - Current state of the pool (ACTIVE, COMPLETED, EXPIRED, CANCELLED)
 * @property created_at - When the pool was created (ISO string)
 * @property updated_at - When the pool was last updated (ISO string)
 */
export type money_pool = {
  pool_id: number;
  pool_name: string;
  description: string;
  host_user_id: number;
  target_amount: number;
  current_amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
};

/**
 * Represents a financial transaction in a money pool
 * @property transaction_id - Unique identifier for the transaction (bigint for large systems)
 * @property pool_id - Reference to the associated money pool
 * @property user_id - Reference to the user who made the transaction
 * @property anonymous_guest_id - Identifier for anonymous contributors (0 if not anonymous)
 * @property transaction_type - Type of transaction (CONTRIBUTION,REFUND,DEPOSIT, WITHDRAWAL, FEE, TRANSFER) contribution and refund is money into the pool rest is money out of the pool
 * @property amount - Transaction amount
 * @property fee_amount - Service fee associated with this transaction
 * @property note - Optional message associated with the transaction
 * @property status - Current state of the transaction (PENDING, COMPLETED, FAILED, CANCELLED)
 * @property payment_method - Method used for the transaction (CREDIT_CARD, BANK_TRANSFER, etc.)
 * @property transaction_date - When the transaction occurred (ISO string)
 * @property external_reference_id - Reference ID from payment processor or bank
 */
export type money_pool_transactions = {
  transaction_id: bigint;
  pool_id: number;
  user_id: number;
  anonymous_guest_id: number;
  transaction_type:
    | 'CONTRIBUTION'
    | 'REFUND'
    | 'DEPOSIT'
    | 'WITHDRAWAL'
    | 'FEE'
    | 'TRANSFER';
  amount: number;
  fee_amount: number;
  note: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  payment_method: string;
  transaction_date: string;
  external_reference_id: string;
};

/**
 * Represents a user's participation in a money pool
 * @property pool_id - Reference to the money pool
 * @property user_id - Reference to the participating user
 * @property date_joined - When the user joined the pool (ISO string)
 */
export type pool_enrollment = {
  pool_id: number;
  user_id: number;
  date_joined: string;
};

/**
 * Represents an invitation to join a money pool
 * @property invite_code - Unique code for the invitation
 * @property creator_id - Reference to the user who created the invitation
 * @property pool_id - Reference to the associated money pool
 * @property created_at - When the invitation was created (ISO string)
 * @property expires_at - When the invitation expires (ISO string)
 * @property invite_type - How the invitation will be delivered (EMAIL or MOBILE)
 * @property uses_count - Number of times this invitation has been used
 */
export type pool_invitation = {
  invite_code: string;
  creator_id: number;
  pool_id: number;
  created_at: string;
  expires_at: string;
  invite_type: 'EMAIL' | 'MOBILE';
  uses_count: number;
};
