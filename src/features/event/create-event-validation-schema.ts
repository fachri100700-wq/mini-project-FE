import * as yup from "yup";
import { EventCategory, EventType } from "../../types/enum-event";

export const createEventSchema = yup.object({
  eventName: yup
    .string()
    .required("Event name is required")
    .min(6, "Event name at least have 6 characters")
    .max(50, "Event name maximum 50 characters"),

  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date must be a valid date"),

  endDate: yup
    .date()
    .required("End date is required")
    .typeError("End date must be a valid date")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { startDate } = this.parent;
        return value && startDate ? value > startDate : true;
      },
    ),

  location: yup
    .string()
    .required("Location is required")
    .max(100, "Location maximum 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description at least have 10 characters")
    .max(200, "Description maximum 200 characters"),

  seatTotal: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Seat total is required")
    .min(1, "Seat total at least have 1 seat"),

  eventType: yup
    .string()
    .oneOf(
      Object.values(EventType),
      `Event type must be one of: ${Object.values(EventType).join(", ")}`,
    )
    .required("Event type is required"),

  eventCategory: yup
    .string()
    .oneOf(
      Object.values(EventCategory),
      `Category must be one of: ${Object.values(EventCategory).join(", ")}`,
    )
    .required("Event category is required"),

  // --- TICKET VALIDATION ---
  ticketType: yup
    .array()
    .of(
      yup.object().shape({
        name: yup
          .string()
          .required("Ticket name is required")
          .min(3, "Min 3 characters")
          .max(20, "Max 20 characters"),
        price: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .required("Price is required")
          .min(0, "Price cannot be negative"),
        quantity: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .required("Quantity is required")
          .min(1, "At least 1 seat"),
      }),
    )
    .min(1, "Add at least one ticket type"),

  promoName: yup.string().nullable().notRequired().min(5).max(20),

  promoStartDate: yup
    .date()
    .nullable()
    .notRequired()
    .test(
      "promo-before-event",
      "Promo must start before the event starts!",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true;
        return value < startDate;
      },
    ),

  promoEndDate: yup
    .date()
    .nullable()
    .notRequired()
    .test(
      "promo-range",
      "Promo end date must be after start and before event",
      function (value) {
        const { promoStartDate, startDate } = this.parent;
        if (!value) return true;
        // Cek apakah setelah promo start
        if (promoStartDate && value <= promoStartDate) return false;
        // Cek apakah sebelum/saat event start
        if (startDate && value > startDate) return false;
        return true;
      },
    ),

  quota: yup
    .number()
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),

  discAmount: yup
    .number()
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),
});
