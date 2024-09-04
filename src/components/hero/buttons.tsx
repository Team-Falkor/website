import { Button } from '@/components/ui/button';

import { ChevronRight } from 'lucide-react';

const HeroButtons = () => {
  return (
    <div className="flex items-center mt-10 gap-x-6">
      <Button
        variant={'secondary'}
        className="bg-purple-700"
        disabled
      >
        Download Soon
      </Button>

      <Button
        variant={'ghost'}
        className="items-center justify-center gap-2"
      >
        Join The Discord
        <ChevronRight />
      </Button>
    </div>
  );
};

export default HeroButtons;
