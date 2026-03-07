import "./CheckoutStepper.css";

export const CheckoutStepper = ({ step }) => {
  const steps = ["Cart", "Shipping", "Payment"];

  return (
    <div className="checkout-stepper" data-step={step}>
      <div className="d-flex justify-content-between">
        {steps.map((label, index) => {
          const current = index + 1;
          const isActive = step === current;
          const isCompleted = step > current;
          
          return (
            <div
              key={label}
              className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="step-circle">
                {isCompleted ? '✓' : current}
              </div>
              <span className="step-label">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};