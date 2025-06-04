
import ReservationForm from "./components/ReservationForm";

const Reservations = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Réservation de Table</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Réservez votre table pour vivre une expérience culinaire exceptionnelle. 
            Notre équipe vous accueillera dans un cadre chaleureux et convivial.
          </p>
        </div>
        
        <ReservationForm />
        
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-bold text-lg mb-2">Horaires</h3>
              <p className="text-gray-600">
                Lun-Jeu : 18h00 - 22h30<br />
                Ven-Dim : 18h00 - 23h00
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Contact</h3>
              <p className="text-gray-600">
                Tél : +33 1 23 45 67 89<br />
                Email : reservation@restaurant.com
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Capacité</h3>
              <p className="text-gray-600">
                1 à 12 personnes<br />
                Groupes plus importants : nous contacter
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
