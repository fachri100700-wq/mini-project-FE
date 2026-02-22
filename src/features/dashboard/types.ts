export interface OrganizerEvent {
  id: string;
  eventName: string;
  startDate: string;
  endDate: string;
  location: string;
  seatTotal: number;
  description: string;
  createdAt: string;
}

export interface UpdateOrganizerEventPayload {
  eventName?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
  seatTotal?: number;
eventType?: "FREE" | "PAID";
  eventCategory?: string;       
}

export interface OrganizerEventDetail extends OrganizerEvent {
  description: string;
  eventType: "FREE" | "PAID";
  eventCategory: string;
  imageUrl?: string;
}

export interface OrganizerProfile {
  username: string;
  email: string;
  phone?: string;
  organizationName?: string;
}

export interface UpdateOrganizerProfilePayload {
  username?: string;
  phone?: string;
  organizationName?: string;
}