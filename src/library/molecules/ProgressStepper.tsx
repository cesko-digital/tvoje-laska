"use client";

import { MouseEventHandler, ReactNode, useCallback, useEffect, useState } from "react";
import classNames from "helpers/classNames";

export type StepperStep = {
  title: string;
  description?: ReactNode;
  active?: boolean;
  complete?: boolean;
  onClick?: () => void;
  onBeforeNavigation?: () => boolean;
  path?: string;
};

type StepIndicatorProps = {
  complete?: boolean;
  active?: boolean;
  onClick?: MouseEventHandler;
};

type StepperHorizontalProps = {
  children?: ReactNode;
};

type StepperMenuProps = {
  steps: StepperStep[];
  className?: string;
};

export const StepIndicator = ({ active, complete, onClick }: StepIndicatorProps) => {
  return (
    <div className="inline-flex justify-center items-center h-6 w-6 cursor-pointer" aria-hidden onClick={onClick}>
      <div
        className={classNames(
          "inline-flex rounded-full",
          active
            ? "h-6 w-6 border-[6px] bg-violet-70 border-violet-20"
            : complete
            ? "h-3 w-3 bg-violet-70"
            : "h-3 w-3 bg-gray-20",
        )}
      />
    </div>
  );
};

export const StepperHorizontal = ({ children }: StepperHorizontalProps) => {
  return <div className="flex gap-4">{children}</div>;
};

// TODO: Potřeba upravit pro účely krokování ve formuláři (tzn. s routováním apod.)

const StepperMenu = ({ steps, className }: StepperMenuProps) => {
  const defaultActiveIndex = steps.indexOf(steps.find(e => e.active === true) ?? steps[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(defaultActiveIndex);
  const [updatedSteps, setUpdatedSteps] = useState(steps);

  const updateCopySteps = useCallback(
    (targetIndex: number) => {
      const updatedStepsCopy = [...updatedSteps];

      updatedStepsCopy.forEach((step, index) => {
        if (index === targetIndex) {
          step.active = true;
          step.complete = true;
        } else if (index < targetIndex) {
          step.active = false;
          step.complete = true;
        } else {
          step.active = false;
          step.complete = false;
        }
      });
      setUpdatedSteps(updatedStepsCopy);
      return updatedStepsCopy;
    },
    [updatedSteps],
  );

  useEffect(() => {
    if (defaultActiveIndex !== activeStepIndex) {
      setActiveStepIndex(defaultActiveIndex);
      updateCopySteps(defaultActiveIndex);
    }
  }, [defaultActiveIndex, activeStepIndex, updateCopySteps]);

  const onStepClick = (clickedIndex: number) => {
    const onBeforeNavigation = steps[clickedIndex].onBeforeNavigation;
    if (onBeforeNavigation && !onBeforeNavigation()) {
      return;
    }

    setActiveStepIndex(clickedIndex);
    const updatedStepsCopy = updateCopySteps(clickedIndex);

    const stepOnClick = updatedStepsCopy[clickedIndex].onClick;

    if (stepOnClick && stepOnClick !== undefined) {
      stepOnClick();
    }
  };

  return (
    <>
      <div className={classNames("p-4 flex items-center flex-col gap-1", className!)}>
        <StepperHorizontal>
          {updatedSteps.map((step, i) => (
            <StepIndicator key={i} active={step.active} complete={step.complete} onClick={() => onStepClick(i)} />
          ))}
        </StepperHorizontal>
        <p className="text-gray-70">
          Krok {activeStepIndex + 1} z {steps.length}
        </p>
      </div>
    </>
  );
};

export default StepperMenu;
