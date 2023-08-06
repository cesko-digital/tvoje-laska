"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import classNames from "helpers/classNames";

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? "bg-violet-70" : "bg-gray-30",
        "relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none",
      )}
    >
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? "translate-x-7 translate-y-1" : "translate-x-1 translate-y-1",
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  );
};

export default Toggle;
