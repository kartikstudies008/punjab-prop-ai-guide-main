import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Trash2, Sparkles, Scale, Info } from "lucide-react";

export interface CompareItem {
  id: string;
  city: string;
  bhk: number;
  area_sqft: number;
  furnishing: string;
  bathroom: number;
  parking: string;
  property_age: number;
  predicted_price: number;
  price_per_sqft: number;
}

interface CompareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  items: CompareItem[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function CompareDialog({ isOpen, onClose, items, onRemove, onClearAll }: CompareDialogProps) {
  const bestValueId = React.useMemo(() => {
    if (items.length < 2) return null;
    return items.reduce((best, item) => 
      item.price_per_sqft < best.price_per_sqft ? item : best, 
      items[0]
    ).id;
  }, [items]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] bg-card border shadow-2xl p-6 rounded-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
              <Scale className="w-6 h-6 text-gold" />
              Property Comparison
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1">
              Compare estimated prices and specifications of up to 3 properties side-by-side.
            </DialogDescription>
          </div>
          {items.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-destructive hover:underline font-medium focus:outline-none mr-6"
            >
              Clear All
            </button>
          )}
        </DialogHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Info className="w-12 h-12 text-muted-foreground/40 mb-3" />
            <p className="text-foreground font-semibold">No properties to compare</p>
            <p className="text-muted-foreground text-sm max-w-xs mt-1">
              Run a price estimation and click "Add to Compare" to see details here.
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <div className="overflow-x-auto border border-border rounded-xl">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="p-4 font-semibold text-muted-foreground w-1/4">Specification</th>
                    {items.map((item) => (
                      <th key={item.id} className="p-4 font-semibold text-foreground relative min-w-[200px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-foreground">
                            {item.city} ({item.bhk} BHK)
                          </span>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.id === bestValueId && (
                          <div className="absolute top-0 right-4 -translate-y-1/2">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold text-accent-foreground shadow-sm">
                              <Sparkles className="w-2.5 h-2.5" /> Best Value
                            </span>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Estimated Price */}
                  <tr className="hover:bg-muted/10">
                    <td className="p-4 font-semibold text-muted-foreground">Estimated Price</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-4 font-bold text-lg text-gold">
                        ₹ {item.predicted_price.toFixed(2)} Lakhs
                      </td>
                    ))}
                  </tr>

                  {/* Price per Sq Ft */}
                  <tr className="hover:bg-muted/10">
                    <td className="p-4 font-semibold text-muted-foreground">Price per Sq Ft</td>
                    {items.map((item) => {
                      const isBest = item.id === bestValueId;
                      return (
                        <td key={item.id} className={`p-4 font-semibold ${isBest ? "text-emerald-500 font-bold" : "text-foreground"}`}>
                          ₹ {item.price_per_sqft.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </td>
                      );
                    })}
                  </tr>

                  {/* City */}
                  <tr className="hover:bg-muted/10">
                    <td className="p-4 font-semibold text-muted-foreground">City</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-4 text-foreground">
                        {item.city}
                      </td>
                    ))}
                  </tr>

                  {/* BHK */}
                  <tr className="hover:bg-muted/10">
                    <td className="p-4 font-semibold text-muted-foreground">BHK</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-4 text-foreground">
                        {item.bhk} BHK
                      </td>
                    ))}
                  </tr>

                  {/* Area */}
                  <tr className="hover:bg-muted/10">
                    <td className="p-4 font-semibold text-muted-foreground">Area (Sq Ft)</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-4 text-foreground">
                        {item.area_sqft} sq ft
                      </td>
                    ))}
                  </tr>

                  {/* Furnishing */}
                  <tr className="hover:bg-muted/10">
                    <td className="p-4 font-semibold text-muted-foreground">Furnishing</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-4 text-foreground capitalize">
                        {item.furnishing}
                      </td>
                    ))}
                  </tr>

                  {/* Bathrooms */}
                  <tr className="hover:bg-muted/10">
                    <td className="p-4 font-semibold text-muted-foreground">Bathrooms</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-4 text-foreground">
                        {item.bathroom}
                      </td>
                    ))}
                  </tr>

                  {/* Parking */}
                  <tr className="hover:bg-muted/10">
                    <td className="p-4 font-semibold text-muted-foreground">Parking Available</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-4 text-foreground">
                        {item.parking}
                      </td>
                    ))}
                  </tr>

                  {/* Property Age */}
                  <tr className="hover:bg-muted/10">
                    <td className="p-4 font-semibold text-muted-foreground">Property Age</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-4 text-foreground">
                        {item.property_age} {item.property_age === 1 ? "year" : "years"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
