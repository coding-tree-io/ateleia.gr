import { useState } from 'react';

import { Button } from '@/components/ui/button';

export function ExampleIsland() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => setCount((value) => value + 1)}>
        Increment
      </Button>
      <span className="text-sm text-muted-foreground">Count: {count}</span>
    </div>
  );
}
