export interface NotificationConfig {
  from: string;
  replyTo: string;
}

export interface NotificationData {
  to: string;
  subject: string;
  message: string;
}