
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, Phone, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useReservations } from "../hooks/useReservations";
import { ReservationFormData, reservationSchema } from "../types/reservationTypes";

const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { createReservation } = useReservations();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ReservationFormData>();

  const onSubmit = async (data: ReservationFormData) => {
    try {
      setIsSubmitting(true);
      await createReservation(data);
      reset();
      toast({
        title: "Réservation créée",
        description: "Votre demande de réservation a été envoyée avec succès.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer la réservation. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", 
    "21:00", "21:30", "22:00", "22:30"
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Réserver une Table
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nom complet *
              </Label>
              <Input
                id="name"
                {...register("name", reservationSchema.name)}
                placeholder="Votre nom complet"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", reservationSchema.email)}
                placeholder="votre@email.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Téléphone *
              </Label>
              <Input
                id="phone"
                {...register("phone", reservationSchema.phone)}
                placeholder="+33 1 23 45 67 89"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="guests" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Nombre de personnes *
              </Label>
              <Select onValueChange={(value) => setValue("guests", parseInt(value))}>
                <SelectTrigger className={errors.guests ? "border-red-500" : ""}>
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} personne{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.guests && (
                <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                {...register("date", reservationSchema.date)}
                min={new Date().toISOString().split('T')[0]}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Heure *
              </Label>
              <Select onValueChange={(value) => setValue("time", value)}>
                <SelectTrigger className={errors.time ? "border-red-500" : ""}>
                  <SelectValue placeholder="Choisir l'heure" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="special_requests">Demandes spéciales</Label>
            <Textarea
              id="special_requests"
              {...register("special_requests")}
              placeholder="Allergies, occasions spéciales, préférences de table..."
              className="min-h-[80px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Réserver la Table"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;
