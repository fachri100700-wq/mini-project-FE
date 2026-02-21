import CreateEventNavbar from "./_component/create-event-navbar";
import GeneralInfo from "./_component/general-info";
import Promotions from "./_component/promotion";
import Logistics from "./_component/logistics";
import Ticketing from "./_component/ticketing";
import { useFormik } from "formik";
import { EventCategory, EventType } from "../../types/enum-event";
import axiosInstance from "../../utils/axios-instance";
import { createEventSchema } from "../../features/event/create-event-validation-schema";
import { useEffect } from "react";

export default function CreateEvent() {
  const formik = useFormik({
    initialValues: {
      eventName: "",
      image: null as File | null,
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      seatTotal: 0,
      eventType: EventType.FREE,
      eventCategory: EventCategory.CONCERT,
      ticketType: [],
      price: 0,
      seatAvailable: 0,
      promoName: "",
      promoStartDate: "",
      promoEndDate: "",
      quota: 0,
      discAmount: 0,
      userId: "",
    },
    validationSchema: createEventSchema,
    onSubmit: async (values) => {
      try {
        const fd = new FormData();
        fd.append("eventName", values.eventName);
        if (values.image) {
          fd.append("image", values.image); 
        }
        fd.append("startDate", values.startDate);
        fd.append("endDate", values.endDate);
        fd.append("location", values.location);
        fd.append("description", values.description);
        fd.append("seatTotal", String(values.seatTotal));
        fd.append("eventType", values.eventType);
        fd.append("eventCategory", values.eventCategory);
        fd.append("ticketType", JSON.stringify(values.ticketType));
        fd.append("price", String(values.price));
        fd.append("seatAvailable", String(values.seatAvailable));
        fd.append("userId", values.userId);

        if (values.promoName) {
          fd.append("promoName", values.promoName);
          fd.append("promoStartDate", values.promoStartDate || "");
          fd.append("promoEndDate", values.promoEndDate || "");
          fd.append("quota", String(values.quota || 0));
          fd.append("discAmount", String(values.discAmount || 0));
        }

        const res = await axiosInstance.post("/events", fd);
        console.log("Success:", res.data);
        alert("Event created successfully!");
      } catch (error) {
        console.log(error);
      }
    },
  });

  /* useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      console.log("❌ Validasi Gagal di Field:", formik.errors);
      alert("Cek konsol Ri, ada yang belum diisi tuh!");
    }
  }, [formik.isSubmitting, formik.isValid, formik.errors]); */

  return (
    <main className="bg-gray-50 flex">
      <aside className="sticky top-0 h-screen">
        <CreateEventNavbar />
      </aside>
      <div className="flex flex-col w-full pt-20 pb-32 md:pb-24 px-4 md:px-10 mb-20 lg:mb-0">
        <form onSubmit={formik.handleSubmit}>
          <GeneralInfo
            values={formik.values}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
            errors={formik.errors}
            touched={formik.touched}
          />
          
          <Logistics
            values={formik.values}
            handleChange={formik.handleChange}
            errors={formik.errors}
            touched={formik.touched}
          />
          <Ticketing formik={formik} />
          <Promotions
            values={formik.values}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
            errors={formik.errors}
            touched={formik.touched}
          />

          <button
            type="submit"
            className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            Create Event
          </button>
        </form>
      </div>
    </main>
  );
}
