export const CheckoutStepper = ({ step }) => {
  const steps = ["Cart", "Shipping", "Payment"];

  return (
    <div className="checkout-stepper mb-4">
      <div className="d-flex justify-content-between">

        {steps.map((label, index) => {
          const current = index + 1;

          return (
            <div
              key={label}
              className={`step ${step >= current ? "active" : ""}`}
            >
              <div className="step-circle">
                {current}
              </div>

              <span className="step-label">
                {label}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
};