import React from 'react';
import { Check, Clock, CheckCircle2, Archive } from 'lucide-react';
import { STATUS_LIST } from '../utils/ticketUtils';

export const StatusProgress = ({ currentStatus }) => {
  const currentIndex = STATUS_LIST.indexOf(currentStatus);

  const steps = [
    { label: 'Open', icon: Clock, desc: 'Created & pending review' },
    { label: 'In Progress', icon: Clock, desc: 'Staff actively working' },
    { label: 'Resolved', icon: CheckCircle2, desc: 'Solution verified' },
    { label: 'Closed', icon: Archive, desc: 'Ticket finalized' },
  ];

  return (
    <div className="status-stepper-container">
      <div className="status-stepper">
        {steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isActive = idx === currentIndex;
          const StepIcon = step.icon;

          let stepStateClass = 'upcoming';
          if (isActive) stepStateClass = 'active';
          else if (isDone) stepStateClass = 'done';

          return (
            <div key={step.label} className={`stepper-step ${stepStateClass}`}>
              <div className="stepper-track">
                {idx > 0 && <div className={`stepper-line left ${idx <= currentIndex ? 'filled' : ''}`} />}
                <div className="stepper-circle">
                  {isDone ? <Check size={16} /> : <StepIcon size={16} />}
                </div>
                {idx < steps.length - 1 && <div className={`stepper-line right ${idx < currentIndex ? 'filled' : ''}`} />}
              </div>
              <div className="stepper-info">
                <span className="stepper-title">{step.label}</span>
                <span className="stepper-desc">{step.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusProgress;
