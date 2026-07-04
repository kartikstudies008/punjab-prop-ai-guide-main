import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calculator, IndianRupee, Percent, CalendarClock } from "lucide-react";

interface EmiCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  propertyPriceLakhs: number;
}

export function EmiCalculator({ isOpen, onClose, propertyPriceLakhs }: EmiCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = React.useState(20); // 20%
  const [interestRate, setInterestRate] = React.useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = React.useState(20); // 20 years

  const propertyPriceAmount = propertyPriceLakhs * 100000;
  const downPaymentAmount = (propertyPriceAmount * downPaymentPercent) / 100;
  const principalLoanAmount = propertyPriceAmount - downPaymentAmount;

  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const emi = React.useMemo(() => {
    const P = principalLoanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (r === 0) return P / n;

    const emiAmount = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(emiAmount) ? 0 : emiAmount;
  }, [principalLoanAmount, interestRate, tenureYears]);

  const totalAmountPayable = emi * tenureYears * 12;
  const totalInterestPayable = Math.max(totalAmountPayable - principalLoanAmount, 0);

  const interestPercentage = React.useMemo(() => {
    const total = principalLoanAmount + totalInterestPayable;
    if (total === 0) return 50;
    return Math.round((totalInterestPayable / total) * 100);
  }, [principalLoanAmount, totalInterestPayable]);

  const principalPercentage = 100 - interestPercentage;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl w-[95vw] bg-card border shadow-2xl p-6 rounded-2xl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
            <Calculator className="w-6 h-6 text-gold" />
            Home Loan EMI Calculator
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            Calculate your monthly payment details based on the estimated property price of **₹ {propertyPriceLakhs.toFixed(2)} Lakhs**.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Sliders Area */}
          <div className="space-y-5">
            {/* Down Payment */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-primary" /> Down Payment
                </span>
                <span className="text-foreground">{downPaymentPercent}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Min 10%</span>
                <span className="font-medium text-foreground">
                  ₹ {(downPaymentAmount / 100000).toFixed(2)} Lakhs
                </span>
                <span>Max 90%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-primary" /> Interest Rate
                </span>
                <span className="text-foreground">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>5%</span>
                <span className="font-medium text-foreground">Bank Average: ~8.5%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground flex items-center gap-1">
                  <CalendarClock className="w-3.5 h-3.5 text-primary" /> Loan Tenure
                </span>
                <span className="text-foreground">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>5 yrs</span>
                <span className="font-medium text-foreground">Standard: 20 yrs</span>
                <span>30 yrs</span>
              </div>
            </div>
          </div>

          {/* Outputs Area */}
          <div className="flex flex-col justify-between p-5 rounded-xl border bg-secondary/15">
            <div className="text-center pb-4 border-b">
              <span className="text-xs text-muted-foreground font-semibold block mb-1">
                Estimated Monthly EMI
              </span>
              <span className="text-3xl font-black text-gold flex items-center justify-center gap-1">
                <IndianRupee className="w-6 h-6 stroke-[3px]" />
                {Math.round(emi).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="py-4 space-y-2.5 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Principal Loan:</span>
                <span className="text-foreground">₹ {(principalLoanAmount / 100000).toFixed(2)} Lakhs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest Payable:</span>
                <span className="text-foreground">₹ {(totalInterestPayable / 100000).toFixed(2)} Lakhs</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-sm font-bold">
                <span className="text-foreground">Total Cost:</span>
                <span className="text-gold">₹ {(totalAmountPayable / 100000).toFixed(2)} Lakhs</span>
              </div>
            </div>

            {/* Visual Progress Bar Chart */}
            <div className="space-y-1.5 mt-2">
              <div className="flex h-3 w-full rounded-full overflow-hidden">
                <div className="bg-primary" style={{ width: `${principalPercentage}%` }} title="Principal" />
                <div className="bg-gold" style={{ width: `${interestPercentage}%` }} title="Interest" />
              </div>
              <div className="flex justify-between text-[9px] text-muted-foreground font-bold">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Principal ({principalPercentage}%)</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> Interest ({interestPercentage}%)</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
