
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Dish } from "../types/dishTypes";

interface DishesTableProps {
  dishes: Dish[];
  isLoading: boolean;
  onEdit: (dish: Dish) => void;
  onDelete: (dish: Dish) => void;
}

const DishesTable = ({ dishes, isLoading, onEdit, onDelete }: DishesTableProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading dishes...</div>;
  }

  if (dishes.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No dishes found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dishes.map((dish) => (
          <TableRow key={dish.id}>
            <TableCell>
              <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                {dish.image_url ? (
                  <img
                    src={dish.image_url}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell className="font-medium">{dish.name}</TableCell>
            <TableCell>{dish.category}</TableCell>
            <TableCell>{formatPrice(dish.price)}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  dish.is_available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {dish.is_available ? "Available" : "Unavailable"}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(dish)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onDelete(dish)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DishesTable;
