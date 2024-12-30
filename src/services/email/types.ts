export interface EmailConfig {
  from: string;
  replyTo: string;
}

export interface EmailData {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}