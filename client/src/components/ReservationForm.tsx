import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Calendar, Users, Clock } from "lucide-react";

const reservationSchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters"),
  guestEmail: z.string().email("Please enter a valid email"),
  guestPhone: z.string().regex(/^\+?[\d\s\-()]{10,}$/, "Please enter a valid phone number"),
  partySize: z.number().int().min(1, "Party size must be at least 1").max(20, "Party size cannot exceed 20"),
  reservationDate: z.string().min(1, "Please select a date and time"),
  specialRequests: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationForm({ isOpen, onClose }: ReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createReservationMutation = trpc.reservations.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      partySize: 2,
      reservationDate: "",
      specialRequests: "",
    },
  });

  const partySize = watch("partySize");

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const [datePart, timePart] = data.reservationDate.split("T");
      const reservationDateTime = new Date(`${datePart}T${timePart || "19:00"}`);

      await createReservationMutation.mutateAsync({
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        partySize: data.partySize,
        reservationDate: reservationDateTime,
        specialRequests: data.specialRequests || undefined,
      });

      toast.success("Reservation confirmed! We look forward to seeing you.", {
        description: `Reservation for ${data.guestName} on ${new Date(reservationDateTime).toLocaleDateString()}`,
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Reservation error:", error);
      toast.error("Failed to create reservation", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#6B4423]">Reserve Your Table</DialogTitle>
            <DialogDescription className="text-gray-600">
              Join us for an unforgettable dining experience at Maple Fork Bistro
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
            {/* Guest Name */}
            <div className="space-y-2">
              <Label htmlFor="guestName" className="text-[#6B4423] font-semibold">
                Full Name
              </Label>
              <Input
                id="guestName"
                placeholder="Your name"
                {...register("guestName")}
                className="border-[#D4A574] focus:border-[#6B4423]"
              />
              {errors.guestName && <p className="text-sm text-red-500">{errors.guestName.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="guestEmail" className="text-[#6B4423] font-semibold">
                Email Address
              </Label>
              <Input
                id="guestEmail"
                type="email"
                placeholder="your@email.com"
                {...register("guestEmail")}
                className="border-[#D4A574] focus:border-[#6B4423]"
              />
              {errors.guestEmail && <p className="text-sm text-red-500">{errors.guestEmail.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="guestPhone" className="text-[#6B4423] font-semibold">
                Phone Number
              </Label>
              <Input
                id="guestPhone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("guestPhone")}
                className="border-[#D4A574] focus:border-[#6B4423]"
              />
              {errors.guestPhone && <p className="text-sm text-red-500">{errors.guestPhone.message}</p>}
            </div>

            {/* Party Size */}
            <div className="space-y-2">
              <Label htmlFor="partySize" className="text-[#6B4423] font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-[#7BA88F]" />
                Number of Guests
              </Label>
              <Select value={partySize.toString()} onValueChange={(val) => setValue("partySize", parseInt(val))}>
                <SelectTrigger className="border-[#D4A574] focus:border-[#6B4423]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.partySize && <p className="text-sm text-red-500">{errors.partySize.message}</p>}
            </div>

            {/* Date & Time */}
            <div className="space-y-2">
              <Label htmlFor="reservationDate" className="text-[#6B4423] font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4A574]" />
                Date & Time
              </Label>
              <Input
                id="reservationDate"
                type="datetime-local"
                min={today}
                {...register("reservationDate")}
                className="border-[#D4A574] focus:border-[#6B4423]"
              />
              {errors.reservationDate && <p className="text-sm text-red-500">{errors.reservationDate.message}</p>}
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="text-[#6B4423] font-semibold">
                Special Requests (Optional)
              </Label>
              <Textarea
                id="specialRequests"
                placeholder="Allergies, dietary preferences, special occasion, etc."
                {...register("specialRequests")}
                className="border-[#D4A574] focus:border-[#6B4423] resize-none"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting || createReservationMutation.isPending}
                className="w-full btn-primary text-lg py-6 font-semibold"
              >
                {isSubmitting || createReservationMutation.isPending ? "Confirming..." : "Confirm Reservation"}
              </Button>
            </motion.div>

            <p className="text-xs text-gray-500 text-center">
              We will send a confirmation email to the address provided
            </p>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
