"use client";

import { useEffect } from "react";

type Error = {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Error) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Oh no, alguna cosa ha anat malament... potser refrescant?</p>
    </div>
  );
}
