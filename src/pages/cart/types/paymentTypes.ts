
export type PaymentMethod = 'orange-money' | 'mtn-mobile' | 'mastercard' | 'visa';

export interface PaymentDetails {
  method: PaymentMethod;
  amount: number;
  phoneNumber?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

export interface PaymentProviderConfig {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const PAYMENT_PROVIDERS: Record<PaymentMethod, PaymentProviderConfig> = {
  'orange-money': {
    name: 'Orange Money',
    icon: '🟠',
    color: 'bg-orange-500',
    description: 'Paiement via Orange Money Cameroun'
  },
  'mtn-mobile': {
    name: 'MTN Mobile Money',
    icon: '🟡',
    color: 'bg-yellow-500',
    description: 'Paiement via MTN Mobile Money'
  },
  'mastercard': {
    name: 'Mastercard',
    icon: '💳',
    color: 'bg-red-500',
    description: 'Paiement par carte Mastercard'
  },
  'visa': {
    name: 'Visa',
    icon: '💳',
    color: 'bg-blue-500',
    description: 'Paiement par carte Visa'
  }
};
